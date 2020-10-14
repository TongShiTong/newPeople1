export default {
  // 判断地址栏出现微信自己加的参数问题
  isWeChatUrl: function() {
    const url = window.location.href;
    const matchResult = url.match(/\?/g);
    // 如果地址栏中，出现了两个问号的话，那么是微信在分享添加了参数
    // 如果地址栏中，出现了form=,那么就是微信分享添加的参数
    return (matchResult ? matchResult.length >= 2 : false) || /from=/.test(url);
  },
  // 把地址栏的中微信追加的参数去掉，返回我们自己项目的地址
  getProjectUrl: function() {
    const location = window.location;
    return location.origin + location.pathname + location.hash;
  },
  getRecomendId: function() {
    const url = window.location.href;
    if (url.includes("recomend_id")) {
      const recomendId = url.split("?recomend_id=")[1];
      return recomendId;
    }
    return undefined;
  },
  getKey: function() {
    const url = window.location.href;
    if (url.includes("key")) {
      const key = url.split("?key=")[1];
      return key;
    }
    return undefined;
  },
};
