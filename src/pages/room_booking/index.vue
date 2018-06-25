<template>
    <div class="page">
        <div class="page__hd">
            <div class="page__title">教室预约</div>
            <div class="page__desc">预约教室请留上海本地手机！当日20:00之前申请，当天审核；超过20:00，次日审核，请注意审核时间，以免耽误活动开展</div>
        </div>
        <div class="page__bd page__bd_spacing">
        <div class="kind-list">
        <div v-for="(item1,index1) in rooms" :key="index1">
          <div class="kind-list__item">
            <div :id=item1.ID :class="{'kind-list__item-hd_show':item1.open}" class="weui-flex,kind-list__item-hd" @click="kindToggle">
              <div class="weui-flex__item">{{item1.name}}</div>
              <img class="kind-list__img" :src=" '/static/images/'+item1.avi+'.png'">
            </div>
            <div :class="{'kind-list__item-bd_show':item1.open}" class="kind-list__item-bd">
              <div :class="{'weui-cells_show':item1.open}" class="weui-cells">
                <div class="weui-cell">
                <div class="weui-cell__bd">教室容量</div>
                <div class="weui-cell__ft">{{item1.cap}}</div>
                </div>
                <div class="weui-cell">
                <div class="weui-cell__bd">教室类型</div>
                <div class="weui-cell__ft">{{item1.type}}</div>
                </div>
                <div class="weui-cell">
                <div class="weui-cell__bd">教室状态</div>
                <div class="weui-cell__ft">{{item1.aviliable}}</div>
                </div>
                  <button :id=item1.ID v-if="item1.aviliable == '可用'" type="primary" class="weui-btn mini-btn"  @click="turnToVuexPage">预约</button>
                  <button v-else type="warn" class="weui-btn mini-btn" disabled=true>不可预约</button>
              </div>
            </div>
            </div>
            </div>
          </div>
        </div>
        </div>
</template>
<script>
import base64 from '../../../static/images/base64'
import Fly from 'flyio/dist/npm/wx'
export default {
    data() {
    return {
      rooms: [],
    }
    },
    created() {
        this.getRooms()
    },
    methods: {
      turnToVuexPage(e) {
      wx.navigateTo({
        url: '/pages/room_booking_card/room_booking_card?id='+e.currentTarget.id
      })
    },
    kindToggle(e) {
      var id = e.currentTarget.id,
        list = this.rooms;
      for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].ID == id) {
          list[i].open = !list[i].open;
        } else {
          list[i].open = false;
        }
      }
      this.rooms = list;
      console.log(this.rooms)
      
    },

    getRooms() {
      let fly = new Fly;
      fly.get('http://sz.shuhelper.cn/api/ChangDXX/ChangDXX/GetShiNCDXX', {
          pageSize: 10, 
          pageNumber: 1 
        })
        .then(response =>  {
          console.log(response)
          for (let item of response.data.data.changdxx) {
            if (item.ChangDZT=='激活'){
              item.ChangDZT='可用'
              item.CreatedGH='correct'
              }
            else{
              item.ChangDZT='已借出'
              item.CreatedGH='Attention'
            }
            let room = {
              cap: item.ChangDRL,
              ID: parseInt(item.Id),
              name: item.ChangDMC,
              aviliable: item.ChangDZT,
              type: item.ChangDSX,
              open: item.IsDeleted,
              avi: item.CreatedGH
            }
            this.rooms.push(room)
          }
          
          
        })
    }
  },
}
</script>
<style scoped>
.weui-flex {
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.weui-cells {
  margin-top: 0;
  opacity: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.weui-cells:after,
.weui-cells:before {
  display: none;
}

.weui-cells_show {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.weui-cell:before {
  right: 15px;
}

.kind-list__item {
  margin: 10px 0;
  background-color: #fff;
  border-radius: 2px;
  overflow: hidden;
}

.kind-list__item:first-child {
  margin-top: 0;
}

.kind-list__img {
  width: 30px;
  height: 30px;
}

.kind-list__item-hd {
  padding: 20px;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

.kind-list__item-hd_show {
  opacity: 0.4;
}

.kind-list__item-bd {
  height: 0;
  overflow: hidden;
}

.kind-list__item-bd_show {
  height: auto;
}
</style>


