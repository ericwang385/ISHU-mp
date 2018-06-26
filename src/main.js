import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store';
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.$store = store;
import '../static/weui/weui.css'

const app = new Vue({
  App
})
app.$mount();
export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/index/index',
      'pages/broadcast/broadcast',
      'pages/club/club',
      'pages/search/search',
      'pages/affairs/affairs',
      'pages/room_booking/room_booking',
      'pages/room_booking_card/room_booking_card',
      'pages/articlepage/articlepage',
      '^pages/activity/activity'

    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'iSHU',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true
    }
    /* tabBar: {
      color: '#999999',
      selectedColor: '#1AAD16',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/tabbar/tabbar',
          text: '微信',
          iconPath: 'static/images/icon_nav_button.png',
          selectedIconPath: 'static/images/icon_nav_button.png'
        },
        {
          pagePath: 'pages/tabbar/tabbar',
          text: '通讯录',
          iconPath: 'static/images/icon_nav_cell.png',
          selectedIconPath: 'static/images/icon_nav_cell.png'
        },
        {
          pagePath: 'pages/tabbar/tabbar',
          text: '发现',
          iconPath: 'static/images/icon_nav_cell.png',
          selectedIconPath: 'static/images/icon_nav_cell.png'
        },
        {
          pagePath: 'pages/tabbar/tabbar',
          text: '我',
          iconPath: 'static/images/icon_nav_toast.png',
          selectedIconPath: 'static/images/icon_nav_toast.png'
        }
      ]
    } */
  }
}
