<template>
  <div>
    <h1>All the users page</h1>
    <hr>
    <input type="text" id="user-id" v-model="userId" >
    <button @click="onLoadUser" >Buscar</button>

    <hr>

    <nuxt-child />

  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: '',
    }
  },
  methods: {
    onLoadUser() {
      console.log('Event called!')
      this.$router.push(`/users/${this.userId}`)
    }
  },
  layout: 'users',
}
</script>

<style>

</style>
