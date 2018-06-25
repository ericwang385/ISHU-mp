<template>
  <div class="weui-panel weui-panel_access">
    <!--<div class="weui-panel__hd">图文组合列表</div>-->
    <div class="weui-panel__bd">
      <navigator url="" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
        <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
          <image class="weui-media-box__thumb" :src="club.logo_href"/>
          <!--<p>http://www.sz.shu.edu.cn/Resources/ZuZTX/{{club.logo}}</p>-->
        </div>
        <!--:src="`http://www.sz.shu.edu.cn/Resources/ZuZTX/${club.logo}`"-->
        <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
          <div class="weui-media-box__title">{{club.name}}</div>
          <div class="weui-media-box__desc">
            <div class="icon-box">
              <icon type="person" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;负责人:&nbsp;&nbsp;{{club.charger}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <div class="icon-box">
              <icon type="person" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;负责老师:&nbsp;&nbsp;{{club.teacher}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <div class="icon-box">
              <icon type="people" size="93"></icon>
              <div class="icon-box__ctn">
                <div class="icon-box__title">&nbsp;&nbsp;社团人数:&nbsp;&nbsp;{{club.enrolls}}</div>
                <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              </div>
            </div>
            <!--<icon type="star" size="93"></icon>-->
            <div class="icon-box">
              <!--<div class="icon-box__desc">用于表示信息提示；也常用于缺乏条件的操作拦截，提示用户所需信息</div>-->
              <div class="weui-rate-wrap">
                <ul class="weui-rate">
                  <li>社团评星：</li>
                  <li class="weui-rate-item" v-for="n in max" :key="index"
                      :class="{'weui-rate-item-active' : index <= club.stars}" :data-index='index'>
                    <div class="weui-rate-item-def"></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </navigator>
    </div>
    <div class="weui-panel__ft">
      <div class="weui-cell weui-cell_access weui-cell_link">
          <button class="weui-btn mini-btn" type="default" size="mini" @click="OnClick()">查看简介</button>
        <div class="weui-cell__ft weui-cell__ft_in-access"></div>
      </div>
      <div class="club_detail_style_sheet weui-article__p" v-if="open===false" v-html="club.detail"></div>
    </div>
  </div>
</template>

<script>
  import Rate from './rate.vue'

  export default {
    config: {
      'enablePullDownRefresh': true
    },
    components: {
      Rate
    },
    props: {
      club: Object
    },
    data () {
      return {
        open: true,
        max: 5
      }
    },
    name: 'club_card.vue',
    methods: {
      OnClick () {
        if (this.open === true) {
          this.open = false;
        } else {
          this.open = true;
        }
      }

    }
  }
</script>

<style scoped>
  .weui-rate-wrap {
    margin: 15px 7px;
  }

  .weui-rate {
    display: flex;
  }

  .weui-rate-item {
    width: 15px;
    height: 15px;
  }

  .weui-rate-item .weui-rate-item-def {
    position: absolute;
    width: 80%;
    height: 80%;
    /*background-size: 100%;*/
    /*background-repeat: no-repeat;*/
    /*background-position: 50%;*/
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAsVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADHx8cAAADt7e2ysrJ6enoAAADu7u7MzMzBwcGHh4cAAAAAAADa2trS0tLExMS+vr42NjYAAADv7+/r6+vq6uro6Ojm5ubKysq8vLwAAADr6+vf39/c3NzPz8+1tbWrq6vo6Ojm5ubOzs6vr6+RkZHj4+Pi4uLV1dW4uLienp6ampplZWVWVlbv7+8EiCYnAAAAOnRSTlMAPCsDJgsGOg4hNyMapgj3jGQX/K2eah4Sx7eim0ow/fHv6uGqlzTz0820j4Xo5LGJcNzYvZR7eFpV7G3f4gAAAcpJREFUSMeVVulyskAQdBZwWQ4F5FREjUeiMdd3JvP+DxZCUVskzMrSf+mu3pqZnmGigG1PxoGxcXw7DK1xBsvLKAsLcANjLMwXxNjU589gg7iAmb7BAWv4rr7BAmvMYapr4GODlabF9MugseB6Fu4KW5SZnsEcW2y5oSEQCUocNSwMfo8ST86wRVZiB4/ewPtzj++6gr3j2bSJYUcuc9Zvj3v8hl9BunaYG3VkhhWJmpq+xucdkrg7H16/ZCKyapmA8OoXdziIp8K/hiDqQQjuURPbwGwKHzzr8feBmDTw4EGH/wCyxhEUw/wCoolEDn+G+EvIv60V/nKbH3P7x55wDrf4vmP1cnlK1PzkNCPmqCpV/GNFRs+oLor3MMWQWyEt+FBF2wtowb9ctV6WiicJheC0V8xEpUgzII050IL8DRVQHJeM7px6FbBCOXj0qeDbDmfXzffziVzy753YHx3n2Mn5mmpddJXRLXlmGBkvZdj/U61z47aICRdGU2bBk3l7KajWVb+xxmIFrvSfurBqbsWZUW2rP238li4lJhw2tSsnbn+KGIM569XChJhsnff3AozsqMVgGfRbx1JJ77uztN860775syIFn72pvWujU85XAAAAAElFTkSuQmCC);
  }

  .weui-rate-item-active .weui-rate-item-def {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAilBMVEUAAAD/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyr/uyoEd/G7AAAALXRSTlMA+fUzFQ/vioT9vJE9tqNmLRsL2KuYe005JiID6ebhoJtxbF/qzMSxWx9FQgn3q32nAAABYUlEQVRIx5XV2XKDMAwFUJt9h5BAyL5vbe///14zNMShWNg+T8wgwSAZiRGShJmJUrN4G7CNEm7AzCS+ABAuDBJmeMr04xchnvhSO2GHVqUbv+Ro8YlmQoUXXy9+wrsEy9FKiPEW6MQ7lkjwXKbm40Ot9wJh/aNMCNBzVDz+++ihZ5Mn8lK5TR5Ha0htojhvxOeX9slPt1Dapv7JLhnzQxgIfbbaw0C1EnVREp0/QNOBvZw4NPA7e5tbULLmvbnlQcFrWI+9xqhNMfgvR3s3fUh+tClIF0d6nK4gRC41UAkPJpeDMCfnF4EaN+RXX+XxLt3klTThCwRqudQgUKMgBYFaFR5IU+kWwafzGZ9kR+MOwavLsvYUrYtFFQO3LXNgjY7xSxcev9/vxLw7fsP48u8erya9M7/nVOuSdk5ly0EtsnbSFUwQs2ZWSLf8DUAu2eWpzQh2hB37L2vYiGTfXf0Cn7ynb0Flqc0AAAAASUVORK5CYII=);
  }

  .club_detail_style_sheet {
    margin-left: 10px;
    margin-right: 10px;
  }

</style>
