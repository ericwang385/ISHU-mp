<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-article">
        <div v-bind:news="news" class="weui-article__h1">{{news}}</div>
        <div class="weui-article__section">
          <div class="weui-article__p">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news:{
      }
    }
  },
  onLoad: function(options) {
    console.log("1."+options)
    //this.news= JSON.parse(options.detail);
    //this.news=options.detail
    console.log("2."+options.title)
  }   
}
</script>

<style>

</style>
