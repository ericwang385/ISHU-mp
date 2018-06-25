<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex === index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
            <!--选项一的内容-->
            <div class="weui-search-bar__box">
              <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
              <input type="text" class="weui-search-bar__input" placeholder="输入组织名称并搜索" v-model="search.name" />
            </div>
            <club-card v-for="(club,index) in clubs" :club="club" :key="index" @onFavoriteClick="onFavoriteClick(index)" @onRegisterClick="onRegisterClick(index)"></club-card>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
            <club-sign-up></club-sign-up>
          </div>
          <!--<div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>-->
        </div>
      </div>
    </div>
  </div>
  <!--<div class="page">-->
  <!--<div class="page__hd">-->
  <!--<div class="page__title">这里写社团活动</div>-->
  <!--</div>-->
  <!--<div class="page__bd_spacing"></div>-->
  <!--<div class="page__desc">-->
  <!--</div>-->
  <!--<div class="weui-search-bar__box">-->
  <!--<icon class="weui-icon-search_in-box" type="search" size="14"></icon>-->
  <!--<input type="text" class="weui-search-bar__input" placeholder="输入组织名称并搜索" v-model="search.name" />-->
  <!--</div>-->
  <!--<club-card v-for="(club,index) in clubs" :club="club" :key="index" @onFavoriteClick="onFavoriteClick(index)" @onRegisterClick="onRegisterClick(index)"></club-card>-->
  <!--</div>-->
</template>

<script>
  import ClubCard from '../../components/club_card.vue'
  import ClubSignUp from '../../components/club_signup'
  import Fly from 'flyio/dist/npm/wx'
  // import {
  //   Loading,
  //   Dialog,
  //   Events
  //   // optional!, for example below
  //   // with custom spinner
  //   // QSpinnerGears
  // } from 'quasar'
  export default {

    components: {
      ClubCard,
      ClubSignUp
    },
    computed: {
      navbarSliderClass () {
        if (this.activeIndex === 0) {
          return 'weui-navbar__slider_0'
        }
        if (this.activeIndex === 1) {
          return 'weui-navbar__slider_1'
        }
      }
    },
    data () {
      return {
        tabs: ['社团信息', '社团报名'],
        activeIndex: 0,
        fontSize: 30,
        selectedTab: '',
        phone: '',
        email: '',
        open: false,
        count: 10,
        page: 1,
        search: {
          name: '',
          categroy: '0',
          level: '0'
        },
        index: 0,
        show: true,
        clubs: [],
        options: {
          level: [
            {label: '全部', value: '0'},
            {label: '校级', value: '1'},
            {label: '院级', value: '2'}
          ],
          categroy: [
            {label: '全部', value: '0'},
            {label: '公益实践类', value: '1'},
            {label: '体育健身类', value: '2'},
            {label: '文化艺术类', value: '3'},
            {label: '学术科技类', value: '4'},
            {label: '理论学习累', value: '5'},
            {label: '社会科学类', value: '6'}
          ]
        }
      }
    },
    created () {
      this.getClubs()
    },
    onReachBottom () {
      this.loadMore()
    },
    methods: {
      tabClick (e) {
        console.log(e);
        this.activeIndex = e.currentTarget.id;
      },
      onFavoriteClick (index) {
        if (!this.$user.login) {
          // Events.$emit('shuzhi:login')
          return
        }
        this.index = index
        console.log('onFavoriteClick', index)
        if (this.activities[index].favorite) {
        } else {
        }
      },
      onRegisterClick (index) {
        if (!this.$user.login) {
          // Events.$emit('shuzhi:login')
          return
        }
        console.log('onRegisterClick', index)
        this.index = index
        this.open = true
      },
      getClubs () {
        let fly = new Fly()
        fly.get('http://sz.shuhelper.cn/api/ZuZhi/ZuZXX/GetAllZuZXX', {
          zuzmc: '',
          zuzjb: '全部',
          zuzlb: '全部',
          pageSize: 10,
          pageNumber: this.page
        }).then(response => {
          for (let item of response.data.data.zuzxx) {
            let club = {
              id: item.Id,
              name: item.ZuZMC,
              stars: parseInt(item.XingJi),
              charger: item.ZuZLDRXM,
              teacher: item.ZhiDLSXM,
              logo: item.ZuZLogo,
              logo_href: 'http://www.sz.shu.edu.cn/Resources/ZuZTX/' + item.ZuZLogo,
              enrolls: item.ChengYS,
              detail: item.ZuZJS,
              favorite: false,
              register: false
            }
            this.clubs.push(club)
          }
          this.count += 10
          this.page += 1
        })
      },
      loadMore () {
        this.getClubs()
      }
    }
  }
</script>

<style scoped>
  .searchbar-result {
    margin-top: 0;
    font-size: 14px;
  }
  .searchbar-result:before {
    display: none;
  }
  .weui-cell {
    padding: 12px 15px 12px 35px;
  }
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
    /*text-align: center;*/
  }
  .weui-navbar__slider_0 {
    left: 29rpx;
    transform: translateX(0);
  }
  .weui-navbar__slider_1 {
    left: 29rpx;
    transform: translateX(375rpx);
  }
</style>
