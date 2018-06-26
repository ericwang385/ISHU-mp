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
            <activity-card v-on:listenToChildEvent="ShowMsgFromChild" v-for="(activity,index) in activities" :activity="activity" :key="index"></activity-card>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
            <enroll-in-card :selected_activity_name="activity_name_from_child"
                            :selected_activity_id="activity_id_from_child"></enroll-in-card>
          </div>
          <!--<div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Fly from 'flyio/dist/npm/wx'
  import ActivityCard from './activity_card'
  import EnrollInCard from '../../components/enroll_in_card'
  export default {
    components: {
      ActivityCard,
      EnrollInCard
    },
    data () {
      return {
        activity_id_from_child: 0,
        activity_name_from_child: '',
        parentMsg: 'Hello',
        tabs: ['活动一览', '报名活动'],
        activeIndex: 0,
        fontSize: 40,
        selectedTab: '',
        phone: '',
        email: '',
        open: false,
        count: 10,
        search: {
          name: '',
          location: '全部',
          date: '全部',
          categroy: '全部',
          full: '全部'
        },
        index: 0,
        show: true,
        activities: [],
        activity: {},
        favoriteActivities: [],
        enrollsActivities: [],
        page: 1,
        options: {
          location: [
            { label: '全部', value: '全部' },
            { label: '宝山', value: '宝山' },
            { label: '嘉定', value: '嘉定' },
            { label: '延长', value: '延长' }
          ],
          date: [
            { label: '全部', value: '全部' },
            { label: '今天', value: '今天' },
            { label: '明天', value: '明天' },
            { label: '后天', value: '后天' },
            { label: '最近一周', value: '最近一周' },
            { label: '最近一月', value: '最近一月' }
          ],
          categroy: [{ label: '全部', value: 0 }],
          full: [
            { label: '全部', value: '全部' },
            { label: '未满', value: '未满' },
            { label: '已满', value: '已满' }
          ]
        }
      }
    },
    created () {
      this.getCategories()
      this.getActivities()
    },
    computed: {
      navbarSliderClass () {
        if (this.activeIndex == 0) {
          return 'weui-navbar__slider_0'
        }
        if (this.activeIndex == 1) {
          return 'weui-navbar__slider_1'
        }
        // if (this.activeIndex == 2) {
        //   return 'weui-navbar__slider_2'
        // }
      }
    },
    methods: {
      ShowMsgFromChild (data) {
        // console.log(data);
        this.activity_name_from_child = data[0];
        this.activity_id_from_child = data[1];
       // console.log(this.activity_id_from_child + this.activity_name_from_child);
        this.activeIndex = 1;
      },
      getActivities () {
        this.loadMoreActivities(1)
      },
      tabClick (e) {
        console.log(e);
        this.activeIndex = e.currentTarget.id;
      },
      loadMoreActivities: function (index) {
        let fly = new Fly();
        this.count += 10
        this.page = index
        fly.get('http://sz.shuhelper.cn/api/HuoDong/HuoDXX/GetAllHuoDXX', {
          huodmc: this.search.name,
          huodlb: this.search.categroy,
          huodddxq: this.search.location,
          huodsj: this.search.date,
          baomzt: this.search.full,
          pageSize: 10,
          pageNumber: this.page
        })
          .then(response => {
            console.log(response.data.data)
            if (response.data.data.huodxx.length === 0) {
              this.$refs.activitiesInfiniteScroll.stop()
              return
            }
            for (let rawActivity of response.data.data.huodxx) {
              this.activities.push({
                id: rawActivity.Id,
                title: rawActivity.HuoDMC,
                founder: {
                  avatar: `http://www.sz.shu.edu.cn/Resources/TouXiang/${rawActivity.TouXZP}`,
                  name: rawActivity.CreateName
                },
                poster: `http://www.sz.shu.edu.cn/Resources/HuoDTP/${rawActivity.HaiBTP}`,
                views: rawActivity.LiuLRS,
                enrolls: rawActivity.BaoMRS,
                favoriteTime: rawActivity.ShouCRS,
                capacity: rawActivity.RenSXZ,
                location: rawActivity.HuoDDDXQ,
                favorite: true,
                register: false,
                start: rawActivity.HuoDKSSJ,
                end: rawActivity.HuoDJSSJ,
                detail: rawActivity.HuoDJJ,
                notice: rawActivity.BaoMXuZ
              })
            }
            console.log('activities字段\n' + this.activities)
          })
      },
      getCategories () {
        let fly = new Fly();
        fly.get('http://sz.shuhelper.cn/api/HuoDong/HuoDLB/GetHuoDLB').then(response => {
          var data = response.data.data.huodlb
          for (let i = 0; i < data.length; i++) {
            let type = data[i]
            this.options.categroy.push({
              value: type.HuoDLBName,
              label: type.HuoDLBName,
              open: false
            })
          }
          console.log(this.options.categroy)
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
    padding-top: 30px;
    /*text-align: center;*/
  }
  .weui-navbar__slider_0 {
    left: 29rpx;
    transform: translateX(60rpx);
  }
  .weui-navbar__slider_1 {
    left: 29rpx;
    transform: translateX(440rpx);
  }
  /*.weui-navbar__slider_2 {*/
    /*left: 29rpx;*/
    /*transform: translateX(500rpx);*/
  /*}*/
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
</style>
