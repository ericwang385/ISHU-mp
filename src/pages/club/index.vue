<template>
  <div class="page">
    <div class="page__bd_spacing"></div>
    <div class="page__desc">
    </div>
    <div class="weui-search-bar__box">
      <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
      <input type="text" class="weui-search-bar__input" placeholder="输入组织名称并搜索" v-model="search.name" />
    </div>
    <club-card v-for="(club,index) in clubs" :club="club" :key="index" @onFavoriteClick="onFavoriteClick(index)" @onRegisterClick="onRegisterClick(index)"></club-card>



  </div>
</template>

<script>
  import ClubCard from '../../components/club_card.vue'
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
    config: {
      'enablePullDownRefresh': true
    },
    components: {
      ClubCard
    },
    data () {
      return {
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
    methods: {
      async onPullDownRefresh () { // 下拉刷新
        console.log('下拉刷新')
        this.loadMore()
        wx.stopPullDownRefresh()
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
</style>
