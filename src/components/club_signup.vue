<template>
  <div class="page">
    <!--<div class="page__hd">-->
    <!--&lt;!&ndash;<div class="page__title">Input</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div class="page__desc">表单输入</div>&ndash;&gt;-->
    <!--</div>-->
    <div class="page__bd">
      <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">请先验证社团名称是否正确</div>
      <div class="weui-toptips weui-toptips_warn" v-if="is_all_writed">请完成所有信息的填写</div>
      <div class="weui-cells__tips">请填写您的联系方式完成报名</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">社团</div>
          </div>
          <div class="weui-cell__bd">
            <input v-bind:disabled="EnablePost" v-bind:style="EnablePost===true?'color:gray':''" v-model="ClubName"
                   class="weui-input" placeholder="请输入社团名称"/>
          </div>
          <div class="weui-cell__ft">
            <div class="weui-vcode-btn" @click="JudgeExist()">点击验证</div>
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
          <!--<div class="weui-cell weui-cell_input">-->
            <!--<div class="weui-cell__hd">-->
              <!--<div class="weui-label">密码</div>-->
            <!--</div>-->
            <!--<div class="weui-cell__bd">-->
              <!--<input v-model="STpassword" class="weui-input" placeholder="请输入密码"/>-->
            <!--</div>-->
          <!--</div>-->
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">联系邮箱</div>
            </div>
            <div class="weui-cell__bd">
              <input v-model="email" class="weui-input" placeholder="请输入联系邮箱"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">联系电话</div>
            </div>
            <div class="weui-cell__bd">
              <input v-model="phone" class="weui-input" placeholder="请输入联系电话"/>
            </div>
          </div>
          <div class="weui-cell weui-cell_input">
            <div class="weui-cell__hd">
              <div class="weui-label">特色专长</div>
            </div>
            <div class="weui-cell__bd">
              <input v-model="special" class="weui-input" placeholder="请输入特色专长"/>
            </div>
          </div>
          <div class="weui-cells__title weui-label">申请理由</div>
          <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell">
              <div class="weui-cell__bd">
                <textarea v-model="reason" class="" placeholder="请输入文本" style="height: 4.0em"/>
                <div class="weui-textarea-counter">{{reason.length}}/140</div>
              </div>
            </div>
          </div>
        </div>
        <div class="weui-flex">
          <div class="weui-flex__item">
            <div class="placeholder">
              <div class="weui-btn-area">
                <button class="weui-btn" type="primary" @click="register()">确认提交</button>
              </div>
            </div>
          </div>
          <div class="weui-flex__item">
            <div class="placeholder">

              <div class="weui-btn-area">
                <button class="weui-btn" type="primary" @click="cancel()">重新填写</button>
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
    name: 'club_signup',
    data () {
      return {
        EnablePost: false,
        STaccount: '',
        STpassword: '',
        ClubName: '',
        selectedTab: '',
        phone: '',
        email: '',
        open: false,
        index: 0,
        show: true,
        clubs: [],
        clubs_name_list: [],
        special: '',
        reason: '',
        showTopTips: false,
        is_all_writed: false
      }
    },
    created () {
      let fly = new Fly()
      fly.get('http://sz.shuhelper.cn/api/ZuZhi/ZuZXX/GetAllZuZXX', {
        zuzmc: '',
        zuzjb: '全部',
        zuzlb: '全部',
        pageSize: 300,
        pageNumber: 1
      }).then(response => {
        for (let item of response.data.data.zuzxx) {
          let club = {
            id: item.Id,
            name: item.ZuZMC
            // stars: parseInt(item.XingJi),
            // charger: item.ZuZLDRXM,
            // teacher: item.ZhiDLSXM,
            // logo: item.ZuZLogo,
            // logo_href: 'http://www.sz.shu.edu.cn/Resources/ZuZTX/' + item.ZuZLogo,
            // enrolls: item.ChengYS,
            // detail: item.ZuZJS,
            // favorite: false,
            // register: false
          }
          this.clubs.push(club)
          this.clubs_name_list.push(club.name)
        }
        console.log(this.clubs_name_list)
      })
    },
    methods: {
      cancel () {
        this.EnablePost = false
        this.STaccount = ''
        this.STpassword = ''
        this.ClubName = ''
        // selectedTab= '',
        this.phone = ''
        this.email = ''
        // open: false,
        // index: 0,
        // show: true,
        // clubs: [],
        // clubs_name_list: [],
        this.special = ''
        this.reason = ''
      },
      register () {
        if (this.EnablePost === false) {
          this.showTopTips = true;
          setTimeout(() => {
            this.showTopTips = false;
          }, 2000)
          return false
        }
        if (this.STaccount === '' || this.phone === '' || this.email === '' ||
          this.special === '' || this.reason === '') {
          this.is_all_writed = true;
          setTimeout(() => {
            this.is_all_writed = false;
          }, 2000)
          return false
        }
        let fly = new Fly()
        // http://sz.shuhelper.cn/api/ZuZhi/ZuZCY/CreateZuZBM 这个是正确的号码
        fly.post('http://sz.shuhelper.cn/api/ZuZhi/ZuZCY/CrateZuZBM', {
          ZuZXXId: this.clubs[this.clubs_name_list.indexOf(this.ClubName)].id,
          XueHao: this.STaccount,
          ShouJHM: this.phone,
          YouXiang: this.email,
          TeCTS: this.special,
          ShenQLY: this.reason
        }).then(response => {
          console.log('发送完毕');
          wx.showModal({
            content: '发送成功，请等待负责人通知或其他消息',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        })
      },
      JudgeExist () {
        //   for (let j in this.clubs_name_list) {
        //     if (j === this.ClubName) {
        //       this.EnablePost = true
        //       break
        //     }
        //   }
        //   if (this.EnablePost) {
        //     console.log('验证通过')
        //   } else {
        //     console.log('验证失败')
        //   }
        if (this.clubs_name_list.indexOf(this.ClubName) != -1) {
          this.EnablePost = true
          console.log('验证通过')
          wx.showModal({
            content: '验证通过',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        } else {
          console.log('验证失败')
          wx.showModal({
            content: '验证失败，请检查社团名字是否填写正确',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
          // console.log(this.clubs_name_list)
          // console.log(this.ClubName)
          // console.log(this.ClubName in this.clubs_name_list)
        }
      }
    }
  }
</script>

<style scoped>

</style>
