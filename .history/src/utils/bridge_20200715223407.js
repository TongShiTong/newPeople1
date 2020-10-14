import { setUserInfo, setToken } from "../store/user";
import iOSBridge from "./iosBridge";

const browserInfo = {
  isAndroid: Boolean(navigator.userAgent.match(/android/gi)),
  isiPhone: Boolean(navigator.userAgent.match(/iphone|ipod/gi)),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/gi)),
};

function openInWebview() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    // 微信浏览器判断
    return false;
  } else if (ua.match(/QQ/i) == "qq") {
    // QQ浏览器判断
    return false;
  } else if (ua.match(/WeiBo/i) == "weibo") {
    return false;
  } else {
    if (ua.match(/Android/i) != null) {
      return ua.match(/browser/i) == null;
    } else if (ua.match(/iPhone/i) != null) {
      return ua.match(/safari/i) == null;
    } else {
      return ua.match(/macintosh/i) == null && ua.match(/windows/i) == null;
    }
  }
}

let bridge = undefined;
if (openInWebview()) {
  bridge = browserInfo.isAndroid ? window.App : iOSBridge;
}

export default {
  hasBridge: function() {
    return bridge != undefined;
  },
  isAndroid: function() {
    return browserInfo.isAndroid;
  },
  getUserInfo: function(callback) {
    // const userInfoStr = bridge.getUserInfo();
    // if (userInfoStr) {
    //   const userInfo = JSON.parse(userInfoStr);
    //   if (userInfo) {
    //     setToken(userInfo.token);
    //     setUserInfo({ uid: userInfo.uid, login_status: userInfo.login_status });
    //     callback();
    //   }
    // }
    // callback();
    if (browserInfo.isAndroid) {
      const userInfoStr = bridge.getUserInfo();
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        if (userInfo) {
          setToken(userInfo.token);
          setUserInfo({
            uid: userInfo.uid,
            login_status: userInfo.login_status,
          });
        }
      }
      callback();
    } else if (browserInfo.isiPhone) {
      bridge.callHandler("getUserInfo", {}, (response) => {
        if (response) {
          const userInfo = JSON.parse(response);
          setToken(userInfo.token);
          setUserInfo({
            uid: userInfo.uid,
            login_status: userInfo.login_status,
          });
        }
        callback();
      });
    }
  },
  startLogin: function() {
    // bridge.startLogin();
    if (browserInfo.isAndroid) {
      bridge.startLogin();
    } else if (browserInfo.isiPhone) {
      bridge.callHandler("startLogin", {}, (response) => {
        console.log(response);
      });
    }
  },
  shareWechat: function(title, content, imgUrl, url) {
    // bridge.shareWeChat(title, content, imgUrl, url);
    if (browserInfo.isAndroid) {
      // alert(`title: ${title},content:${content}, imgUrl:${imgUrl}, url:${url}`);
      bridge.shareWeChat(title, content, imgUrl, url);
    } else if (browserInfo.isiPhone) {
      bridge.callHandler(
        "shareWeChat",
        { title: title, content: content, imgUrl: imgUrl, url: url },
        (response) => {
          console.log(response);
        }
      );
    }
  },
  startGoodsDetails: function(shopId, itemId) {
    // bridge.startGoodsDetails(shopId, itemId);
    if (browserInfo.isAndroid) {
      bridge.startGoodsDetails(shopId, itemId);
    } else if (browserInfo.isiPhone) {
      bridge.callHandler(
        "startGoodsDetails",
        { shopId: shopId, itemId: itemId },
        (response) => {
          console.log(response);
        }
      );
    }
  },
};
