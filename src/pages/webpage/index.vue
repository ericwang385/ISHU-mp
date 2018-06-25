<template>
  <div class="page">
    <div class="page__bd"
      <web-view v-bind:src="url"></web-view> 
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
