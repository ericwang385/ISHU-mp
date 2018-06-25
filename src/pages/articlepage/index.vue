<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-article">
        <div v-bind:news="news" class="weui-article__h1">{{title}}</div>
        <div v-html="detail"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Fly from 'flyio/dist/npm/wx';
export default {
  data() {
    return {
      news : {
      type:"",
      MsgID: ""
      },
      new_2 : {
      title:"",
      detil:""
      },
      detail : "",
      title : "",
      JYB : [],
      card:{
      }
    }
  },
  onLoad: function(options) {
    console.log("1."+options)
    //this.news= JSON.parse(options.detail);
    this.news=options
    console.log("2."+this.news.MsgID)
    if (options.type === 'XGB') {
        let fly = new Fly();
        fly.get('http://sz.shuhelper.cn/mobile/campusmessage/GetXgbCampusMessageById', {
          MsgID: this.news.MsgID
        })
        .then(response => {
          this.detail = response.data.Summary
          this.title = response.data.Title
          console.log('3.'+this.detail)
          // this.$nextTick(() => {
          // })
        })
     } else if (options.type === 'JWC') {
        let fly = new Fly();
        fly.get('http://sz.shuhelper.cn/mobile/campusmessage/GetJwcMessageById', {
            MsgID: this.news.MsgID
        })
        .then(response => {
          this.detail = response.data.Summary
          this.title = response.data.Title
          console.log('3.'+this.detail)
        })
      } else if (options.type === 'JYB') {
          for (let index of [0,1]){
            let fly = new Fly();
            fly.get('http://sz.shuhelper.cn/api/TongZGG/TongZGG/GetJiuYXW', {
            infoTitle: '',
            infoType: '通知公告',
            pageSize: 20,
            pageNumber: index
            })
            .then(response => {
              if (response.data.data.xinw.length === 0) {
                this.$refs.infiniteScrollJYB.stop()
              }
              var that=this
              for (let item of response.data.data.xinw) {
                let news_2 = {
                  title: item.InfoTitle,
                  detail: item.InfoContent, 
                }
                that.JYB.push(news_2)
              }
            })
          }
          console.log('7.'+this.JYB)
          this.card = this.JYB[this.news.MsgID]
          console.log('8.'+this.card)
      }
  }   
}
</script>

<style>

</style>
