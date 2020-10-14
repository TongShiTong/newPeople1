<template>
  <div class="rule-page">
    <div class="top-bar">
      <i class="icon-back" @click="toHome">
        <img src="@/assets/icon-back.png" />
      </i>
      活动专题
    </div>

    <div v-html="content" class="rules-content"></div>
  </div>
</template>

<script>
import api from "../api/index";

export default {
  name: "Rule",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    getContent() {
      const self = this;
      api.getRuleContent(9).then(data => {
        self.content = data.content;
      });
    },
    toHome() {
      this.$router.push("/");
    }
  },
  created: function() {
    this.getContent();
  }
};
</script>