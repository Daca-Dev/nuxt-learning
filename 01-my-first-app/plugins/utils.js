import Vue from "vue";

Vue.prototype.$getCurrentScreenSize = () => {
  window.addEventListener("resize", () => {
    console.log("Current screen size: " + Foundation.MediaQuery.current);
  });
};
