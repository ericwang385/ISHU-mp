<template>
  <div class="page">
    <div class="page__bd page__bd_spacing">
      <wxParse :content="this.newsSingle.detail"  />
    </div>
    </div>
</template>

<script>
import Fly from 'flyio/dist/npm/wx';
import wxParse from 'mpvue-wxparse'
export default {
  components: {
    wxParse
  },
  data() {
    return {
      newsSingle: {
        title: '',
        detail: '',
        type: ''
      },
      MsgID: '',
      category: '',
      page: ''
    }
  },
  onLoad() {
    this.MsgID =  this.$root.$mp.query.MsgID
    this.category = this.$root.$mp.query.category
    this.page = this.$root.$mp.query.page
    this.getdetail(this.category,this.MsgID,this.page)
  },
  methods: {
    getdetail (category,MsgID,page) {
      if (category === 'XGB') {
        let fly = new Fly();
        fly.get('http://sz.shuhelper.cn/mobile/campusmessage/GetXgbCampusMessageById', {
          MsgID: MsgID
        })
          .then(response => {
            this.newsSingle.detail = response.data.Summary
            this.loading = false
          })
      } else if (category === 'JWC') {
        let fly = new Fly();
          fly.get('http://sz.shuhelper.cn/mobile/campusmessage/GetJwcMessageById', {
            MsgID: MsgID
          })
          .then(response => {
            this.newsSingle.detail = response.data.Summary
            this.loading = false
          })
          
      } else if (category === 'JYB') {
          let fly = new Fly();
          fly.get('http://sz.shuhelper.cn/api/TongZGG/TongZGG/GetJiuYXW', {
            infoTitle: '',
            infoType: '通知公告',
            pageSize: 20,
            pageNumber: page
          })
        .then(response => {
          console.log(response)
          if (response.data.data.xinw.length === 0) {
            this.$refs.infiniteScrollJYB.stop()
          }
          this.newsSingle.detail = response.data.data.xinw[MsgID].InfoContent
        })
      }
      console.log(this.newsSingle.detail)
    },
  }
}
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
</style>
