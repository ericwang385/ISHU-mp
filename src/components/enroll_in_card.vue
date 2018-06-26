<template>
  <div class="page__bd">

    <div class="weui-cells__tips">请填写您的联系方式完成报名</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <div class="weui-label">报名活动</div>
        </div>
        <div class="weui-cell__bd">
          <picker @change="bindPickerChange" :value="index" :range="activity_name_list">
            <input disabled="disabled" class="weui-input" :placeholder="selected_activity_name"/>
          </picker>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">学号</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="STaccount" class="weui-input" placeholder="请输入学号"/>
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">邮箱</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="email" class="weui-input" placeholder="请输入邮箱"/>
          </div>
        </div>
      </div>

      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">电话</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="phone" class="weui-input" placeholder="请输入电话"/>
          </div>
        </div>
        <div class="weui-flex" align="center">
          <div class="weui-flex__item" align="center">
            <div class="placeholder" align="center">
              <div class="weui-btn-area" align="center">
                <button class="weui-btn mini-btn"  type="primary" @click="register()">确认提交</button>
              </div>
            </div>
          </div>
          <div class="weui-flex__item" align="center">
            <div class="placeholder" align="center">

              <div class="weui-btn-area" align="center">
                <button class="weui-btn mini-btn"  type="primary" @click="cancel()">重新填写</button>
              </div>

            </div>
          </div>
        </div>
      </div>


      </div>
  </div>

</template>

<script>
  import Fly from 'flyio/dist/npm/wx'

  export default {
    name: 'enroll_in_card.vue',
    props: {
      selected_activity_id: {
        Number,
        default: 0
      },
      selected_activity_name: {
        String,
        default: ''
      }
    },
    data () {
      return {
        STaccount: '',
        ok: true,
        // selected_activity_name: '',
        // selected_activity_id: 0,
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
        activity_id_list: [],
        activity_name_list: [],
        index: 0,
        show: true,
        activities: [],
        activity: {},
        favoriteActivities: [],
        enrollsActivities: [],
        page: 1
      }
    },
    created () {
      this.loadAllActivities();
      // this.GetActivityIdList()
      // 为啥我namelist 放里面加载不出来啊？？？
    },
    // mouted: function () {
    //   console.log(this.selected_activity_name + '||' + this.activity_name)
    //   if (this.activity_id !== 0 && this.activity_name !== '') {
    //     this.selected_activity_id = this.activity_id;
    //     this.selected_activity_name = this.activity_name;
    //   }
    // },
    methods: {
      bindPickerChange (e) {
        this.GetActivityNameList();
        console.log('选中的值为：' + this.activity_name_list[e.mp.detail.value]);
        this.selected_activity_name = this.activity_name_list[e.mp.detail.value];
        for (let activity in this.activities) {
          if (activity.title === this.selected_activity_name) {
            this.selected_activity_id = activity.id;
            break
          }
        }
        console.log(this.selected_activity_id);
      },
      GetActivityIdList () {
        for (let activity in this.activities) {
          this.activity_id_list.push(activity.id);
        }
        console.log(this.activity_id_list)
      },
      cancel () {
        this.STaccount = '';
        this.phone = '';
        this.email = '';
        this.selected_activity_name = '';
      },
      register () {
        // let index = this.index
        let fly = new Fly();
        // Loading.show()
        if (this.STaccount === '' || this.phone === '' || this.email === '') {
          wx.showModal({
            content: '请完成所有信息的填写',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
          return;
        }
        fly.post('http://sz.shuhelper.cn/api/HuoDong/HuoDBMXX/CreateHuoDBM', {
          HuoDXXId: this.activity.id,
          XueHao: this.STaccount,
          ShouJHM: this.phone,
          Email: this.email
        })
          .then(resposne => {
            wx.showModal({
              content: '发送成功，请留意手机短信或邮箱',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            });
            // Loading.hide()
            // Dialog.create({
            //   title: '提示',
            //   message: resposne.data.message,
            //   buttons: [
            //     {
            //       label: '确定',
            //       handler: () => {
            //         this.open = false
            //       }
            //     }
            //   ]
            // })
          })
      },
      loadAllActivities: function () {
        let fly = new Fly();
        this.count += 10
        this.page = 1
        fly.get('http://sz.shuhelper.cn/api/HuoDong/HuoDXX/GetAllHuoDXX', {
          huodmc: this.search.name,
          huodlb: this.search.categroy,
          huodddxq: this.search.location,
          huodsj: this.search.date,
          baomzt: this.search.full,
          pageSize: 100,
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
            console.log('activities字段\n' + this.activities.length)
          })
      },
      GetActivityNameList () {
        if (this.ok) {
          for (let i = 0; i < this.activities.length; i++) {
            this.activity_name_list.push(this.activities[i].title);
          }
          console.log('activities' + this.activities.length);
          console.log('name_list为' + this.activity_name_list)
        }
        this.ok = false
      }
    }
  }

</script>

<style scoped>

</style>
