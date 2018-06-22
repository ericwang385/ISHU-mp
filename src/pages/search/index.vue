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
            <img src="http://api.shu.edu.cn/CampusFileList/2016-2017%E7%A7%8B.jpg" class="responsive" />
            <img src="http://api.shu.edu.cn/CampusFileList/2016-2017%E5%86%AC.jpg" class="responsive" />
            <img src="http://api.shu.edu.cn/CampusFileList/2016-2017%E6%98%A5.jpg" class="responsive" />
            <img src="http://api.shu.edu.cn/CampusFileList/2016-2017%E5%A4%8F.jpg" class="responsive" />
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
            <img src="http://api.shu.edu.cn/CampusFileList/%E6%A0%A1%E8%BD%A6%E6%97%B6%E5%88%BB%E8%A1%A8.jpg" class="responsive" />
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">
            <img src="http://sz.shuhelper.cn/img/SchoolMap.653af2e.png" class="responsive" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  data() {
  return {
  tabs: ["校历查询", "校车查询", "校园地图"],
  activeIndex: 0,
  fontSize: 30
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
  }
  },
  methods: {
  tabClick(e) {
  console.log(e);
  this.activeIndex = e.currentTarget.id;
  }
  }
  }
</script>

<style scoped="">
  page,
  .page,
  .page__bd {
  height: 100%;
  }
  .page__bd {
  padding-bottom: 0;
  }
  .weui-tab__content {
  padding-top: 60px;
  text-align: center;
  }
  .weui-navbar__slider_0 {
  left: 29rpx;
  transform: translateX(0);
  }
  .weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
  }
  .weui-navbar__slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
  }
</style>

