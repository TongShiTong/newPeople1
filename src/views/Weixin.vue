<template>
  <div class="weixin-page">
    <i class="icon-back" @click="toHome"></i>
    <!-- <div class="box" style="height:100vh">
      <iframe style="width:100%;height:100%" src="http://d.mengdigua.com/" frameborder='0'></iframe>
    </div> -->
    <div class="pic">
      <img src="@/assets/weixin.png" />
    </div>
    <a class="weixin-download" href="https://a.app.qq.com/o/simple.jsp?pkgname=com.netmi.potatomall">打开萌地瓜APP去购买</a>
  </div>
</template>

<script>
export default {
  name: "Weixin",
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.push("/");
    }
  },
  mounted() {
   
  }
};
</script>

<style></style>
