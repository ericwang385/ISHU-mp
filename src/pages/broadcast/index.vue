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
          <div v-for="(item2,index2) in NewsList" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left">{{item2.Title}}</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 1">
          <div v-for="(item2,index2) in NewsList" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left">{{item2.Title}}</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 2">
          <div v-for="(item2,index2) in NewsList" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left">{{item2.Title}}</div>
                <div class="weui-cell__ft weui-cell__ft_in-access"></div>
            </navigator>
          </div>   
        </div>
        <div class="weui-tab__content" :hidden="activeIndex != 3">
          <div v-for="(item2,index2) in NewsList" :key="index2" class="weui-cells weui-cells_after-title">
            <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <div class="weui-cell__bd" style="text-align:left">{{item2.Title}}</div>
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
import Fly from "flyio/dist/npm/wx";
export default {
  data() {
    return {
      tabs: ["通知公告", "学工办通告", "教务通知","实习就业"],
      activeIndex: 0,
      fontSize: 20,
      NewsList: []
    }
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
      if (this.activeIndex == 3) {
        return 'weui-navbar__slider_3'
      }
    }
  },
  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      if (this.activeIndex == 0) {
        let fly = new Fly; //创建fly实例
        fly.get('http://sz.shuhelper.cn/TongZGG/TongZGG/GetShuNews?pageSize=10&pageNumber=2', {
        }).then(res => {
          wx.hideLoading()
          this.NewsList = res.data.data.tongzgg;
        })
      } else if (this.activeIndex == 1){
        let fly = new Fly; //创建fly实例
        fly.get('http://sz.shuhelper.cn/mobile/campusmessage/getxgbmessagelist', {
          limit: 10,
          currentPage: 1
        }).then(res => {
          wx.hideLoading()
          this.NewsList = res.data.messagelist;
        })
      } else if (this.activeIndex == 2){
        let fly = new Fly; //创建fly实例
        fly.get('http://sz.shuhelper.cn/mobile/campusmessage/getJwcmessagelist?limit=10&currentPage=1', {
        }).then(res => {
          wx.hideLoading()
          this.NewsList = res.data.messagelist;
        })
      } else if (this.activeIndex == 3){
        let fly = new Fly; //创建fly实例
        fly.get('http://sz.shuhelper.cn/api/TongZGG/TongZGG/GetJiuYXW?infoTitle=&infoType=通知公告&pageSize=20&pageNumber=1', {
        }).then(res => {
          wx.hideLoading()
          this.NewsList = res.data.data.xinw;
        })
      }
    },
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
