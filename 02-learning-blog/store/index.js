import Vuex from "vuex";
import axios from "axios";
import Cookie from "jsCookies";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
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
          (post) => post.id === editedPost.id
        );
        state.loadedPosts[index] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(`${process.env.fbBaseUrl}/posts.json`)
          .then((response) => {
            const { data } = response;
            const postArray = Object.keys(data).map((key) => ({
              ...data[key],
              id: key,
            }));

            vuexContext.commit("setPosts", postArray);
          })
          .catch((error) => context.error(error));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        };

        // the URL ends with .json just for a rule of firebase
        return axios
          .post(
            `${process.env.fbBaseUrl}/posts.json?auth=${vuexContext.state.token}`,
            createdPost
          )
          .then((response) => {
            const { name: id } = response.data;
            vuexContext.commit("addPost", {
              id,
              ...post,
            });
          })
          .catch((error) => console.log(error));
      },
      editPost(vuexContext, { postId, editedPost }) {
        return axios
          .put(
            `${process.env.fbBaseUrl}/posts/${postId}.json?auth=${vuexContext.state.token}`,
            editedPost
          )
          .then((response) => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch((err) => console.log(err));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      authenticateUser(vuexContext, authData) {
        const url = authData.isLogin
          ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiToken}`
          : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiToken}`;

        this.$axios
          .$post(url, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((resp) => {
            const expDate = new Date().getTime() + resp.expiresIn * 1000;
            const token = resp.idToken;

            vuexContext.commit("setToken", token);
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiration", expDate);

            Cookie.set("jwt", token);
            Cookie.set("expirationDate", expDate);

            vuexContext.dispatch("setLogoutTimer", res.expiresIn * 1000);
          })
          .catch((err) => console.err);
      },
      setLogoutTimer(duration) {
        setTimeout(() => {
          vuexContext.commit("clearToken");
        }, duration);
      },
      initAuth(vuexContext, req) {
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find((c) => c.trim(), startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }

          const token = jwtCookie.split("=")[1];

        } else {
          const expirationDate = localStorage.getItem("tokenExpiration");
          const token = localStorage.getItem("token");

          if (!token || new Date() > expirationDate) {
            return;
          }
        }

        vuexContext.dispatch(
          "setLogoutTimer",
          expirationDate - new Date().getTime()
        );
        vuexContext.commit("setToken", token);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null;
      },
    },
  });
};

export default createStore;
