<template>
  <div class="page">
    <div class="page__bd"
      <web-view src="http://sz.shuhelper.cn/mobile/campusmessage/GetXgbCampusMessageById?MsgID=230624"></web-view> 
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    }
  },
  onLoad: function(options) {      
    this.url= options.src        
  }   
}
</script>

<style scoped>
</style>

<style>

</style>
