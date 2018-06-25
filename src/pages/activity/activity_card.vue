<template>
  <div class="weui-panel weui-panel_access">
    <!--<div class="weui-panel__hd">图文组合列表</div>-->
    <div class="weui-panel__bd">
      <navigator  class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <image class="weui-media-box__thumb" :src="activity.poster"/>
          <!--<p>http://www.sz.shu.edu.cn/Resources/ZuZTX/{{club.logo}}</p>-->
        </div>
        <!--:src="`http://www.sz.shu.edu.cn/Resources/ZuZTX/${club.logo}`"-->
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">{{activity.title}}</div>
          <div class="weui-media-box__desc">
            <div class="icon-box">
              <icon type="person" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;报名人数:&nbsp;&nbsp;{{activity.enrolls}} / {{activity.capacity}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <div class="icon-box">
              <icon type="person" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;开始时间:&nbsp;&nbsp;{{activity.start}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <div class="icon-box">
              <icon type="person" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;结束时间:&nbsp;&nbsp;{{activity.end}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <div class="icon-box">
              <icon type="people" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;活动地点:&nbsp;&nbsp;{{activity.location}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <div style="padding-top: 5px;">&nbsp;</div>
              <button class="weui-btn mini-btn" type="primary" size="mini" plain="true" style="display:inline;width: 100rpx" @click="this.OnMoreDetail">查看详情</button>
            <!--<button hidden="hidden" class="weui-btn mini-btn" type="primary" size="mini" plain="true" style="display:inline;width: 100rpx">点击报名</button>-->
            <div style="padding-left: 15px;display:inline;width: 100rpx">&nbsp;</div>
            <button class="weui-btn mini-btn" type="primary" size="mini" plain="true" style="display:inline;width: 100rpx" @click="this.OnEnrollIn">点击报名</button>
          </div>
        </div>
      </navigator>
      <div class="weui-media-box__bd weui-media-box__bd_in-appmsg" style="padding-left: 10px;padding-right: 10px; display: inline">
        <div class="club_detail_style_sheet weui-article__p" v-if="on_more_detail===true" v-html="activity.detail"></div>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
      name: 'activity_card.vue',
      props: {
        activity: Object,
        on_more_detail: false,
        on_enroll_in: false
      },
      data () {
        return {open: false}
      },
      created () {
        console.log(this.activity)
      },
      methods: {
        OnMoreDetail () {
          console.log('show details')
          if (this.on_more_detail === false) {
            this.on_more_detail = true
          } else {
            this.on_more_detail = false
          }
        },
        OnEnrollIn () {
          console.log('enroll in')
        }
      }
    }
</script>

<style scoped>

</style>
