<template>
  <div class="nav-bar">
    <div class="left" @click="goBack">
      <slot name="left">
        <img src="~assets/images/left-arrow.png" alt="" />
      </slot>
    </div>
    <div class="center"><slot></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack,
    };
  },
};
</script>

<style scoped lang="scss">
.nav-bar {
  background: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  height: 45px;
  line-height: 45px;
  text-align: center;
  display: flex;
  box-shadow: 0 2px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
}
.left img {
  width: 45px;
  padding: 10px;
}
.center {
  flex: 1;
}
</style>
