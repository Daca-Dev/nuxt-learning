<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  asyncData(context) {
    const { postId } = context.route.params;
    const url = `https://nuxt-course-41152-default-rtdb.firebaseio.com/posts/${postId}.json`;

    return axios.get(url).then(response => ({
        loadedPost: response.data
      }
    )).catch(e => context.error(e));
  },
  methods: {
    onSubmitted(editedPost) {
      const { postId } = this.$route.params;
      this.$store.dispatch('editPost', { postId, editedPost })
        .then(() => {
          this.$router.push('/admin')
        });
    },
  },
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
