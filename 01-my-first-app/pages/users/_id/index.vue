<template>
  <div>
    <h1>A single user page, with ID: {{ $route.params.id }}</h1>
    <hr>
    <nuxt-link to="/users">
      &lt; Go Back
    </nuxt-link>
  </div>
</template>

<script>
export default {
  validate( data ) {
    const { id } = data.params;

    return /^\d+$/.test(id);

  },
}
</script>
