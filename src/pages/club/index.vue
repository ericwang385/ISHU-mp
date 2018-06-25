<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex === index}" class="weui-navbar__item"
                 @click="tabClick">
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
              <input type="text" class="weui-search-bar__input" placeholder="输入组织名称并搜索" v-model="search.name"
                     @change="bindNameChange"/>

              <div class="weui-cells weui-cells_after-title">
                <div class="weui-cell weui-cell_input">
                  <div class="weui-cell__hd">
                    <div class="weui-label">组织级别</div>
                  </div>
                  <div class="weui-cell__bd">
                    <input disabled="disabled" class="weui-input" :placeholder=search.level />
                  </div>
                  <div class="weui-cell__ft">
                    <picker @change="bindPickerChange_level" :value="index" v-model="search.level"
                            :range="options.level_list">
                      <button class="weui-vcode-btn" >选择</button>
                    </picker>
                  </div>
                </div>

                <div class="weui-cells weui-cells_after-title">
                  <div class="weui-cell weui-cell_input">
                    <div class="weui-cell__hd">
                      <div class="weui-label">组织级别</div>
                    </div>
                    <div class="weui-cell__bd">
                      <input disabled="disabled" class="weui-input" :placeholder=search.category />
                    </div>
                    <div class="weui-cell__ft">
                      <picker @change="bindPickerChange_categroy" :value="index" v-model="search.category"
                              :range="options.category_list">
                        <button class="weui-vcode-btn">选择</button>
                      </picker>
                    </div>
                  </div>
                </div>
              </div>
                <club-card v-for="(club,index) in clubs" :club="club" :key="index"
                           @onFavoriteClick="onFavoriteClick(index)"
                           @onRegisterClick="onRegisterClick(index)"></club-card>
              </div>
            </div>
            <div class="weui-tab__content" :hidden="activeIndex != 1">
              <club-sign-up></club-sign-up>
            </div>
            <!--<div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>-->
          </div>
        </div>
      </div>
    </div>
    <!--<div v-for="(item1,index1) in issues[activeIndex]" :key="index1">-->
    <!--<div class="kind-list__item">-->
    <!--<div :id=item1.name :class="{'kind-list__item-hd_show':item1.open}"-->
    <!--class="weui-flex,kind-list__item-hd" @click="kindToggle">-->
    <!--<div class="weui-flex__item" style="text-align:left">{{item1.name}}</div>-->
    <!--<img class="kind-list__img" :src=" '/static/images/icon_nav_form.png'">-->
    <!--</div>-->
    <!--<div :class="{'kind-list__item-bd_show':item1.open}" class="kind-list__item-bd">-->
    <!--<div :class="{'weui-cells_show':item1.open}" class="weui-cells">-->
    <!--<div v-html="item1.detail" style="text-align:left">-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
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
        fontSize: 40,
        selectedTab: '',
        phone: '',
        email: '',
        open: false,
        count: 10,
        page: 1,
        search: {
          name: '',
          category: '全部',
          level: '全部'
        },
        index: 0,
        show: true,
        clubs: [],
        options: {
          level_list:
            ['全部', '校级', '院级'],
          category_list:
            ['全部', '公益实践类', '体育健身类', '文化艺术类', '学术科技类', '理论学习类', '社会科学类'],
          level:
          [
              {label: '全部', value: '0'},
              {label: '校级', value: '1'},
              {label: '院级', value: '2'}
          ],
          category: [
            {label: '全部', value: '0'},
            {label: '公益实践类', value: '1'},
            {label: '体育健身类', value: '2'},
            {label: '文化艺术类', value: '3'},
            {label: '学术科技类', value: '4'},
            {label: '理论学习类', value: '5'},
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
      RefreshClubsData () {
        this.clubs = [];
        this.page = '0';
        this.count = '0';
        this.getClubs();
      },
      bindNameChange (e) {
        console.log('search.name的值为' + this.search.name);
        this.RefreshClubsData();
      },
      bindPickerChange_level (e) {
        // 这两个函数纯属写的脑子有问题,,,,
        console.log('选中的值为：' + this.options.level_list[e.mp.detail.value]);
        let select = this.options.level_list[e.mp.detail.value];
        for (let i = 0; i < this.options.level.length; i++) {
          if (this.options.level[i].label === select) {
            // this.search.level = this.options.level[i].value;
            this.search.level = this.options.level_list[e.mp.detail.value];
            console.log('search.level的值为' + this.search.level);
          }
        }
        this.RefreshClubsData();
      },
      bindPickerChange_categroy (e) {
        // 这两个函数纯属写的脑子有问题,,,,
        console.log('选中的值为：' + this.options.category_list[e.mp.detail.value]);
        let select = this.options.category_list[e.mp.detail.value];
        for (let i = 0; i < this.options.category.length; i++) {
          if (this.options.category[i].label === select) {
            // this.search.category = this.options.category[i].value;
            this.search.category = this.options.category_list[e.mp.detail.value];
            console.log('search.category的值为' + this.search.category)
          }
        }
        this.RefreshClubsData();
      },
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
          zuzmc: this.search.name,
          zuzjb: this.search.level,
          zuzlb: this.search.category,
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
    /*text-align: center;*/
  }

  .weui-navbar__slider_0 {
    left: 5 rpx;
    transform: translateX(0);
  }

  .weui-navbar__slider_1 {
    left: 5 rpx;
    transform: translateX(380 rpx);
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
</style>
