<template>
  <div class="home-page">
    <div class="cou_banner">
      <img src="@/assets/coupon/tu1.png" alt="">
      <img src="@/assets/coupon/tu2.png" alt="">
    </div>
    <div class="coupon_box">
      <img src="@/assets/coupon/tu3.png" alt="">
      <img src="@/assets/coupon/tu4.png" alt="">
      <img src="@/assets/coupon/tu5.png" alt="">
    </div>
    <div>

    </div>

    <div>
      <!-- <div class="top-bar">活动专题</div> -->
      <div class="header">
        <img src="@/assets/bargain/tbg2x.png" @click="toWeixin"/>
        <div class="rules" @click="toRule">规则</div>
        <div class="sp_title">山猫主D197猫山王榴莲</div>
      </div>
      <!-- <div class="picture-box"> 
        <div class="picture">
        
        </div>
      </div> -->
      <div class="progress_info"> 
        <!-- 倒计时轮播 -->
        <div class="swipe-box">
          <van-swipe style="height: 100%;width:100%" vertical :autoplay="3000" :show-indicators="false" :touchable="false">
            <van-swipe-item>已有{{dataTot.total}}+人参与抢购</van-swipe-item>
            <van-swipe-item v-if="isShowPop!=4&&isShowPop!=0">{{dowmTime}}</van-swipe-item>
          </van-swipe>
        </div>
        <div class="point" v-if="isShowPop==0">惊喜福利，有机会加速到<span>1元</span></div>
        <div class="point" v-if="isShowPop==1">仅剩<span>{{random}}%</span>即可减到<span>1元</span></div>
        <div class="point" v-if="isShowPop==2">再分享1个好友，可翻{{multiple}}倍减一次</div>
        <div class="point" v-if="isShowPop==3">仅差<span>{{doubleData.price}}</span>元减到<span>1元</span></div>
        <div class="point" v-if="isShowPop==4">238元优惠券（券后1元）已发放</div>
        <div class="point" v-if="isShowPop==5">你仅差<span>{{dataTot.sum}}</span>元完成任务，快重新开始吧~</div>
        <div class="progress-bar">
          <!-- cur 的进度是0~100% -->
          <div class='cur1' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
        </div>
        <div class="btn-lj" @click="acceleRate" v-if="isShowPop==0">
          立即加速
        </div>
        <div class="btn-lj" @click="showWXSharePopFade" v-else-if="isShowPop==1">
          分享1个群聊，再减一次
        </div>
        <div class="btn-lj" @click="doubleNow" v-else-if="isShowPop==2">
          分享1个好友，立即翻倍
        </div>
        <div class="btn-lj" @click="priceReduction" v-else-if="isShowPop==3">
          邀请好友立即减价
        </div>
        <div class="btn-lj" @click="toWeixin" v-else-if="isShowPop==4">
          立即抢购
        </div>
        <div class="btn-lj" @click="againStart" v-else-if="isShowPop==5">
          重新开始
        </div>
        <div class="yiyuan">
          <img src="@/assets/bargain/yiyuan.png" alt="">
        </div>
      </div>

      <div class="tabs-box">
        <div class="tabs">
          <div v-for="(item,index) in tabs" :key="index" :class="tabIndex==index?'tab-item':'tab-item1'" @click="bandTabs(index)">{{item}}</div>
          <div class="line-fg"></div>
          <div :class="tabIndex==0?'sanjiao':'sanjiao1'"></div>
        </div>
        <div class="my-reward" v-if="tabIndex==1">
          <div v-if="rewardData.length>0">
            <div class="reward-box" v-for="(item,index) in rewardData" :key="index">
              <img class="sjdp" src="@/assets/bargain/dpbq.png" alt="">
              <div class="coupon"><span>￥</span>{{item.rule.j}}
                <div class="nom">无使用门槛</div>
              </div>
              <div class="coupon-info">
                <div class="cou-tit">{{item.name}}</div>
                <div class="cou-cont">限活动指定商品专用 </div>
                <div class="cou-time">限2020年8月25日前使用</div>
              </div>
              <div class="coupon-btn" @click="toWeixin"><img src="@/assets/bargain/gosy.png" alt=""></div>
            </div>
            <div class="youhui">优惠券可在萌地瓜App我的-优惠券中查看</div>
          </div>
          <div v-else class="zanwu">
            你还没有获得奖励，快去参加活动吧～
          </div>
          
        </div>
        <div v-else class="record">
          <div v-if="helpRecordData">
            <div class="record-user" v-for="(item, index) in helpRecordData" :key="index">
              <div class="avatar-record">
                <div class="avatar"><img :src="item.head_url" alt=""></div>
                <div>
                  <div class="record-name">{{item.nickname}}</div>
                  <div class="zlcg" v-if="item.is_new==1">新用户助力，大减一次</div>
                  <div class="zlcg" v-else-if="item.is_new==3">老用户助力已达上限</div>
                  <div class="zlcg" v-else>助力成功，帮减一次</div>
                </div>
              </div>
              <div class="record-time"><img src="@/assets/bargain/zhuli.png" alt=""> 砍掉{{item.amount}}元</div>
            </div>
        
            <div class="total-num">最近5位助力成功的用户</div>
          </div>
          <div v-else class="zanwu">
            暂无记录，快去邀请好友吧～
          </div>
          
        </div>
      </div>

      <div class="title-img">
        <img src="@/assets/bargain/shaidan.png" alt="">
      </div>

      <div class="comment">
        <van-swipe style="height: 100%;width:100%;overflow: hidden;" vertical :autoplay="5000" :show-indicators="false" :touchable="false">
            <van-swipe-item v-for="(item,index) in commentDataList" :key="index">
              <div class="info-user">
                <div class="avatar-info">
                  <div class="avatar"><img :src="item.u.head_url" alt=""></div>
                  <div>
                    <div class="info-name">{{item.u.nickname}}</div>
                    <div style="margin-top:0.2rem">
                      <van-rate v-model="item.level" :size="18" readonly allow-half icon="http://t22.mengdigua.com/1.png" void-icon="http://t22.mengdigua.com/2.png"/>
                    </div>
                  </div>
                </div>
                <div class="info-time">{{item.create_time}}</div>
              </div>
              <div class="info-content">
                {{item.content}}
              </div>
              <div class="pl-box">
                <!-- <div class="pl-img" v-for="(it,index1) in item.meCommetImgs" :key="index1" @click="imgPreview(index)"><img :src="it" alt=""></div> -->
                <div class="pl-img" v-for="(it,index1) in item.meCommetImgs" :key="index1"><img :src="it" alt=""></div>
              </div>
            </van-swipe-item>
        </van-swipe>
        
        
      </div>

      <div class="title-img">
        <img src="@/assets/bargain/spdetail.png" alt="">
      </div>

      <div class="detail-box1">
        <div class="pic1">
          <img src="@/assets/detail/detail-1.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-2.png" />
        </div>
        <!-- <div class="pic">
          <img src="@/assets/detail/detail-3.png" />
        </div> -->
        <div class="pic">
          <img src="@/assets/detail/detail-4.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-5.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-6.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-7.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-8.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-9.png" />
        </div>
        <!-- <div class="pic">
          <img src="@/assets/detail/detail-10.png" />
        </div> -->
        <div class="pic">
          <img src="@/assets/detail/detail-11.png" />
        </div>
        <div class="pic">
          <img src="@/assets/detail/detail-12.png" />
        </div>
      </div>
      <!-- <ul class="time clearfix">
        <li
          v-for="(item, index) in eventTimes"
          :key="index"
          v-bind:class="{ cur: index === currentEventIndex }"
        >
          <p v-if="index === currentEventIndex && waitForEvent">即将开抢</p>
          <p v-if="index === currentEventIndex && !waitForEvent">正在开抢</p>
          {{ splitTime0(item) }}
          <br />
          {{ splitTime1(item) }}
        </li>
      </ul> -->
      
    </div>
  
    <!-- 当弹窗出现时，向body添加class名为hidden  解决弹窗出现时，页面滚动问题 -->
    <div class="pop-fade" v-show="popFade">
      <!-- 弹窗 立即参与-->
      <!-- <div class="pop-join pop-wrap" style="display:none">
        <img src="@/assets/pop-join.png" />
        <button class="btn-join"></button>
      </div> -->

      <div class="surprise-bg">
        <!-- 惊喜福利弹窗 -->
        <div class="surprise" v-if="isShowPop==0">
          <div class="surprise-title">惊喜福利</div>
          <div class="cloose-pop" @click="closePopFade"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="surprise-info">恭喜获得<span>1</span>元购买猫山王活动资格</div>
          <div class="progress-bar-surprise">
            <!-- cur 的进度是0~100% -->
            <div class='cur1-surprise' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
            <div class="tish-surprise">
              有机会加速到1元
            </div>
            <img class="zs-sj" src="@/assets/bargain/b2x.png" alt="">
          </div>
          <div class="liji-js">
            <div>点击加速，立即参加活动吧</div>
            <div class="surprise-btn" @click="acceleRate">立即加速</div>
          </div>
        </div>

         <!-- 加速成功弹窗 -->
        <div class="surprise" v-if="isShowPop==1">
          <div class="surprise-title">加速成功</div>
          <div class="cloose-pop" @click="closePopFade"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="surprise-info">仅剩<span>{{random}}%</span>即可减价成功</div>
          <div class="progress-bar-surprise">
            <!-- cur 的进度是0~100% -->
            <div class='cur1-surprise' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
            <div class="tish-surprise1">
              即将减成
            </div>
            <img class="zs-sj" src="@/assets/bargain/b2x.png" alt="">
          </div>
          <div class="liji-js">
            <div>分享1个群聊，可再减一次</div>
            <div class="surprise-btn" @click="showWXSharePopFade">立即分享</div>
          </div>
        </div>

        <!-- 分享成功弹窗 -->
        <div class="surprise" v-if="isShowPop==2">
          <div class="surprise-title">分享成功</div>
          <div class="cloose-pop" @click="closePopFade"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="surprise-info">多减了<span>{{price}}</span>元</div>
          <div class="progress-bar-surprise">
            <!-- cur 的进度是0~100% -->
            <div class='cur1-surprise' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
            <div class="tish-surprise1">
              即将减成
            </div>
            <img class="zs-sj" src="@/assets/bargain/b2x.png" alt="">
          </div>
          <div class="liji-js">
            <div>再分享1个好友，可翻？？倍减一次</div>
            <div class="surprise-btn" @click="doubleNow">立即翻倍</div>
          </div>
        </div>

        <!-- 翻倍成功弹窗 -->
        <div class="surprise" style="height:20rem;" v-if="isShowPop==3">
          <div class="surprise-title">翻倍成功</div>
          <div class="cloose-pop" @click="closePopFade"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="surprise-info">共翻了{{doubleData.times}}倍，仅差<span>{{doubleData.price}}</span>元成功</div>
          <div class="progress-bar-surprise">
            <!-- cur 的进度是0~100% -->
            <div class='cur1-surprise' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
            <div class="tish-surprise">
              即将减成
            </div>
             <img class="zs-sj" src="@/assets/bargain/b2x.png" alt="">
          </div>
          <div class="liji-js">
            <div class="toux-box">
              <div class="toux">
                <img src="@/assets/bargain/hlg.png" alt="">
              </div>
              <div class="toux">
                <img src="@/assets/bargain/taozi.png" alt="">
              </div>
              <div class="toux">
                <img src="@/assets/bargain/12x.png" alt="">
              </div>
              <div class="toux">
                <img src="@/assets/bargain/12x.png" alt="">
              </div>
              <div class="toux">
                <img src="@/assets/bargain/12x.png" alt="">
              </div>
            </div>
            <div>继续邀请朋友助力，即可减到1元</div>
            <div class="surprise-btn" @click="priceReduction">喊好友继续助力</div>
          </div>
        </div>

        <!-- 减价成功弹窗 -->
        <div class="surprise" style="height:20rem;" v-if="isShowPop==4">
          <div class="surprise-title">减价成功</div>
          <div class="cloose-pop" @click="closePopFade"><img src="@/assets/bargain/close2x.png" alt=""></div>
          <div class="surprise-info">238元优惠券（券后<span>1</span>元）已发放</div>
          <div class="progress-bar-surprise">
            <!-- cur 的进度是0~100% -->
            <div class='cur1-surprise' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
            <div class="tish-surprise" style="right:-1.5rem;">
              已减成
            </div>
            <img class="zs-sj" src="@/assets/bargain/b2x.png" alt="">
          </div>
          <div class="liji-js">
            <div class="wumengkan">
              <div class="smzgy">山猫主果园</div>
              <div class="money"><span>￥</span>238
                <div class="nom">无使用门槛</div>
              </div>
              <div class="kuang">
                <div class="jj-title">猫山王榴莲帮减优惠券</div>
                <div class="jj-cont">限活动指定商品专用</div>
                <div>限2020年8月25日前使用</div>
              </div>
            </div>
            <div class="surprise-btn" @click="toWeixin">立即抢购</div>
          </div>
        </div>
      </div>
      
      <!-- 任务失败弹窗 -->
      <div class="surprise" v-if="isShowPop==5">
        <div class="surprise-title">任务失败</div>
        <div class="cloose-pop" @click="closePopFade"><img src="@/assets/bargain/close2x.png" alt=""></div>
        <div class="surprise-info">你仅差<span>{{dataTot.sum}}</span>元，快重新开始吧~</div>
        <div class="progress-bar-surprise">
          <!-- cur 的进度是0~100% -->
          <div class='cur1-surprise' :style="{ width: (getPrecentData ? 100-getPrecentData : 100) + '%' }"></div>
          <div class="tish-surprise">
            1元猫山王榴莲
          </div>
           <img class="zs-sj" src="@/assets/bargain/b2x.png" alt="">
        </div>
        <div class="liji-js">
          <div>再接再历，重新开始</div>
          <div class="surprise-btn" @click="againStart">重新开始</div>
        </div>
      </div>
       <!-- 活动已结束弹窗 -->
      <div class="surprise" style="background:#ffffff" v-if="isShowPop==6">
        <div class="surprise-title">活动已结束</div>
        <div class="cloose-pop"><img src="@/assets/bargain/close2x.png" alt=""></div>
        <div class="jieshu">当前活动结束，敬请期待下场活动吧~</div>
        <div class="liji-js">
          <div class="surprise-btn">确认</div>
        </div>
      </div>

      
      
      <!-- 弹窗 助力 -->
      <!-- <div class="pop-help pop-wrap" v-show="!hasToken">
        <img src="@/assets/pop-help.png" />
        <button class="btn-help" @click="toLogin"></button>
        <button class="btn-close" @click="toLogin"></button>
      </div> -->

      <!-- 弹窗 助力成功 -->
      <!-- <div class="pop-help-ok pop-wrap" v-show="hasToken && firstTimeEnter">
        <img src="@/assets/pop-help-ok.png" />
        <div class="text">
          <span>{{ getRecommendName }}</span>送你100元猫山王优惠券
        </div>
        <button class="btn-ok" @click="closePopFade"></button>
        <button class="btn-close" @click="closePopFade"></button>
      </div> -->

      <!-- 弹窗 分享链接 -->
    </div>
    <div class="pop-fade1" v-show="popFade1" @click="closeWXSharePopFade">
      <div class="pop-share pop-wrap" v-show="showWXShare">
        <div class="pic">
          <img src="@/assets/share.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, setKeyData, getKeyData, getKey, setAgain, getAgain, getfrist1, getfrist2, getfrist3, setfrist1, setfrist2, setfrist3 } from "../store/user";
import bridge from "../utils/bridge";
// import enter from "../utils/checkFirstTime";
import api from "../api/index";
import moment from 'moment/moment'
import { ImagePreview } from 'vant';

export default {
  name: "Home",
  data() {
    return {
      tabs:['助力记录','我的奖励'],
      tabIndex: 0,
      commentDataList:[], //评论列表
      isShowPop: 0,
      dataTot: {
        end_time:'',
        sum:'',
        total: ''
      },
      timerDs: null,
      dowmTime: '',//倒计时
      random: '',//随机数
      price:'2.3',//价钱
      multiple:'',//翻倍
      doubleData:{
        times: 8.1
      },
      getPrecentData: 92,//进度条长度，数值越大进度条越小
      helpRecordData: [],//助力记录数据
      rewardData: [],//我的奖励数据
      nicknameData:{},//头像和昵称
      link:'',//保存的key
      popFade1: false,
      firstTimeEnter: false,
      hasToken: false,
      popFade: false,
      showWXShare: false,
      recommendName: "",
      item: undefined,
      invitations: [],
      needInviteCount: 6,
      canReceiveCoupanMoney: 170,
      invateShowList: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      recentRegisters: [],
      randomRegisterText: "",
      coupans: [],
      eventTimes: [],
      waitForEvent: true,
      currentEventIndex: 0,
      countdownText: "",
      countdownTimer: undefined,
      refreshTimer: undefined
    };
  },
  methods: {
    // // 弹出惊喜弹框
    // surprisePop() {
    //   this.isShowPop=0;
    // },
    // 页面状态
    newPageStatus() {
      let self = this;
       api.pageStatus().then(data => {
         if(data.status=='3') {
          self.doubleData.price = data.sum;
         }
       })
    },
    pageStatus() {
      let self = this;
      // self.popFade = false;
      api.pageStatus().then(data => {
        // self.isShowPop = data.status
        let n = Math.round((data.total /10000) * 100) / 100 + '万';
        self.dataTot = data;
        self.popFade = true;
        self.dataTot.total = n;
        self.link = data.key;
        self.onShare();

        setKeyData(data.key);
        setInterval(function () {
          self.countDownData()
        }, 1000)
        if(data.status=='0') {
          self.isShowPop = 0;
        }else if(data.status=='1') {
          if(getAgain()) {
            self.popFade = true;
            let again = 0;
            setAgain(again)
          }else {
            if(getfrist1()) {
              self.popFade = false;
            }
          }
          let result = self.fullClose(9.5, 9.9);
          self.random = Math.round(result * 100) / 100
          self.isShowPop = 1;
          self.getPrecentData = 20;

          let isfirs = "1"
          setfrist1(isfirs)

        }else if(data.status=='2') {
          let result = self.fullClose(8.0, 10.0);
          self.multiple = Math.round(result * 100) / 100
           
          if(getAgain()) {
            self.popFade = true;
            let again = 0;
            setAgain(again)
          }else {
            if(getfrist2()) {
              self.popFade = false;
            }
          }
          self.isShowPop = 2;
          self.getPrecentData = 18;
          let isfirs = "1"
          setfrist2(isfirs)
        }else if(data.status=='3') {
          if(getAgain()) {
            self.popFade = true;
            let again = 0;
            setAgain(again)
          }else {
            if(getfrist3()) {
              self.popFade = false;
            }
          }
          self.doubleData.price = data.sum;
          self.isShowPop = 3;
          self.getPrecentData = 9;
          let isfirs = "1"
          setfrist3(isfirs)
        }else if(data.status=='4') {
          self.getPrecentData = 9;
          self.isShowPop = 5;
        }else if(data.status=='5') {
          self.isShowPop=4
          setTimeout(() => {
            self.getPrecentData = 0;
          }, 100);
        }else if(data.status=='6') {
          self.isShowPop=6
        }
        // console.log(data)
      }).catch(() => {
        // console.log(data)
      });
    },
    
    //重新开始
    againStart(){
      // let isfirs = 0;
      // setfrist1(isfirs)
      // setfrist2(isfirs)
      // setfrist3(isfirs)
      let again = 1;
      setAgain(again)
      this.popFade = true;
      this.isShowPop=0;
      this.getPrecentData = 92;
    },
    // 立即减价
    priceReduction() {
      // let self = this
       if (bridge.hasBridge()) {
        const title = "急！就差你了，助我抢1元榴莲~";
        const desc = "点击帮TA助力一下得100元无门槛榴莲券";
        const imgUrl =
          "https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/AWXZMNTHK0124569_1596790476.png";
        // const recomendId = getUserInfo().uid;
        // const key = self.link;
        const key = getKeyData();

        // 定义分享链接,使用encodeURIComponent对传入参数编码，防止在iOS中传入参数编码问题
        // 此处示例传递单个参数
        const _shareLink =
          window.location.origin +
          "/#?" +
          encodeURIComponent("key") +
          "=" +
          encodeURIComponent(key);
        bridge.shareWechat(title, desc, imgUrl, _shareLink);
      }else {
        this.showWXShare = true;
        this.popFade1 = true;
      }
    },
    // 立即翻倍
    doubleNow() {
      let self = this
      if (bridge.hasBridge()) {
        const title = "急！就差你了，助我抢1元榴莲~";
        const desc = "点击帮TA助力一下得100元无门槛榴莲券";
        const imgUrl =
          "https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/AWXZMNTHK0124569_1596790476.png";
        // const recomendId = getUserInfo().uid;
        const key = getKeyData();
        // const key = self.link;

        // 定义分享链接,使用encodeURIComponent对传入参数编码，防止在iOS中传入参数编码问题
        // 此处示例传递单个参数
        const _shareLink =
          window.location.origin +
          "/#?" +
          encodeURIComponent("key") +
          "=" +
          encodeURIComponent(key);
        bridge.shareWechat(title, desc, imgUrl, _shareLink);
        api.actionDouble().then(data => {
          
          setTimeout(()=>{
            self.popFade = true;
            self.isShowPop = 3;
            self.getPrecentData = 9;
          },3000)
          let isfirs = "1"
          setfrist3(isfirs)
          self.doubleData = data
          // localStorage.setItem("doubleData", self.doubleData);
        })
      }else {
        let self = this
        this.showWXShare = true;
        this.popFade1 = true;
        api.actionDouble().then(data => {
          // self.popFade = true;
          // self.isShowPop = 3;
          // setTimeout(()=>{
          //   self.getPrecentData = 9;
          // },100)
          // console.log(data)
          self.doubleData = data
          // localStorage.setItem("doubleData", self.doubleData);
          let isfirs = "1"
          setfrist3(isfirs)
          
        }).catch(() => {
          // console.log(data)
        });
      }
    },
    // 助力记录
    actionList() {
      let self = this;
      api.actionList().then(data => {
        self.helpRecordData = data;
      }).catch(() => {
        // console.log(data)
      }); 
    },
    // 奖励列表
    rewardList() {
      let self = this;
      api.rewardList().then(data => {
        for(let i=0;i<data.length;i++) {
          data[i].rule = JSON.parse(data[i].rule)
          data[i].start_time = data[i].start_time.slice(0,-9).replace(/-/g,"/")
          data[i].end_time = data[i].end_time.slice(0,-9).replace(/-/g,"/")
        }
        self.rewardData = data;
        // console.log(self.rewardData)
      }).catch(() => {
        // console.log(data)
      }); 
    },

    // 生成随机数
    fullClose(n, m) {
        var result = Math.random() * (m + 1 - n) + n;
        while (result > m) {
            result = Math.random() * (m + 1 - n) + n;
        }
        return result;
    },
    // 立即加速
    acceleRate() {
      let self = this;
      api.speedUp().then(data => {
        let result = self.fullClose(9.5, 9.9);
        self.random = Math.round(result * 100) / 100
        self.popFade = true;
        self.isShowPop = 1;
        self.dataTot.end_time = data.end_time;
        setKeyData(data.key);
        setInterval(function () {
          self.countDownData()
        }, 1000)
        setTimeout(()=>{
          self.getPrecentData = 20;
        },100)
        let isfirs = "1"
        setfrist1(isfirs)
        // console.log(data)
      }).catch(() => {
        // console.log(data)
      });
    },
    // 点击tabs
    bandTabs(index) {
      this.tabIndex = index
      if(index==0) {
        this.actionList();
      }else if(index==1) {
        this.rewardList();
      }
    },
    imgPreview(index) {
      let imgList = []
      imgList = this.commentDataList[index].meCommetImgs
      ImagePreview(imgList);
    },
    // 24小时倒计时
    countDownData() {
      // 目标日期时间戳
      let self = this
      let endTime = self.dataTot.end_time.replace(/-/g,"/")
      // console.log(123,endTime)
      const end = Date.parse(new Date(endTime))
      // 当前时间戳
      const now = Date.parse(new Date())
      // var end = new Date(new Date().getTime() + 24*60*60*1000); //后一天
      // 相差的毫秒数
      const msec = end - now
      // 计算时分秒数
      // let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60 % 24)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      // 个位数前补零
      hr = hr > 9 ? hr : '0' + hr
      min = min > 9 ? min : '0' + min
      sec = sec > 9 ? sec : '0' + sec
      // 控制台打印
      if(msec>=0) {
        this.dowmTime = `${hr}:${min}:${sec} 后过期`
      }else {
        this.dowmTime = "已过期"
      }
      
      // console.log(`${day}天 ${hr}小时 ${min}分钟 ${sec}秒`)
      // 一秒后递归
    },
    toLogin() {
      if (bridge.hasBridge()) {
        bridge.startLogin();
      } else {
        let obj = {}
        let key = getKey();
        obj.key = key
        // this.$router.push("/login?key=" + key);
        // console.log(obj)
        this.$router.push({path:'/login',query: obj}).catch(err => {err});
      }
    },
    toRule() {
      this.$router.push("/rule");
    },
    toWeixin() {
      if (bridge.hasBridge()) {
        bridge.startGoodsDetails(this.item.shop_id, this.item.item_id);
      } else {
        // this.$router.push("/weixin");
        location.href = 'http://d.mengdigua.com/'
      }
    },
    closePopFade() {
      this.popFade = false;
    },
    // 微信分享
    // wxOnShare() {
    //   api.onShare().then(data => {
    //     console.log(data)
    //   }).catch(() => {
    //     // console.log(data)
    //   });
    // },
    showWXSharePopFade() {
      let self = this
      if (bridge.hasBridge()) {
        const title = "急！就差你了，助我抢1元榴莲~";
        const desc = "点击帮TA助力一下得100元无门槛榴莲券";
        const imgUrl =
          "https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/AWXZMNTHK0124569_1596790476.png";
        // const recomendId = getUserInfo().uid;
        const key = getKeyData();
        // const key = self.link;

        // 定义分享链接,使用encodeURIComponent对传入参数编码，防止在iOS中传入参数编码问题
        // 此处示例传递单个参数
        const _shareLink =
          window.location.origin +
          "/#?" +
          encodeURIComponent("key") +
          "=" +
          encodeURIComponent(key);
        bridge.shareWechat(title, desc, imgUrl, _shareLink);
        api.onShare().then(data => {
          let result = self.fullClose(8.0, 10.0);
          self.multiple = Math.round(result * 100) / 100
          self.price = data.price;
          localStorage.setItem("priceShare", self.price);
          
          setTimeout(()=>{
            self.popFade = true;
            self.isShowPop = 2;
            self.getPrecentData = 18;
          },3000)
          let isfirs = "1"
          setfrist2(isfirs)
          if(data.errcode==30001) {
              self.pageStatus();
          }
        })
      } else {
        // this.firstTimeEnter = false;
        let self = this;
        this.showWXShare = true;
        this.popFade1 = true;
        api.onShare().then(data => {
          // console.log(data)
            let result = self.fullClose(8.0, 10.0);
            self.multiple = Math.round(result * 100) / 100
            self.price = data.price;
            localStorage.setItem("priceShare", self.price);
            let isfirs = "1"
            setfrist2(isfirs)
            // self.popFade = true;
            // self.isShowPop = 2;
            // self.getPrecentData = 18;
            // if(data.errcode==30001) {
            //    self.pageStatus();
            // }
        });
        // let self = this
        // this.popFade = true;
        // this.isShowPop=2
        // setTimeout(() => {
        //   self.getPrecentData = 6;
        // }, 100);
      }
    },
    closeWXSharePopFade() {
      this.showWXShare = false;
      this.popFade1 = false;
    },
    getItem() {
      const self = this;
      api.getItem(118316).then(data => {
      // api.getItem(114584).then(data => {
        self.item = data;
        // self.getEventTimes();
      });
    },
    getRecentRegisters: function() {
      const self = this;
      api.getRecentRegisters().then(data => {
        self.recentRegisters = data;
        const randomElement = data[Math.floor(Math.random() * data.length)];
        this.randomRegisterText = `用户${randomElement.nickname}已参与了抢购`;
      });
    },
    getInvitations: function() {
      const self = this;
      api.getInvitations().then(data => {
        if (data) {
          self.invitations = data;
          const emptyList = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
          const showList = [...self.invitations, ...emptyList].slice(0, 10);
          self.invateShowList = showList;
          const length = data.length;
          if (length < 6) {
            self.needInviteCount = 6 - length;
            self.canReceiveCoupanMoney = 170;
          } else if (length < 10) {
            self.needInviteCount = 10 - length;
            self.canReceiveCoupanMoney = 190;
          }
        }
      });
    },
    getCoupans: function() {
      const self = this;
      api.getCoupons(118316, "item", 9).then(data => {
        self.coupans = data.list;
      });
    },
    commentList: function() {
      const self = this;
      api.commentList().then(data => { 
        for(let i=0;i<data.list.length;i++) {
          data.list[i].level = Number(data.list[i].level)
          data.list[i].create_time = data.list[i].create_time.slice(0,-9)
          if(data.list[i].u.nickname.length>2) {
            let str = data.list[i].u.nickname
            let num = str.length;
            let a = str[0];
            for(let i=0;i<num-2;i++) {
              a+='*'
            }
            a+=str[num-1]
            data.list[i].u.nickname = a
          }else {
            let str = data.list[i].u.nickname
            data.list[i].u.nickname = data.list[i].u.nickname.replace(str.substr(1,1),'*')
          }
        }
        self.commentDataList = data.list
      });
    },
    canReceiveCoupan: function(coupan) {
      if (coupan.discount_num == 170) {
        return this.invitations.length >= 6;
      }
      if (coupan.discount_num == 190) {
        return this.invitations.length >= 10;
      }
      return true;
    },
    receiveCoupan: function(coupanId) {
      const self = this;
      api.receiveCoupon(coupanId).then(data => {
        self.getCoupans();
        console.log(data);
      });
    },
    getEventTimes: function() {
      const self = this;
      api.getEventTimes().then(data => {
        self.eventTimes = data;
        self.getCurrentDateIndex();
        self.setCountdownTimer();
      });
    },
    peekEventTimes: function(mapEventTimes, index) {
      if (index + 1 >= mapEventTimes.length - 1) {
        return false;
      } else {
        const item = mapEventTimes[index + 1];
        const time = Date.parse(item);
        const currentTime = new Date().getTime();
        return currentTime > time;
      }
    },
    getCurrentDateIndex: function() {
      if (this.eventTimes.length > 0) {
        let index = 0;
        const mapEventTimes = this.eventTimes.map(t => `2020/${t}`);
        for (const item of mapEventTimes) {
          const time = Date.parse(item);
          const currentTime = new Date().getTime();
          if (currentTime < time) {
            if (this.item.stock === 0) {
              index += 1;
            }
            break;
          } else {
            if (!this.peekEventTimes(mapEventTimes, index)) {
              if (this.item.stock > 0) {
                this.waitForEvent = false;
                break;
              }
            }
            index += 1;
          }
        }
        if (index > this.eventTimes.length - 1) {
          index = this.eventTimes.length - 1;
        }
        this.currentEventIndex = index;
        this.sliceEventTimes();
      } else {
        this.currentEventIndex = 0;
      }
    },
    sliceEventTimes() {
      if (this.eventTimes.length > 0) {
        const index = this.currentEventIndex;
        const length = this.eventTimes.length;
        if (index + 4 <= length - 1) {
          this.currentEventIndex = 0;
          this.eventTimes = this.eventTimes.slice(index, index + 4);
        } else {
          const pad = index + 4 - (length - 1);
          const newIndex = index - pad;
          this.currentEventIndex = pad;
          this.eventTimes = this.eventTimes.slice(newIndex, newIndex + 4);
        }
      } else {
        return this.eventTimes;
      }
    },
    getCountdownText: function() {
      let that = this
      if (this.waitForEvent && this.eventTimes.length > 0) {   
        let timeData = "2020/" + that.eventTimes[that.currentEventIndex];

        let currentTimedata = new Date(timeData);
        let time = moment(currentTimedata).valueOf();

        const newCurrentTime = new Date()
        const currentTime = moment(newCurrentTime).valueOf();
        let countdown = time - currentTime;
        const hour = Math.floor(countdown / 3600000);
        countdown = countdown % 3600000;
        const min = Math.floor(countdown / 60000);
        countdown = countdown % 60000;
        const second = Math.floor(countdown / 1000).toFixed(0);

        this.countdownText = `距离开始还剩 <span>${hour}</span> 小时 <span>${min}</span> 分 <span>${second}</span> 秒`;
      } else {
        this.countdownText = "正在抢购中";
      }
    },
    transformTime(t){
        //利用moment工具生成date对象
        let date = moment(t).toDate()
        //变成秒级时间戳
        console.log('date1:'+ date)
        return moment(date).valueOf()
    },
    splitTime0: function(time) {
      return time.split(" ")[0];
    },
    splitTime1: function(time) {
      return time.split(" ")[1];
    },
    setCountdownTimer: function() {
      if (!this.countdownTimer) {
        const self = this;
        this.countdownTimer = setInterval(() => {
          self.getCountdownText();
          if (!(self.waitForEvent && self.eventTimes.length > 0)) {
            clearInterval(self.countdownTimer);
            self.countdownTimer = undefined;
          }
        }, 1000);
      }
    },

    setRefreshTimer: function() {
      if (!this.refreshTimer) {
        const self = this;
        this.refreshTimer = setInterval(() => {
          self.init();
        }, 10000);
      }
    },
    init: function() {
      this.getItem();
      this.getInvitations();
      this.getRecentRegisters();
      this.getCoupans();
      if (!this.refreshTimer) {
        this.setRefreshTimer();
      }
    },
    onShare() {
      // 传入后台签名URL，域名+当前分享页面路径
      const _WXurl = window.location.origin + window.location.pathname;
      const wx = window.wx;
      let self = this;
      //向后台发起请求获得config配置参数
      api
        .wxShare(_WXurl)
        .then(data => {
          // console.log(123,data)
          if (data) {
            // 请求接口成功后，
            // 配置config
            wx.config({
              // 开启调试模式时,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              debug: false,
              // 后台返回之前获取的appId
              appId: data.appid,
              // 必填，生成签名的时间戳
              timestamp: data.timestamp,
              // 必填，生成签名的随机串
              nonceStr: data.nonceStr,
              // 必填，签名，见附录1
              signature: data.signature,
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录3
              jsApiList: [
                "checkJsApi",
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideMenuItems"
              ]
            });

            // 微信检查接口列表
            wx.checkJsApi({
              jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideMenuItems"
              ], // 需要检测的JS接口列表
              success: function(res) {
                console.log(123,res);
              }
            });

            // 隐藏微信右上角弹出菜单中部分功能按钮
            wx.hideMenuItems({
              menuList: [
                "menuItem:share:qq",
                "menuItem:share:QZone",
                "menuItem:share:weiboApp",
                "menuItem:copyUrl"
              ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录4
              success: function(res) {
                console.log(456,res);
     
              }
            });

            // 页面加载完成后用户就有可能调用微信的分享，所以当页面ready 完后就加载
            wx.ready(function() {
              const title = "急！就差你了，助我抢1元榴莲~";
              const desc = "点击帮TA助力一下得100元无门槛榴莲券";
              const imgUrl =
                "https://koali.oss-cn-hangzhou.aliyuncs.com/__liemi__/image/png/AWXZMNTHK0124569_1596790476.png";
              // const recomendId = getUserInfo().uid;
              const key = getKeyData();

              // 定义分享链接,使用encodeURIComponent对传入参数编码，防止在iOS中传入参数编码问题
              // 此处示例传递单个参数
              const _shareLink =
                window.location.origin +
                "/#?" +
                encodeURIComponent("key") +
                "=" +
                encodeURIComponent(key);
        
              // 分享到朋友圈
              wx.onMenuShareTimeline({
                // 分享标题
                title: title,
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: _shareLink,
                // 分享图标
                imgUrl: imgUrl,
                // 用户确认分享后执行的回调函数
                success: function() {
                  console.log("分享回调函数");
                  console.log("shareLink= " + _shareLink);
                  self.showWXShare = false;
                  self.popFade1 = false;
                  self.pageStatus();
                },
                // 用户取消分享后执行的回调函数
                cancel: function() {
                  console.log("取消分享回调函数");
                  // alert('取消分享回调函数');
                }
              });

              // 分享好友
              wx.onMenuShareAppMessage({
                // 分享标题
                title: title,
                // 分享描述
                desc: desc,
                // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                link: _shareLink,
                // 分享图标
                imgUrl: imgUrl,
                // 用户确认分享后执行的回调函数
                success: function() {
                  console.log("分享好友回调函数");
                  console.log("shareLink= " +  _shareLink);
                  // alert('分享回好友调函数');
                  self.showWXShare = false;
                  self.popFade1 = false;
                  self.pageStatus();

                },
                // 用户取消分享后执行的回调函数
                cancel: function() {
                  console.log("取消分享好友调函数");
                  // alert('取消分享回调函数');
                  // console.log('分享回好友调函数');
                }
              });
            });
            // 微信预加载失败回调
            wx.error(function(res) {
              console.log(res);
              alert('失败');
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取进入时的头像昵称
    actionKeyUser() {
      let key = getKey();
      let self = this;
      api.actionKeyUser(key).then(data => {
        // console.log(147,data)
        self.nicknameData = data
      }).catch(() => {
        // console.log(data)
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
  computed: {
    getItemName: function() {
      if (this.item) {
        return this.item.title;
      } else {
        return "马来西亚猫山王榴莲1.1～1.3kg";
      }
    },
    getStock: function() {
      if (this.item) {
        return this.item.stock;
      } else {
        return 0;
      }
    },
    getPrecent: function() {
      if (this.item) {
        return Math.round((this.item.stock / 500)*100);
      } else {
        return 100;
      }
    },
    getRecommendName: function() {
      if (this.recommendName.length <= 4) {
        return this.recommendName;
      } else {
        return this.recommendName.slice(0, 3) + "...";
      }
    }
  },
  created: function() {

    // const self = this;
    // this.actionKeyUser();
    // this.commentList();
    // this.getItem()
    // this.actionList();
    // this.rewardList();
    // localStorage.getItem("priceShare");


    // // localStorage.getItem("doubleData");
    
    // // const key = getKey();

    function init() {
      const token = getToken();
      if (token) { 
        self.timerDs = setInterval(() =>{
          self.actionList();
          self.rewardList();
          self.newPageStatus();
        },5000)
        self.pageStatus();
        
      } else {
        self.toLogin();
        // self.popFade = true;
        // self.isShowPop = 8;
      }
      //  if(self.isMobile()) { 
      // // alert("移动端");
      //     console.log('移动端');
      //   }else { 
      //     // alert("pc端");
          
      //   }
    }
    if (bridge.hasBridge()) {
      bridge.getUserInfo(init);
    } else {
      // init();
      // var ua = window.navigator.userAgent.toLowerCase();
      // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //   // alert('微信浏览器')
      //   console.log('微信浏览器端')
      // } else {
      //   self.$router.push("/tips");
      // }
    }
  },
  beforeDestroy() {
    let self = this
    if(self.timerDs) {
　　　　clearInterval(self.timerDs); //关闭
　　 }  //利用vue的生命周期函数
  }
  
};
</script>
<style>

  
  .cou_banner img {
    width: 100%;
    display: block;
  }
  .coupon_box {
    display: flex;
    width: 100%;
  }
  .coupon_box img {
   
  }

  .picture-box {
    height: 2.25rem;
    position: relative;
  }
  .picture {
    width: 9.375rem;
    height: 9.375rem;
    margin: 0 auto;
    background: #D8D8D8;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform:translate(-50%,0)
  }
  .sp_title {
    position: absolute;
    bottom: 0.625rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 21.6875rem;
    height: 2rem;
    font-size: 1.0625rem;
    color: #414141;
    font-weight: bold;
    text-align: center;
    line-height: 2rem;
    background: rgba(255,255,255,0.59);
    border-radius: 1.1875rem;
  }
  .progress_info {
    /* width: 21.6875rem; */
    /* height: 12.5rem; */
    margin: 0.625rem 0.875rem 0;
    background: url(../assets/bargain/bg0032x.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 0.6875rem;
    position: relative;
    padding: 0 1.5rem 1.375rem;
  }
  .swipe-box {
    margin:0 auto;
    width: 10.6875rem;
    height: 1.8125rem;
    overflow: hidden;
    text-align: center;
    /* background: #FFE7CA; */
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    line-height: 1.8125rem;
    font-size: 0.875rem;
    color: #ffffff;
    font-weight: bold;
  }
  .point {
    text-align: center;
    font-size: 0.875rem;
    color: #222222;
    font-weight: bold;
    margin: 1.1875rem auto 1.4375rem;
  }
  .point span {
    font-size: 1.375rem;
    color: #FF3D13;
  }

  .progress-bar {
    position: relative;
    /* width: 17.5rem; */
    height: 0.875rem;
    background: #f0f0f0;
    border-radius: 0.5rem;
    margin: 0 0.625rem;
  }
  .cur1 {
    background:linear-gradient(270deg,rgba(255,109,1,1) 0%,rgba(255,209,0,1) 100%);
    position: absolute;
    left: 0;
    top: 0;
    height: 0.875rem;
    width: 100%;
    border-radius: 0.5rem;
    transition: width 1s;
  }
  .btn-lj {
    /* width: 18.75rem; */
    animation:mymove 1s infinite;
    -webkit-animation:mymove 1s infinite;
    transform:scale(1);
    height: 2.6875rem;
    margin: 0 auto;
    background: url("../assets/bargain/btn2x.png") no-repeat;
    background-size: 100% 100%;
    font-size: 1.125rem;
    color: #ffffff;
    font-weight: bold;
    text-align: center;
    line-height: 2.6875rem;
    margin-top: 1.25rem;
  }
  @keyframes mymove
  {
    0% {transform:scale(1);}
    50% {transform:scale(1.05);}
    100% {transform:scale(1);}
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/
  {
    0% {transform:scale(1);}
    50% {transform:scale(1.1);}
    100% {transform:scale(1);}
  }
  .yiyuan {
    position: absolute;
    right: 0.25rem;
    top: 40.8%;
    width: 2.375rem;
    height: 2.375rem;
  }
  .yiyuan img {
    width: 100%;
    height: 100%;
  }
  .tabs-box {
    background: #FFFAF2;
    /* width: 21.6875rem; */
    margin: 1.25rem 0.875rem 0;
    border-radius: 0.625rem;
    overflow: hidden;
  }
  .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3.75rem;
    background: #FF8000;
    line-height: 3.75rem;
    position: relative;
  }
  .tab-item {
    width: 50%;
    text-align: center;
    color: #FFFFFF;
    font-size: 1.25rem;
    font-weight: bold;
  }
  .tab-item1 {
    width: 50%;
    text-align: center;
    font-size: 1rem;
    color: #FFFFFF;
    font-weight: bold;
  }
  .line-fg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(50%,-50%);
    width: 1px;
    height: 1.5625rem;
    background: #FFFFFF;
  }
  .sanjiao {
    width: 1.375rem;
    height: 0.75rem;
    /* border: 0.75rem solid; */
    /* border-color: transparent transparent #ffffff; */
    background: url(../assets/bargain/sjjt.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 25%;
    bottom: -1px;
    transform: translate(-50%,0%);
    transition: left 0.3s;
  }
  .sanjiao1 {
    width: 1.375rem;
    height: 0.75rem;
    /* border: 0.75rem solid;
    border-color: transparent transparent #ffffff; */
    background: url(../assets/bargain/sjjt.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 75%;
    bottom: -1px;
    transform: translate(-50%,0%);
    transition: left 0.3s;
  }
  .record {
    padding: 1rem 1.5rem 0.75rem;
    box-sizing: border-box;
    height: 22.5rem;
    position: relative;
  }
  .zanwu {
    font-size: 0.875rem;
    color: #222222;
    font-weight: bold;
    text-align: center;
    margin-top: 3.125rem;
  }
  .record-user {
    height: 3.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .avatar-record {
    display: flex;
    align-items: center;
  }
  .record-name {
    font-weight: bold;
    font-size: 0.875rem;
    color: #222222;
  }
  .zlcg {
    font-size: 0.75rem;
    color: #666666;
  }
  .record-time {
    font-size: 0.75rem;
    color: #FF3D13;
  }
  .record-time img {
    width: 1.125rem;
    height: 1.125rem;
    vertical-align: middle;
  }
  .total-num {
    width: 100%;
    font-size: 0.6875rem;
    color: #999999;
    text-align: center;
    position: absolute;
    transform: translate(-1.5rem,0);
    bottom: 0.75rem;
  }
  .my-reward {
    height: 22.5rem;
    padding: 0.6875rem 1rem 0.75rem;
    box-sizing: border-box;
    position: relative;
  }
  .reward-box {
    background: #FFEBD6;
    border-radius: 0.375rem;
    margin-top: 0.75rem;
    height: 5.625rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.75rem;
    position: relative;
  }
  .sjdp {
    position: absolute;
    top: 0;
    left: 0;
    width: 5.0625rem;
    height: 0.9375rem;
  }
  .nom {
    color: #FE5E29;
    font-size: 0.625rem;
    font-weight: bold;
    text-align: center;
  }
  .coupon {
    font-size: 2.125rem;
    color: #FE5E29;
    font-weight: bold;
    margin-right: 0.75rem;
  }
  .coupon span {
    font-size: 0.875rem;
  }
  .coupon-info {
    /* width: 9.625rem; */
    /* font-size: 0.625rem; */
    margin-right: 0.5rem;
  }
  .coupon-btn {
    width: 3.75rem;
    height: 1.5rem;
  }
  .coupon-btn img {
    width: 100%;
    height: 100%;
  }
  .cou-tit {
    font-size: 0.6875rem;
    color: #FE5E29;
    font-weight: bold;
  }
  .cou-cont {
    font-size: 0.5625rem;
    color: #999999;
    margin-top: 0.3125rem;
  }
  .cou-time {
    font-size: 0.5625rem;
    color: #999999;
  }
  .youhui {
    width: 100%;
    font-size: 0.6875rem;
    color: #999999;
    text-align: center;
    position: absolute;
    transform: translate(-0.9375rem,0);
    bottom: 0.75rem;
  }

  .title-img {
    /* width: 21.6875rem; */
    /* height: 2.8125rem; */
    margin: 0.8125rem 0.875rem 0.625rem;
  }
  .title-img img {
    width: 100%;
    height: 100%;
  }
  .comment {
    /* width: 21.6875rem; */
    height: 14.375rem;
    border-radius: 0.625rem;
    background: #FFFAF2;
    margin: 0 0.875rem;
    padding: 1.25rem 1.5rem 0.5rem;
    box-sizing: border-box;
  }
  .info-user {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 0.75rem;
  }
  .avatar-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 50%;
    /* background: #e4e4e4; */
    margin-right: 0.5rem;
    overflow: hidden;
  }
  .avatar img {
    width: 100%;
    height: 100%;
  }
  .info-name {
    font-weight: bold;
    font-size: 0.875rem;
    color: #222222;
  }
  .van-rate__item:not(:last-child) {
    padding-right: 0;
  }
  .info-time {
    font-size: 0.625rem;
    color: #999999;
    padding-bottom: 0.3125rem;
  }
  .info-content {
    font-size: 0.75rem;
    font-weight: 400;
    color: #222222;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .pl-box {
    display: flex;
    align-items: center;
  }
  .pl-img {
    width: 5.75rem;
    height:5.75rem;
    margin: 0.625rem 0.6875rem 0.625rem 0;
    background: #E8E8E8;
    border-radius: 0.375rem;
    overflow: hidden;
  }
  .pl-img img {
    width: 100%;
    height: 100%;
  }
  .pl-img:last-child {
    margin-right: 0;
  }

  .detail-box1{
    /* width: 21.6875rem; */
    margin: 0 0.875rem;
    box-shadow:0px 10px 20px 0px rgba(255,233,196,1);
    border-radius:0.625rem;
    overflow: hidden;
  }
  .detail-box1 img {
    width: 100%;
    display: block;
  }
  .surprise-bg {
    width: 100%;
    height: 22.0625rem;
    background: url(../assets/bargain/tc_012x.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
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
  .surprise-info {
    font-weight: 600;
    font-size: 0.9375rem;
    color: #101112;
    text-align: center;
    margin: 0.75rem auto 2rem;
  }
  .surprise-info span {
    font-size: 1.875rem;
    color: #FF3D13;
    font-weight: bold;
  }

  .progress-bar-surprise {
    position: relative;
    width: 13.5625rem;
    height: 0.8125rem;
    background: #ffffff;
    border-radius: 0.5rem;
    margin: 0 auto 0.9375rem;
  }
  .cur1-surprise {
    background:linear-gradient(270deg,rgba(255,109,1,1) 0%,rgba(255,209,0,1) 100%);
    position: absolute;
    left: 0;
    top: 0;
    height: 0.8125rem;
    width: 100%;
    border-radius: 0.5rem;
    transition: width 1s;
  }
  .tish-surprise {
    position: absolute;
    right: -2.3125rem;
    top: -1.55rem;
    font-size: 0.75rem;
    color: #ffffff;
    line-height: 1rem;
    background: #FF3D13;
    padding: 0.125rem 0.875rem;
    border-radius: 0.6875rem;
  }
  .tish-surprise1 {
    position: absolute;
    right: -1.75rem;
    top: -1.5rem;
    font-size: 0.75rem;
    color: #ffffff;
    line-height: 1rem;
    background: #FF3D13;
    padding: 0.125rem 0.875rem;
    border-radius: 0.6875rem;
  }
  .zs-sj {
    width: 1.125rem;
    height: 0.3125rem;
    position: absolute;
    top: -0.3125rem;
    right: 0;
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
  .toux-box {
    margin: 0 1.875rem 0.8125rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .toux {
    width: 2.625rem;
    height: 2.625rem;
    background: #E8E8E8;
    border-radius: 50%;
  }
  .toux img {
    width: 100%;
    height: 100%;
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
    color: #999999;
    margin-top: 0.3125rem;
  }
  .money {
    font-size: 1.75rem;
    color: #FE5E29;
    font-weight: bold;
    margin-right: 1.5rem;
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
</style>