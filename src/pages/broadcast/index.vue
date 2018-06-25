<template>
  <div class="page">
    <div class="page__bd">
     <div class="weui-tab">
      <div class="weui-navbar">
        <block v-for="(item,index) in tabs" :key="index">
          <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
            <div class="weui-navbar__title">{{item}}</div>
          </div>
        </block>
        <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
      </div>
      <div class="weui-tab__panel">
        <div class="weui-tab__content" :hidden="activeIndex != 0">
          <div v-for="(item2,index2) in news.SHUNEWS" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left" @click="openConfirm(item2.title,item2.url)">{{item2.title}}</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">
          <div v-for="(item2,index2) in news.XGB" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
              <div class="weui-cell__bd" style="text-align:left" @click="onNewsClick('XGB',index2)">{{item2.title}}</div>
              <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">
          <div v-for="(item2,index2) in news.JWC" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left">{{item2.title}}</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>   
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 3">
          <div v-for="(item2,index2) in news.JYB" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left">{{item2.title}}</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Fly from 'flyio/dist/npm/wx';
export default {
  data () {
    return {
      tabs: ['通知公告', '学工办通告', '教务通知', '实习就业'],
      activeIndex: 0,
      fontSize: 20,
      NewsList: [],
      news: {
        XGB: [],
        SHU: [],
        JYB: [],
        JWC: [],
        SHUNEWS: []
      },
      page: 1,
      newsSingle: {
        title: '',
        detail: '',
        type: ''
      }
    }
  },
  computed: {
    navbarSliderClass () {
      if (this.activeIndex == 0) {
        this.loadMoreSHUNEWS(1)
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        this.loadMoreXGB(this.page)
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        this.loadMoreJWC(this.page)
        return 'weui-navbar__slider_2'
      }
      if (this.activeIndex == 3) {
        this.loadMoreJYB(this.page)
        return 'weui-navbar__slider_3'
      }
    }
  },
  onReachBottom () {
    this.page += 1
    if (this.activeIndex == 0) {
      this.loadMoreSHUNEWS(1)
    }
    if (this.activeIndex == 1) {
      this.loadMoreXGB(this.page)
    }
    if (this.activeIndex == 2) {
      this.loadMoreJWC(this.page)
    }
    if (this.activeIndex == 3) {
      this.loadMoreJYB(this.page)
    }
  },
  methods: {
    tabClick (e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
      wx.showLoading({
        title: '加载中',
        mask: true
      })
    },
<<<<<<< HEAD
    openConfirm(title,url) {
      wx.showModal({
        title: title,
        content : '是否进入网页',
        confirmText: "确定",
        cancelText: "返回",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateTo({
              url:"/pages/webpage/webpage?src="+url
            })
          } else {
            console.log('用户点击返回')
          }
        }
      });
    },
    onNewsClick(category, index) {
      this.newsSingle = this.news[category][index]
      this.newsSingle.type = category
      this.open = true
      //this.loading = true
      if (category === 'XGB') {
        let fly = new Fly;
          fly.get('http://sz.shuhelper.cn/mobile/campusmessage/GetXgbCampusMessageById', {
          })
=======
    onNewsClick (category, index) {
      this.newsSingle = this.news[category][index]
      this.newsSingle.type = category
      this.open = true
      this.loading = true
      if (category === 0) {
        this.open = false
        this.loading = false
        window.open(this.newsSingle.url)
      } else if (category === 1) {
        let fly = new Fly();
        fly.get('/mobile/campusmessage/GetXgbCampusMessageById', {
          MsgID: this.newsSingle.MsgID
        })
>>>>>>> 5fb0899b8e14bcc1dcbe58ffbebaf5d2d4b58b0d
          .then(response => {
            this.newsSingle.detail = response.data.Summary
            this.loading = false
            // this.$nextTick(() => {
            // })
          })
      } else if (category === 2) {
        this.$http
          .get('/mobile/campusmessage/GetJwcMessageById', {
            MsgID: this.newsSingle.MsgID
          })
          .then(response => {
            this.newsSingle.detail = response.data.Summary
            this.loading = false
          })
      } else if (category === 3) {
        this.loading = false
      }
      var that=this;
      wx.showModal({
        title: this.newsSingle.title,
        content : '是否进入网页',
        confirmText: "确定",
        cancelText: "返回",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击确定')
            console.log(that.newsSingle);
            console.log(JSON.stringify(that.newsSingle))
            wx.navigateTo({
              url:"/pages/articlepage/articlepage?title="+that.newsSingle.title+"&detail="+JSON.stringify(that.newsSingle.detail)
            })
          } else {
            console.log('用户点击返回')
          }
        }
      });
    },
    loadMoreXGB: function (index) {
      let fly = new Fly();
      fly.get('http://sz.shuhelper.cn/mobile/campusmessage/getxgbmessagelist', {
        limit: 10,
        currentPage: index
      })
        .then(response => {
          console.log(response)
          if (response.data.messagelist.length === 0) {
            this.$refs.infiniteScrollXGB.stop()
          }
          for (let item of response.data.messagelist) {
            let news = {
              title: item.Title,
              detail: item.InfoContent,
              MsgID: item.MsgID
            }
            this.news.XGB.push(news)
          }
        })
      wx.hideLoading();
    },
    loadMoreSHUNEWS: function (index) {
      let fly = new Fly();
      fly.get('http://sz.shuhelper.cn/TongZGG/TongZGG/GetShuNews', {
        pageSize: 10,
        pageNumber: index
      })
        .then(response => {
          if (response.data.data.total === 0) {
            this.$refs.infiniteScrollXGB.stop()
          }
          for (let item of response.data.data.tongzgg) {
            let news = {
              title: item.Title,
              url: item.Link
            }
            this.news.SHUNEWS.push(news)
            wx.hideLoading();
          }
        })
    },
    loadMoreJWC: function (index) {
      let fly = new Fly();
      fly.get('http://sz.shuhelper.cn/mobile/campusmessage/getJwcmessagelist', {
        limit: 10,
        currentPage: index
      })
        .then(response => {
          console.log(response)
          if (response.data.messagelist.length === 0) {
            this.$refs.infiniteScrollJWC.stop()
          }
          for (let item of response.data.messagelist) {
            let news = {
              title: item.Title,
              detail: item.InfoContent,
              MsgID: item.MsgID
            }
            this.news.JWC.push(news)
            wx.hideLoading();
          }
        })
    },
    loadMoreJYB: function (index) {
      let fly = new Fly();
      fly.get('http://sz.shuhelper.cn/api/TongZGG/TongZGG/GetJiuYXW', {
        infoTitle: '',
        infoType: '通知公告',
        pageSize: 20,
        pageNumber: index
      })
        .then(response => {
          console.log(response)
          if (response.data.data.xinw.length === 0) {
            this.$refs.infiniteScrollJYB.stop()
          }
          for (let item of response.data.data.xinw) {
            let news = {
              title: item.InfoTitle,
              detail: item.InfoContent
            }
            this.news.JYB.push(news)
            wx.hideLoading();
          }
        })
    }
  }
}
</script>

<style scoped>
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  padding-top: 10px;
  text-align: center;
}
.weui-navbar__slider_0 {
  left: 5rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 5rpx;
  transform: translateX(190rpx);
}
.weui-navbar__slider_2 {
  left: 5rpx;
  transform: translateX(380rpx);
}
.weui-navbar__slider_3 {
  left: 5rpx;
  transform: translateX(560rpx);
}

.content-list {
  background-color: #fff;
  z-index: 1;
  position: relative;
}
.list-item {
  height: 180rpx;
  width: 100%;
  box-sizing: border-box;
}
.list-item-content {
  padding: 20rpx 30rpx 20rpx 30rpx;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  box-sizing: border-box;
}
.article-title {
  font-size: 14px;
  color: #404040;
  text-align: justify;
  height: 86rpx;
  overflow-y: hidden;
}

</style>

<style>

</style>
