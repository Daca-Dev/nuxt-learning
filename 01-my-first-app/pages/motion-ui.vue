<template>
  <h1 data-animation="spin-in">Hello Motion UI</h1>
</template>

<script>
import $ from "jquery";

export default {
  mounted() {
    // we reference the this in this scope because using jQuery change the this
    const component = this;

    $("h1").click(function () {
      const $animation = $("h1").data("animation");
      component.$motionUi.animateIn($("h1"), $animation);
    });
  },
  transition: {
    name: 'fade-about',
    mode: 'out-in'
  }
};
</script>
