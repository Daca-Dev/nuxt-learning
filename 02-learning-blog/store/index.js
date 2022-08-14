import Vuex from "vuex";
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const index = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[index] = editedPost;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://nuxt-course-41152-default-rtdb.firebaseio.com/posts.json')
          .then(response => {
            const { data } = response;
            const postArray = Object.keys(data).map(key => ({
              ...data[key],
              id: key,
            }));

            vuexContext.commit('setPosts', postArray);
          })
          .catch(error => context.error(error));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        }

        // the URL ends with .json just for a rule of firebase
        return axios.post(
          'https://nuxt-course-41152-default-rtdb.firebaseio.com/posts.json',
          createdPost,
        )
          .then(response => {
            const { name: id } = response.data;
            vuexContext.commit('addPost', {
              id,
              ...post,
            })
          })
          .catch(error => console.log(error));
      },
      editPost(vuexContext, { postId, editedPost }) {
        return axios.put(
          `https://nuxt-course-41152-default-rtdb.firebaseio.com/posts/${postId}.json`,
          editedPost,
        )
        .then(response => {
          vuexContext.commit('editPost', editedPost);
        })
        .catch(err => console.log(err));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
