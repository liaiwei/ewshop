<template>
  <div class="hello">
    <h1>wewewe</h1>
    <img src="~assets/logo.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      imgUrl: require("assets/logo.png"),
    };
  },
  props: {
    msg: String,
  },
};
</script>
