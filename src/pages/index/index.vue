<template>
  <div class="page">
    <div class="swiper" style="height:100%">
      <swiper indicator-dots='true' autoplay="true" interval="4500" style="height:30vh;margin-bottom:5vh;">
        <swiper-item v-for="img in imgs" :key="img">
          <image :src="img" />
        </swiper-item>
      </swiper>
    </div>
    <div class="page__bd">
      <div class="weui-grids grid">
        <block v-for="(item,index) in grids" :key="index">
          <navigator :url='item.url' class="weui-grid" hover-class="weui-grid_active">
            <image class="weui-grid__icon" :src="item.src"/>
            <div class="weui-grid__label">{{item.name}}</div>
          </navigator>
        </block>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data() {
    return {
      imgs: [
        '/static/images/2018.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/2.jpg',
        'https://static.shuhelper.cn/shuces/mpapp/imgs/3.jpg'
      ],
      grids: [
        {
          src: '/static/images/school-info.png',
          name: '通知通告',
          url: '/pages/broadcast/broadcast'
        },
        {
          src: '/static/images/school-activity.png',
          name: '校园活动',
          url: '/pages/affairs/affairs'
        },
        {
          src: '/static/images/school-query.png',
          name: '校园查询',
          url: '/pages/search/search'
        },
        {
          src: '/static/images/school-service.png',
          name: '场地预约',
          url: '/pages/room_booking/room_booking'
        },
        {
          src: '/static/images/community-signup.png',
          name: '社团风采',
          url: '/pages/club/club'
        },
        {
          src: '/static/images/banshi-query.png',
          name: '事务办理',
          url: '/pages/affairs/affairs'
        },
      ]
    };
  },

  components: {},

  methods: {
    kindToggle(e) {
      var id = e.currentTarget.id,
        list = this.list;
      for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].id == id) {
          list[i].open = !list[i].open;
        } else {
          list[i].open = false;
        }
      }
      this.list = list;
    }
  },

  created() { }
};
</script>

<style scoped>
/*!
 * WeUI v1.1.1 (https://github.com/weui/weui-wxss)
 * Copyright 2017 Tencent, Inc.
 * Licensed under the MIT license
 */

.weui-flex {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.weui-cells {
  margin-top: 0;
  opacity: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.weui-cells:after,
.weui-cells:before {
  display: none;
}

.weui-cells_show {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.weui-cell:before {
  right: 15px;
}

.kind-list__item {
  margin: 10px 0;
  background-color: #fff;
  border-radius: 2px;
  overflow: hidden;
}

.kind-list__item:first-child {
  margin-top: 0;
}

.kind-list__img {
  width: 30px;
  height: 30px;
}

.kind-list__item-hd {
  padding: 20px;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.kind-list__item-hd_show {
  opacity: 0.4;
}

.kind-list__item-bd {
  height: 0;
  overflow: hidden;
}

.kind-list__item-bd_show {
  height: auto;
}
swiper {
  height: 30vh;
}
swiper image {
  width: 100%;
  height: 5rem;
}
.grid {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 5px;
}
</style>
