<template>
  <div class="home-page">
    <div>
      <div class="cou_banner">
        <img src="@/assets/new/banner.png" alt="">
        <div class="lingqu" @click="getCoupon()" v-if="!yilingqu">
          一键领取
        </div>
        <div class="lingqu2" v-else>
          已领取
        </div>
      </div>

      <van-tabs class="van_tabs_box" v-model="active" line-width='20' swipe-threshold="5" @click="vanTabs">
        <van-tab title="新人专享">
          <div class="goods_box">
            <div class="good_item" v-for="(item, index) in newNewlist" :key="index">
              <div class="good_img" @click="getItem1(item.item_id)">
                <img :src="item.img_url" alt="">
              </div>
              <div class="good_name_box">
                <div @click="getItem1(item.item_id)">
                  <div class="title">{{item.title}}</div>
                  <div class="biaoqian">
                    <span v-if="item.coupon_name">{{item.coupon_name}}</span>
                    
                    <span v-for="(item1,index1) in item.natures" :key="index1">{{item1.name}}</span>
                  </div>
                </div>
                <div class="good_info">
                  <div class="good_info_box">
                    <span style="font-size:0.24rem;color:#FF2B2B;vertical-align: middle;display: inline-block;width: 0.2rem;">￥</span><span class="price">{{item.price}}</span><span style="vertical-align: middle;">已售{{item.deal_num}}件</span>
                  </div>
                  <div class="gwc">
                    <img src="@/assets/new/gwc.png" alt="">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div v-if="newNewlist.length==0" class="van-list__loading"><div class="van-loading van-loading--circular"><span class="van-loading__spinner van-loading__spinner--circular" style="width: 16px; height: 16px;"><svg viewBox="25 25 50 50" class="van-loading__circular"><circle cx="50" cy="50" r="20" fill="none"></circle></svg></span><span class="van-loading__text">加载中...</span></div></div>
          <div v-else class="van-list__finished-text">没有更多了</div>
        </van-tab>
        <van-tab title="居家日用">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
            <div class="goods_box">
              <div class="good_item van-clearfix" v-for="(item, index) in newList" :key="index">
                <div class="good_img" @click="getItem1(item.item_id)">
                  <img :src="item.img_url" alt="">
                </div>
                <div class="good_name_box">
                  <div @click="getItem1(item.item_id)">
                    <div class="title">{{item.title}}</div>
                    <div class="biaoqian">
                      <span v-if="item.coupon_name">{{item.coupon_name}}</span>
                      
                      <span v-for="(item1,index1) in item.natures" :key="index1">{{item1.name}}</span>
                    </div>
                  </div>
                  <div class="good_info">
                    <div class="good_info_box">
                      <span style="font-size:0.24rem;color:#FF2B2B;vertical-align: middle;display: inline-block;width: 0.2rem;">￥</span><span class="price">{{item.price}}</span><span style="vertical-align: middle;">已售{{item.deal_num}}件</span>
                    </div>
                    <div class="gwc">
                      <img src="@/assets/new/gwc.png" alt="">
                    </div>
                  </div>
                </div>
                
              </div>
              
            </div>
          </van-list>
        </van-tab>
        <van-tab title="美食酒水">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
          <div class="goods_box">
            <div class="good_item" v-for="(item, index) in newList" :key="index">
              <div class="good_img" @click="getItem1(item.item_id)">
                <img :src="item.img_url" alt="">
              </div>
              <div class="good_name_box">
                <div @click="getItem1(item.item_id)">
                  <div class="title">{{item.title}}</div>
                  <div class="biaoqian">
                    <span v-if="item.coupon_name">{{item.coupon_name}}</span>
                    
                    <span v-for="(item1,index1) in item.natures" :key="index1">{{item1.name}}</span>
                  </div>
                </div>
                <div class="good_info">
                  <div class="good_info_box">
                    <span style="font-size:0.24rem;color:#FF2B2B;vertical-align: middle;display: inline-block;width: 0.2rem;">￥</span><span class="price">{{item.price}}</span><span style="vertical-align: middle;">已售{{item.deal_num}}件</span>
                  </div>
                  <div class="gwc">
                    <img src="@/assets/new/gwc.png" alt="">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          </van-list>
        </van-tab>
        <van-tab title="个护清洁">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
          <div class="goods_box">
            <div class="good_item" v-for="(item, index) in newList" :key="index">
              <div class="good_img" @click="getItem1(item.item_id)">
                <img :src="item.img_url" alt="">
              </div>
              <div class="good_name_box">
                <div @click="getItem1(item.item_id)">
                  <div class="title">{{item.title}}</div>
                  <div class="biaoqian">
                    <span v-if="item.coupon_name">{{item.coupon_name}}</span>
                    
                    <span v-for="(item1,index1) in item.natures" :key="index1">{{item1.name}}</span>
                  </div>
                </div>
                <div class="good_info">
                  <div class="good_info_box">
                    <span style="font-size:0.24rem;color:#FF2B2B;vertical-align: middle;display: inline-block;width: 0.2rem;">￥</span><span class="price">{{item.price}}</span><span style="vertical-align: middle;">已售{{item.deal_num}}件</span>
                  </div>
                  <div class="gwc">
                    <img src="@/assets/new/gwc.png" alt="">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          </van-list>
        </van-tab>
        <van-tab title="国际名牌">
          <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
          <div class="goods_box">
            <div class="good_item" v-for="(item, index) in newList" :key="index">
              <div class="good_img" @click="getItem1(item.item_id)">
                <img :src="item.img_url" alt="">
              </div>
              <div class="good_name_box">
                <div @click="getItem1(item.item_id)">
                  <div class="title">{{item.title}}</div>
                  <div class="biaoqian">
                    <span v-if="item.coupon_name">{{item.coupon_name}}</span>
                    
                    <span v-for="(item1,index1) in item.natures" :key="index1">{{item1.name}}</span>
                  </div>
                </div>
                <div class="good_info">
                  <div class="good_info_box">
                    <span style="font-size:0.24rem;color:#FF2B2B;vertical-align: middle;display: inline-block;width: 0.2rem;">￥</span><span class="price">{{item.price}}</span><span style="vertical-align: middle;">已售{{item.deal_num}}件</span>
                  </div>
                  <div class="gwc">
                    <img src="@/assets/new/gwc.png" alt="">
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          </van-list>
        </van-tab>
      </van-tabs>
      <!-- <div class="coupon_box">
        <img v-lazy="require('@/assets/coupon/tu3.png')" alt="" @click="getCoupon(445)" v-if="!lq1">
        <img v-lazy="require('@/assets/coupon/tu03.png')" alt="" v-else>
        <img v-lazy="require('@/assets/coupon/tu4.png')" alt="" @click="getCoupon(446)" v-if="!lq2">
        <img v-lazy="require('@/assets/coupon/tu04.png')" alt="" v-else>
        <img v-lazy="require('@/assets/coupon/tu5.png')" alt="" @click="getCoupon(444)" v-if="!lq3">
        <img v-lazy="require('@/assets/coupon/tu05.png')" alt="" v-else>
      </div>
    
      <div class="cou_banner">
        <img src='@/assets/coupon/tu6.png' alt="">
      </div>
      <div class="coupon_info">
        <img src='@/assets/coupon/tu7.png' alt="" @click="getItem1(122144)">
        <img src='@/assets/coupon/tu8.png' alt="" @click="getItem1(117224)">
        <img v-lazy="require('@/assets/coupon/tu9.png')" alt="" @click="getItem1(117225)">
        <img v-lazy="require('@/assets/coupon/tu10.png')" alt="" @click="getItem1(120457)">
        <img v-lazy="require('@/assets/coupon/tu11.png')" alt="" @click="getItem1(122177)">
        <img v-lazy="require('@/assets/coupon/tu12.png')" alt="" @click="getItem1(120268)">
        <img v-lazy="require('@/assets/coupon/tu13.png')" alt="" @click="getItem1(122175)">
        <img v-lazy="require('@/assets/coupon/tu14.png')" alt="" @click="getItem1(117235)">
        <img v-lazy="require('@/assets/coupon/tu15.png')" alt="" @click="getItem1(122171)">
        <img v-lazy="require('@/assets/coupon/tu16.png')" alt="" @click="getItem1(122165)">
        <img v-lazy="require('@/assets/coupon/tu17.png')" alt="" @click="getItem1(120430)">
        <img v-lazy="require('@/assets/coupon/tu18.png')" alt="" @click="getItem1(122161)">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu19.png')" alt="">
      </div>
      <div class="coupon_info">
        <img v-lazy="require('@/assets/coupon/tu20.png')" alt="" @click="getItem1(120259)">
        <img v-lazy="require('@/assets/coupon/tu21.png')" alt="" @click="getItem1(120271)">
        <img v-lazy="require('@/assets/coupon/tu22.png')" alt="" @click="getItem1(120286)">
        <img v-lazy="require('@/assets/coupon/tu23.png')" alt="" @click="getItem1(120287)">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu24.png')" alt="">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu25.png')" alt="" @click="getItem1(120285)">
        <img v-lazy="require('@/assets/coupon/tu26.png')" alt="" @click="getItem1(120283)">
        <img v-lazy="require('@/assets/coupon/tu27.png')" alt="" @click="getItem1(120557)">
        <img v-lazy="require('@/assets/coupon/tu28.png')" alt="" @click="getItem1(100028)">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu29.png')" alt="">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu30.png')" alt="" @click="getItem1(117223)">
        <img v-lazy="require('@/assets/coupon/tu31.png')" alt="" @click="getItem1(117222)">
        <img v-lazy="require('@/assets/coupon/tu32.png')" alt="" @click="getItem1(120390)">
        <img v-lazy="require('@/assets/coupon/tu33.png')" alt="" @click="getItem1(120279)">
        <img v-lazy="require('@/assets/coupon/tu34.png')" alt="" @click="getItem1(117256)">
        <img v-lazy="require('@/assets/coupon/tu35.png')" alt="" @click="getItem1(117258)">
        <img v-lazy="require('@/assets/coupon/tu36.png')" alt="" @click="getItem1(117259)">
        <img v-lazy="require('@/assets/coupon/tu37.png')" alt="" @click="getItem1(117262)">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu38.png')" alt="">
      </div>
      <div class="cou_banner">
        <img v-lazy="require('@/assets/coupon/tu39.png')" alt="" @click="getItem1(120546)">
        <img v-lazy="require('@/assets/coupon/tu40.png')" alt="" @click="getItem1(118512)">
        <img v-lazy="require('@/assets/coupon/tu41.png')" alt="" @click="getItem1(118513)">
        <img v-lazy="require('@/assets/coupon/tu42.png')" alt="" @click="getItem1(118515)">
        <img v-lazy="require('@/assets/coupon/tu43.png')" alt="" @click="getItem1(118507)">
        <img v-lazy="require('@/assets/coupon/tu44.png')" alt="" @click="getItem1(120539)">
      </div> -->
    </div>
    <div class="pop-fade" v-show="!popFade&&!yilingqu">
      <!-- <div class="surprise-bg">
        惊喜福利弹窗
        
      </div> -->
      <div class="tk_bg">
        <img src="@/assets/new/tk_bg.png" alt="">
        <div class="lingqu1" @click="getCoupon()">
          立即领取
        </div>
      </div>
      <div class="tk_cloose" @click="tkCloose"> 
        <img src="@/assets/new/close.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { getToken,getUserInfo, setKeyData, getKeyData, getKey, setAgain, getAgain, getfrist1, getfrist2, getfrist3, setfrist1, setfrist2, setfrist3, setLq1, setLq2, setLq3, getLq1, getLq2, getLq3 } from "../store/user";
import bridge from "../utils/bridge";
// import enter from "../utils/checkFirstTime";
import api from "../api/index";
import moment from 'moment/moment'
import { ImagePreview } from 'vant';
import axis from 'axios';

export default {
  name: "Home",
  data() {
    return {
      yilingqu:true,
      start_page:0,
      mcid: '',
      loading: false,
      finished: false,
      newNewlist:[],
      newList:[],
      active: 0,
      lq1: false,
      lq2: false,
      lq3: false,
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
    // 加载更多
    onLoad() {
      console.log(this.start_page)
      this.goodList(this.mcid,this.start_page)
    },
    vanTabs(e) {
      console.log(e)
      this.start_page=0;
      this.newList = [];
      this.loading=false;
      this.finished=false;
      if(e==1) {
        // 居家日用
        this.mcid = 656
      }else if(e==2) {
        //美食酒水
        this.mcid = 663
      }else if(e==3) {
        //个护清洁
        this.mcid = 648
      }else if(e==4) {
        this.mcid = 688
      }
      this.goodList(this.mcid,this.start_page)
      
    },
    tkCloose() {
      this.popFade = true
    },
    //获取新人专享商品列表
    newGoodList(){
      const self = this;
      api.newGoodList().then(data => {
        self.newNewlist = data.list
        // console.log(data)
 
      });
    },
    //获取后面四个tab商品；
    goodList(mcid, start_page) {
      const self = this;
      api.goodList(mcid, start_page).then(data => {
        let datas = data.list
        self.newList = self.newList.concat(datas)
        if(self.newList.length<data.total_pages) {
          self.start_page++
          self.loading = false
          self.onLoad()
        }else {
          self.finished = true
          self.loading = true
        }
 
      });
    },
    // 领取优惠券
    getCoupon() {
      const self = this;
      // let token = getToken();
      // self.$toast.success(uid);
      // if(!token) {
      //   token = 'fWThrGO7Em6AF_eDTbQH0fu8ms2JhNxi'
      // }
      // alert(1,uid)
      // 没有token会报错，在app客户端可以获取到
      let cou_id = [447,448,449,450]
      // for(let i = 0;i<cou_id.length; i++) {
        api.getCoupon(cou_id[0]).then(data => {
          api.getCoupon(cou_id[1]).then(data => {
            api.getCoupon(cou_id[2]).then(data => {
            // alert(123,data)
                  self.$toast.success("领取成功");
                  self.yilingqu=true
                  api.getCoupon(cou_id[3]).then(data => {
            // alert(123,data)
              self.$toast.success("领取成功");
              self.yilingqu=true
            }).catch(error => {
              // alert(1234,error)
              self.$toast.fail("你已经领取过了，请不要重复领取！");
              console.log(12,error)
              // this.$toast.fail("领取失败");
            })
            }).catch(error => {
              // alert(1234,error)
              self.$toast.fail("你已经领取过了，请不要重复领取！");
              console.log(12,error)
              // this.$toast.fail("领取失败");
            })
          }).catch(error => {
            // alert(1234,error)
            self.$toast.fail("你已经领取过了，请不要重复领取！");
            console.log(12,error)
            // this.$toast.fail("领取失败");
          })
        }).catch(error => {
          // alert(1234,error)
          self.$toast.fail("你已经领取过了，请不要重复领取！");
          console.log(12,error)
          // this.$toast.fail("领取失败");
        })
      // }
      
    },
    getItem1(item_id) {
      const self = this;
      api.getItem(item_id).then(data => {
      // api.getItem(114584).then(data => {
        self.item = data;
  
      if (bridge.hasBridge()) {
        bridge.startGoodsDetails(data.shop_id, data.item_id);
      } else {
        // this.$router.push("/weixin");
        location.href = 'http://d.mengdigua.com/'
      }
        // self.getEventTimes();
      });
    },
    
  
    // 助力记录
    // actionList() {
    //   let self = this;
    //   api.actionList().then(data => {
    //     self.helpRecordData = data;
    //   }).catch(() => {
    //     // console.log(data)
    //   }); 
    // },
    // 优惠券详情
    couponList() {
      let self = this
      api.couponList().then(data => {
        console.log(data)
        for(let i=0;i<data.length;i++) {
           if(data[0].is_accept==1||data[1].is_accept==1||data[2].is_accept==1||data[3].is_accept==1) {
              self.yilingqu=true
            }else {
              self.yilingqu=false
            }



          // if(data[i].id==447) {
          //   if(data[i].is_accept==0) {
          //     // self.lq1 = false
          //   }else {
          //     self.yilingqu=true
          //   }
          // }
          // if(data[i].id==448) {
          //   if(data[i].is_accept==0) {
           
          //   }else {
          //     self.yilingqu=true
          //   }
          // }
          // if(data[i].id==449) {
          //   if(data[i].is_accept==0) {
             
          //   }else {
          //     self.yilingqu=true
          //   }
          // }
          // if(data[i].id==450) {
          //   if(data[i].is_accept==0) {
              
          //   }else {
          //     self.yilingqu=true
          //   }
          // }
        }
        // if(data[0].is_accept==0) {
        //   self.lq1 = false
        // }else {
        //   self.lq1 = true
        // }
        // if(data[1].is_accept==0) {
        //   self.lq2 = false
        // }else {
        //   self.lq2 = true 
        // }
        // if(data[2].is_accept==0) {
        //   self.lq3 = false
        // }else {
        //   self.lq3 = true
        // }
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
    // closePopFade() {
    //   this.popFade = false;
    // },
    // 微信分享
    // wxOnShare() {
    //   api.onShare().then(data => {
    //     console.log(data)
    //   }).catch(() => {
    //     // console.log(data)
    //   });
    // },
    
    // getItem() {
    //   const self = this;
    //   api.getItem(118316).then(data => {
    //   // api.getItem(114584).then(data => {
    //     self.item = data;
    //     // self.getEventTimes();
    //   });
    // },

    // getCoupans: function() {
    //   const self = this;
    //   api.getCoupons(118316, "item", 9).then(data => {
    //     self.coupans = data.list;
    //   });
    // },
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

    const self = this;
    self.couponList()
    self.newGoodList()
    console.log(111,this.yilingqu)
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
        
      }else {
        self.toLogin();
      }

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
        // self.$router.push("/tips");
      // }
    }
  },
//   beforeDestroy() {
//     let self = this
//     if(self.timerDs) {
// 　　　　clearInterval(self.timerDs); //关闭
// 　　 }  //利用vue的生命周期函数
//   }
  
};
</script>
<style>

  .cou_banner {
    position: relative;
  }
  .cou_banner img {
    width: 100%;
    display: block;
  }
  .lingqu {
    width: 3.3rem;
    height: 0.82rem;
    text-align: center;
    line-height: 0.82rem;
    border-radius: 0.41rem;
    position: absolute;
    bottom: 0.36rem;
    left: 2.11rem;
    background: #6554c0;
    font-size: 0.29rem;
    color: #fff;
    font-weight: 600;
    z-index: 1;
  }
  .lingqu2 {
    width: 3.3rem;
    height: 0.82rem;
    text-align: center;
    line-height: 0.82rem;
    border-radius: 0.41rem;
    position: absolute;
    bottom: 0.36rem;
    left: 2.11rem;
    background: #C8C9CD;
    font-size: 0.29rem;
    color: #fff;
    font-weight: 600;
    z-index: 1;
  }
   .lingqu1 {
    width: 3.3rem;
    height: 0.82rem;
    text-align: center;
    line-height: 0.82rem;
    border-radius: 0.41rem;
    position: absolute;
    bottom: 0.36rem;
    left: 1.28rem;
    background: #6554c0;
    font-size: 0.29rem;
    color: #fff;
    font-weight: 600;
    z-index: 1;
  }
  .van_tabs_box {
    
  }
  .goods_box {
    width: 100%;
    padding: 0 0.2rem 0rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .good_item {
    width: 3.46rem;
    background: #fff;
    box-shadow: 0px 0px 0.16rem 0.04rem rgba(17,17,17,0.05);
    border-radius: 0.16rem;
    margin-top: 0.16rem;
  }
  .good_name_box {
    height: 1.86rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.13rem 0.16rem 0.21rem;
    font-size: 0.29rem;
    color: #111111;
  }
  .good_name_box .title {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    letter-spacing: -1px;
    line-height: 0.42rem;
  }
  .biaoqian {
    /* margin-top: 0.08rem; */
    overflow: hidden;
    white-space: nowrap;
  }
  .biaoqian span{
    font-size: 0.18rem;
    color: #FF2B2B;
    display: inline-block;
    height: 0.3rem;
    line-height: 0.32rem;
    padding: 0rem 0.06rem 0rem 0.08rem;
    background: #FFF4F4;
    border-radius: 0.06rem;
    border: 1px solid #ffa0a2;
    margin-right: 0.08rem;
  }
  .good_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .good_info_box {
    font-size: 0.22rem;
    color: #747576;
  }
  .price {
    font-size: 0.32rem;
    color: #FF2B2B;
    font-weight: normal;
    vertical-align: middle;
    margin-right: 0.15rem;
  }
  .gwc {
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
  }
  .gwc img {
    width: 100%;
    height: 100%;
  }
  .good_img {
    width: 3.46rem;
    height: 3.46rem;
    border-top-left-radius : 0.16rem;
    border-top-right-radius : 0.16rem;
    overflow: hidden;
  }
  .good_img img{
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
  }

  .van-tabs__wrap {
    background: #fff;
    margin: 0.16rem 0;
    height: 0.98rem !important;
  }
  .van-tab {
    font-size: 0.28rem !important;
  }
  .van-tabs__content {
    background: #F4F5F6;
  }
  .van-hairline--top-bottom::after {
    border-bottom: 2px solid #CBCDD0;
  }
  .van-tabs__line {
    width: 0.36rem !important;
    height: 0.06rem;
    border-radius: 0.06rem;
    bottom: 24px;
    background-color: #FFD300;
  }
  .tk_bg {
    width: 5.9rem;
    position: relative;
    margin: 1rem auto 0;
  }
  .tk_bg img {
    width: 100%;
  }
  .tk_cloose {
    width: 0.48rem;
    height: 0.48rem;
    margin: 0.57rem auto 0;
  }
  .tk_cloose img {
    width: 100%;
  }
  /* .coupon_box {
    display: flex;
    width: 100%;
  }
  .coupon_box img {
    width: 2.5rem;
    height: 2.42rem;
  }
  .coupon_info {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .coupon_info img {
    width: 50%;
    height: 4.58rem;
  } */
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