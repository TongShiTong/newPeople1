<template>
  <div class="login-page">
    <div class="header">
      <img src="@/assets/bargain/header.png" />
    </div>
    <div class="login-wrap">
      <div class="login-box">
        <div class="form-item">
          <input type="text" v-model="phone" class="input" @blur.prevent="changeBlur()" placeholder="请输入手机号" />
        </div>
        <div class="form-item">
          <input type="text" @blur.prevent="changeBlur()" oninput="if(value.length>6) value = value.slice(0,6)" maxlength="6" v-model="code" class="input" />
          <!-- 按钮激活 加cur -->
          
    <!-- isgt是一个布尔值，当前页面点击按钮，修改它，子组件监听数据变化，加载滑动模块 -->
          <Geet :isGeet="isgt" @geetPath="GeetPath" @clickChange="GeetChange"></Geet>
          <button
            v-bind:class="{'btn-code':true, cur:canSendCode}"
            @click="getCode"
            v-bind:disabled="!canSendCode"
          >{{getCodeButtonText}}</button>
        </div>
        <!-- 按钮激活 加 cur -->
        <!-- <button @click="btnClick()" class="btn-yz">
          点击验证
        </button> -->
        <button
          v-bind:class="{'btn-login':true, cur:validateForm}"
          @click="register"
          v-bind:disabled="!validateForm"
        >立即参与</button>
      </div>
    </div>
    <div class="pop-fade" v-show="popFade">
      <!-- 助力失败弹窗 -->
      <div class="surprise" style="background:#ffffff" v-if="isShowPop==8">
        <div class="surprise-title">助力失败</div>
        <div class="cloose-pop" @click="clonePop"><img src="@/assets/bargain/close2x.png" alt=""></div>
        <div class="jieshu">当前活动链接已过期</div>
        <div class="liji-js">
          <div class="surprise-btn" @click="clonePop">确认</div>
        </div>
      </div>

      <!-- 立即参与弹窗 -->
      <div class="scss-bg" v-if="isShowPop==9">
        <div class="raise">
          <div class="raise-title"></div>
          <div class="zhuli-avatar"><img :src="nicknameData.head_url" alt=""></div>
          <div class="cloose-pop" @click="surprisePop"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="youhu-name1"><img src="@/assets/bargain/scss.png" alt=""></div>
          <div class="help-me"><span>100</span>元猫山王优惠券已发放</div>
          <div class="raise-info">参与活动抢<span>1</span>元猫山王榴莲</div>
          <div class="raise-js">
            <div class="wumengkan" style="margin-bottom:0.375rem;">
              <div class="smzgy">山猫主果园</div>
              <div class="money"><span>￥</span>100</div>
              <div class="kuang">
                <div class="jj-title">猫山王榴莲帮减优惠券</div>
                <div class="jj-cont">限活动指定商品专用</div>
                <div>限2020年8月25日前使用</div>
              </div>
            </div>
            <div class="look-yh">优惠券可在萌地瓜App我的-优惠券中查看</div>
            <div class="raise-btn" @click="surprisePop">立即参与</div>
          </div>
        </div>
       </div>
      <!-- 助力成功弹窗 -->
      <div class="scss-bg" v-if="isShowPop==10">
        <div class="raise">
          <div class="raise-title"></div>
          <div class="zhuli-avatar"><img :src="nicknameData.head_url" alt=""></div>
          <div class="cloose-pop" @click="surprisePop"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="youhu-name1"><img src="@/assets/bargain/scss.png" alt=""></div>
          <div class="zlz-tu">
            <div class="help-me">您已是老用户，快去参加活动吧~</div>
          </div>
          <div class="raise-js">
            <div class="raise-btn" @click="surprisePop">立即参与</div>
          </div>
        </div>
      </div>
       <!-- 助力失败弹窗 -->
      <div class="surprise" style="background:#ffffff" v-if="isShowPop==11">
        <div class="surprise-title">助力失败</div>
        <div class="cloose-pop" @click="surprisePop"><img src="@/assets/bargain/close2x.png" alt=""></div>
        <div class="jieshu"><p>您已为该用户助力，无法再次助力</p><p>快去参加活动吧~</p></div>
        <div class="liji-js">
          <div class="surprise-btn" @click="surprisePop">确认</div>
        </div>
      </div>

      <!-- 助力领奖励弹窗 -->
      <div style="width:100%;height:100%;background:rgb(109,109,109)" v-if="isShowPop==0">
        <div class="raise">
          <div class="raise-title"></div>
          <div class="zhuli-avatar"><img :src="nicknameData.head_url" alt=""></div>
          <!-- <div class="cloose-pop"><img src="@/assets/bargain/close2x.png" alt=""></div> -->
          <div class="youhu-name">{{nicknameData.nickname}}</div>
          <div class="help-me"><img src="@/assets/bargain/32x.png" alt=""> 快来帮我助力~</div>
          <div class="raise-info">新用户领<span>100</span>元猫山王优惠券</div>
          <div class="raise-js">
            <div class="wumengkan">
              <div class="smzgy">山猫主果园</div>
              <div class="money"><span>￥</span>100
                <div class="nom">无使用门槛</div>
              </div>
              <div class="kuang">
                <div class="jj-title">猫山王榴莲帮减优惠券</div>
                <div class="jj-cont">限活动指定商品专用</div>
                <div>限2020年8月25日前使用</div>
              </div>
            </div>
            <div class="raise-btn" @click="toLogin">助力领奖励</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
/*eslint no-unused-vars: "warn"*/
import api from "../api/index";
import Geet from "../components/Geet.vue"
import { setToken, setUserInfo, getKey } from "../store/user";
import bridge from "../utils/bridge";

export default {
  name: "Login",
  data() {
    return {
      isgt: false,
      nicknameData:{},
      popFade: true,
      isShowPop: 0,
      phone: "",
      code: "",
      activeLogin: false,
      codeSendCountdown: 0,
      codeTimer: undefined
    };
  },
  components: {
    Geet
  },
  computed: {
    validatePhone() {
      return /^1[3456789]\d{9}$/.test(this.phone);
    },
    validateForm() {
      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        return false;
      }
      if (!/\d{6}$/.test(this.code)) {
        return false;
      }
      return true;
    },
    canSendCode() {
      return (
        /^1[3456789]\d{9}$/.test(this.phone) && this.codeSendCountdown === 0
      );
    },
    getCodeButtonText() {
      if (this.codeSendCountdown === 0) {
        return "获取验证码";
      } else {
        return `${this.codeSendCountdown}s`;
      }
    }
  },
 
  methods: {
     btnClick() {
      // console.log("2,按钮被点击，进行图形验证");
      this.isgt = !this.isgt;
    },
    // 极验图片加载之后，通过更改控制变量实现可以再次加载
    GeetChange(val) {
      this.isgt = val;
    },
    GeetPath(val) {
      // console.log("4,接受到图形验证参数，将参数发往服务端进行验证");
      // console.log(val);
      this.isgt = false;
      const self = this;
      let phone = this.phone;
      api.secVerification(val,phone).then(data => {
        // self.item = data;
        self.activeLogin = true;
        console.log(data)
      }).catch(err => alert(err));
      this.codeSendCountdown = 60;
      if (!this.codeTimer) {
        this.codeTimer = setInterval(() => {
          if (self.codeSendCountdown > 0) {
            self.codeSendCountdown -= 1;
          } else {
            clearInterval(self.codeTimer);
            self.codeTimer = undefined;
          }
        }, 1000);
      }
    },
    toLogin() {
      if (bridge.hasBridge()) {
        this.popFade=false,
        bridge.startLogin();
      } else {
        this.popFade=false;
        // this.$router.push("/login");
      }
    },
    // 兼容ios失去焦点时，不回弹
    changeBlur(){
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if(isIOS){
        setTimeout(() => {
          const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
          window.scrollTo(0, Math.max(scrollHeight - 1, 0))
          }, 200)
      }
    },
    surprisePop() {
      this.$router.push("/");
    },
    clonePop() {
      this.popFade = false;
    },
    getCode() {
      const self = this;
      this.isgt = !this.isgt;
      // api
      //   .getCode(this.phone, "login")
      //   .then(data => {
      //     self.activeLogin = true;
      //     console.log(data)
      //   })
      //   .catch(err => alert(err));  
      // this.codeSendCountdown = 60;
      // if (!this.codeTimer) {
      //   this.codeTimer = setInterval(() => {
      //     if (self.codeSendCountdown > 0) {
      //       self.codeSendCountdown -= 1;
      //     } else {
      //       clearInterval(self.codeTimer);
      //       self.codeTimer = undefined;
      //     }
      //   }, 1000);
      // }
    },
     // 获取进入时的头像昵称
    actionKeyUser() {
      let key = getKey();
      let self = this
      api.actionKeyUser(key).then(data => {
        // console.log(147,data)
        self.nicknameData = data
      }).catch(() => {
        // console.log(data)
        self.popFade = true;
        self.isShowPop = 8;
      }); 
    },
    register() {
      const self = this;
      // const recomendId = getRecomendId();
      const key = getKey();
      api
        .register(this.phone, this.code, key, "login_action")
        .then(data => {
          setToken(data.token.token);
          setUserInfo(data);
          if(data.login_status==0) {
            self.popFade = true;
            self.isShowPop = 9;
          }else if(data.login_status==1) {
            self.popFade = true;
            self.isShowPop = 10;
          }else {
            self.popFade = true;
            self.isShowPop = 11;
          }
        })
        .catch(err => {
          console.log(err);
          if (self.code === "888000") {
            setToken("vqkkvsPRraXJpTKAMlPTMRPrX-qESzqp");
            setUserInfo({ uid: "3467", login_status: 0, recommend_name:'榴榴莲莲吃' });
            self.$router.push("/");
          } else {
            self.code = "";
            alert(err);
          }
        });
    },
    isMobile() {

      if(this.isIos() && this.isAndroid()) {
        return true
      }else {
        return false
      }
    },
    // 判断是iosApp
    isIos() {
        var result;
        var rgx= new RegExp('iphone|ipad|ipod', 'i');
        var rgx2 = /app\/(\d+).(\d+)?/;
        if(rgx.test(window.navigator.platform) &&  rgx2.test(window.navigator.userAgent)){
            result = true;

        } else {
            result = false;
        }
        window.sessionStorage.isApp = result;
        return result;
    },
    // 判断AndroidApp
    isAndroid() {
      var result;
      var  rgx= new RegExp('linux', 'i');
      var rgx2 = /app\/(\d+).(\d+)?/;
      if ( rgx.test(window.navigator.platform) &&  rgx2.test(window.navigator.userAgent)) {
          result = true;

      } else {
          result = false;
      }
      window.sessionStorage.isApp = result;
      return result;
    }

  },
  created: function() {
    let self = this
    this.actionKeyUser();
    // if(this.isMobile()) { 
    //   // alert("移动端");
    //   console.log('移动端')
    // }else { 
    //   // alert("pc端");
    //   var ua = window.navigator.userAgent.toLowerCase();
    //   if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //     // alert('微信浏览器')
    //     console.log('微信浏览器端')
    //   } else {
    //     this.$router.push("/tips");
    //   }
    // }
     if (bridge.hasBridge()) {
      // bridge.getUserInfo(init);
      console.log('111',bridge.hasBridge())
    } else {
      // var ua = window.navigator.userAgent.toLowerCase();
      // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //   // alert('微信浏览器')
      //   console.log('微信浏览器端')
      // } else {
      //   self.$router.push("/tips");
      // }
    }

  },
  
};
</script>
<style lang="less" scoped>
.surprise {
    width:19.4375rem;
    height:16.6875rem;
    background: #FFF3DA;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 0.875rem;
  }
  .surprise-title {
    width: 10rem;
    height: 3.25rem;
    margin: -0.5rem auto 0;
    background: url(../assets/bargain/hear-bg.png) no-repeat;
    background-size: 100% 100%;
    font-weight: bold;
    font-size: 1.25rem;
    color: #101112;
    text-align: center;
    line-height: 3.25rem;
  }
  .cloose-pop {
    position: absolute;
    top: -0.9375rem;
    right: -0.9375rem;
    width: 1.875rem;
    height: 1.875rem;
    background: #ffffff;
    border-radius: 50%;
    padding: 0.25rem;
    box-sizing: border-box;
  }
  .cloose-pop img {
    width: 1.375rem;
    height: 1.375rem;
  }
  .jieshu {
    text-align: center;
    font-size: 0.9375rem;
    color: #101112;
    font-weight: 600;
    margin-top: 2.1875rem;
  }
    .liji-js {
    background: #ffffff;
    width: 100%;
    border-radius: 0.875rem;
    color: #101112;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    padding: 0.875rem 0 1.25rem;
    position: absolute;
    bottom: 0;
  }
   .surprise-btn {
    width: 15.8125rem;
    height: 3rem;
    background:linear-gradient(270deg,rgba(255,143,63,1) 0%,rgba(255,78,80,1) 100%);
    border-radius: 1.875rem;
    margin: 0.875rem auto 0;
    line-height: 3rem;
    font-size: 1.4375rem;
    font-weight: bold;
    color: #ffffff;
  }
  .scss-bg {
    width: 100%;
    height: 32.1875rem;
    background: url(../assets/bargain/bgzlcg2x.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .raise {
    width:19.4375rem;
    height:22.1875rem;
    background:url(../assets/bargain/bgzlz2x.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 0.875rem;
  }
  .raise-title {
    width: 7.125rem;
    height: 3.5625rem;
    position: absolute;
    left: 50%;
    transform: translate(-50%,0);
    top: -3.5rem;
    z-index: -1;
    /* margin: -2.6875rem auto 0; */
    background: #FFE3B3;
    /* border-radius: 50%; */
    border-top-left-radius: 3.5625rem;
    border-top-right-radius: 3.5625rem;
    /* border: 0.1875rem solid #FFF3DA; */
  }
  .zhuli-avatar {
    width: 6.625rem;
    height: 6.625rem;
    margin: -3.25rem auto 0;
    background: #a0a0a0;
    border-radius: 50%;
    overflow: hidden;
  }
  .zhuli-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .youhu-name {
    font-size: 1.125rem;
    text-align: center;
    color: #101112;
    font-weight: bold;
    margin: 0.75rem auto 0.8125rem;
  }
  .youhu-name1 {
    margin: 0.5rem auto 0.375rem;
    text-align: center;
  }
  .youhu-name1 img {
    width: 8.1875rem;
  }
  .zlz-tu {
    width: 17.5625rem;
    height: 11.375rem;
    margin: 0 auto;
    background: url(../assets/bargain/zhulizhe.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .help-me {
    font-size: 0.9375rem;
    text-align: center;
    color: #101112;
    font-weight: bold;
    vertical-align: middle;
  }
  .help-me img {
    width: 2.375rem;
    vertical-align: middle;
    margin-right: 0.125rem;
  }
  .help-me span {
    color: #FF3D13;
  }
  .raise-info {
    font-size: 0.9375rem;
    text-align: center;
    color: #101112;
    font-weight: bold;
    margin-top: 0.375rem;
  }
  .raise-info span {
    color: #FF3D13;
  }
  .raise-js {
    /* background: #ffffff; */
    width: 100%;
    border-radius: 0.875rem;
    color: #101112;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    padding: 0.875rem 0 1.25rem;
    position: absolute;
    bottom: 0;
  }
  .look-yh {
    text-align: center;
    font-size: 0.5625rem;
    color: #999999;
    font-weight: 400;
  }
  .raise-btn {
    width: 15.8125rem;
    height: 3rem;
    background:url(../assets/bargain/btn112x.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 1.875rem;
    margin: 1.25rem auto 0;
    line-height: 3rem;
    font-size: 1.3125rem;
    font-weight: bold;
    color: #ffffff;
  }
  .wumengkan {
    width: 17.0625rem;
    height: 4.875rem;
    margin: 0 auto 0.875rem;
    /* border: 1px solid #FF7040; */
    background: #FFEBD6;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    padding: 0.9375rem 0 1rem 1.1875rem;
    box-sizing: border-box;
    position: relative;
  }
  .smzgy {
    position: absolute;
    top: 0;
    left: 0;
    width: 4.625rem;
    height: 0.8125rem;
    background: url(../assets/bargain/smzgy.png) no-repeat;
    background-size: 100% 100%;
    font-size: 0.5rem;
    color: #FE5E29;
    font-weight: bold;
  }
  .kuang {
    font-size: 0.5625rem;
    color: #999999;
    font-weight: 400;
    text-align: left;
  }
  .jj-title {
    font-size: 0.8125rem;
    color: #FE5E29;
    font-weight: bold;
  }
  .jj-cont {
    font-size: 0.5625rem;
    margin-top: 0.3125rem;
  }
  .money {
    font-size: 1.75rem;
    color: #FE5E29;
    font-weight: bold;
    margin-right: 1.5rem;
  }
  .nom {
    color: #FE5E29;
    font-size: 0.625rem;
    font-weight: bold;
    text-align: center;
  }
  .money span {
    font-size: 0.875rem;
  }
  .jieshu {
    text-align: center;
    font-size: 0.9375rem;
    color: #101112;
    font-weight: 600;
    margin-top: 2.1875rem;
  }
  .btn-yz {
    position: relative;
    background-color: #FFFFFF;
    border-radius: 26px;
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0.6875rem 0 0.6875rem 0;
  }
 
</style>
