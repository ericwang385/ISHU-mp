<template>
    <div class="page">
        <div class="page__bd">
        <div class="weui-cells__title">教室预约</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">姓名</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="name" class="weui-input" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="tel" class="weui-input" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">学号</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="id" class="weui-input" placeholder="请输入学号" />
          </div>
        </div>
         <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">活动名称</div>
          </div>
          <div class="weui-cell__bd">
            <input v-model="actname" class="weui-input" placeholder="请输入活动名称" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">日期</div>
          </div>
          <div class="weui-cell__bd">
            <picker mode="date" value="date" start="2018-06-25" end="2018-09-01" @change="bindDateChange">
              <div class="weui-input">{{date}}</div>
            </picker>
          </div>
        </div>
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__hd">
            <div class="weui-label">时间</div>
          </div>
          <div class="weui-cell__bd">
            <picker  @change="PickerChange" value="indexPicker" :range="array">
                <div class="weui-input">{{array[timeChange]}}</div>
            </picker>
          </div>
          </div>
          <button  type="primary" class="weui-btn mini-btn"  @click="register()">预约</button>
      </div>
    </div>
    </div>
</template>

<script>
import Fly from 'flyio/dist/npm/wx';
export default {
    data() {
        return{
            array: ['8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00'],
            date: '2018-09-01',
            timeChange: 0,
            time: '',
            id: '',
            name: '',
            tel: '',
            actname: '',
            roomID: ''
        }
    },
    onLoad(){
      this.roomID = this.$root.$mp.query.id
    },
    methods: {
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    PickerChange(e) {
      this.timeChange = e.mp.detail.value;
      this.time = this.array[this.timeChange]
    },
   register() {
     wx.showLoading({
        title: '加载中',
        mask: true
      })
      let fly = new Fly();
        fly.post('http://sz.shuhelper.cn/api/ChangDXX/ShiNCDYYXX/CreateShiNCDYYXX', {
          ZuZXXId: '2',
          ChangDXXId: this.roomID,
          YuYRQ: this.date,
          YuYSJD: this.time,
          XueHao: this.id,
          XingMing: this.name,
          LianXDH: this.tel,
          HuoDMC: this.actname,
          HuoDLX: '1',
          HuoDJJ: '测试5',
          HuoDRS: '80'
        })
        .then(response => {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: response.data.message,
            showCancel: false,
            success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
          }
        }
          })
        })
}
}
}
</script>

<style>

</style>


    
        