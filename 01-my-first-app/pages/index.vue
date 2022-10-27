<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="~/assets/images/sample-0.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="~/assets/images/sample-2.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="~/assets/images/sample-1.jpg" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
// import 'swiper/swiper-bundle.css';
// import Swiper from 'swiper/swiper-bundle';

import "aos/dist/aos.css";
import aos from "aos";

export default {
  mounted() {
    aos.init();

    // var swiper = new Swiper(".swiper-container", {
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  },
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
