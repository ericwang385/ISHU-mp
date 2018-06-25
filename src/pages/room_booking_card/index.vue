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
            <input class="weui-input" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">手机号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">学号</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入学号" />
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
        <div class="weui-cell weui-cell_input weui-cell_vcode">
          <div class="weui-cell__hd">
            <div class="weui-label">验证码</div>
          </div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入验证码" />
          </div>
          <div class="weui-cell__ft">
            <image class="weui-vcode-img" src="/static/images/vcode.jpg" style="width: 108px"></image>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            array: ['8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00'],
            date: '2018-09-01',
            timeChange: 0
        }
    },
    methods: {
    bindDateChange(e) {
      this.date = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    bindTimeChange(e) {
      this.time = e.mp.detail.value;
      console.log(e.mp.detail.value);
    },
    PickerChange(e) {
        this.timeChange = e.mp.detail.value;
    }
    }
}
</script>

<style>

</style>


    
        