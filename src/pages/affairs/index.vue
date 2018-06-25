<template>
  <div class="page">
    <div class="page__bd page__bd_spacing">
        <div class="weui-tab">
            <div class="weui-navbar">
                <block v-for="(item,index) in tabs" :key="index">
                    <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
                        <div class="weui-navbar__title">{{item}}</div>
                    </div>
                </block>
                <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
            </div>
            <div class="weui-tab__panel">
                <div class="weui-tab__content" :hidden="activeIndex != 0">
                    <div class="kind-list">
                      <div v-for="(item1,index1) in issues[activeIndex]" :key="index1">
                        <div class="kind-list__item">
                          <div :id=item1.name :class="{'kind-list__item-hd_show':item1.open}" class="weui-flex,kind-list__item-hd" @click="kindToggle">
                          <div class="weui-flex__item" style="text-align:left">{{item1.name}}</div>
                          <img class="kind-list__img" :src=" '/static/images/icon_nav_form.png'">
                          </div>
                          <div :class="{'kind-list__item-bd_show':item1.open}" class="kind-list__item-bd">
                            <div :class="{'weui-cells_show':item1.open}" class="weui-cells">
                              <div v-html="item1.detail" style="text-align:left">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="weui-tab__content" :hidden="activeIndex != 1">
                    <div class="kind-list">
                      <div v-for="(item1,index1) in issues[activeIndex]" :key="index1">
                        <div class="kind-list__item">
                          <div :id=item1.name :class="{'kind-list__item-hd_show':item1.open}" class="weui-flex,kind-list__item-hd" @click="kindToggle">
                          <div class="weui-flex__item" style="text-align:left">{{item1.name}}</div>
                          <img class="kind-list__img" :src=" '/static/images/icon_nav_form.png'">
                          </div>
                          <div :class="{'kind-list__item-bd_show':item1.open}" class="kind-list__item-bd">
                            <div :class="{'weui-cells_show':item1.open}" class="weui-cells">
                              <div v-html="item1.detail" style="text-align:left">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="weui-tab__content" :hidden="activeIndex != 2">
                    <div class="kind-list">
                      <div v-for="(item1,index1) in issues[activeIndex]" :key="index1">
                        <div class="kind-list__item">
                          <div :id=item1.name :class="{'kind-list__item-hd_show':item1.open}" class="weui-flex,kind-list__item-hd" @click="kindToggle">
                          <div class="weui-flex__item" style="text-align:left">{{item1.name}}</div>
                          <img class="kind-list__img" :src=" '/static/images/icon_nav_form.png'">
                          </div>
                          <div :class="{'kind-list__item-bd_show':item1.open}" class="kind-list__item-bd">
                            <div :class="{'weui-cells_show':item1.open}" class="weui-cells">
                              <div v-html="item1.detail" >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tabs: ['证明类', '事务类', '场地租借'],
      activeIndex: 0,
      fontSize: 30,
      issues: [
        [
          {
            name: '在读证明',
            open: false,
            detail: `
            一、普通在读证明
             <br/>
            1、用途：户籍证明、实习就业、办理出国签证、困难补助及贷款、考试报名、其他
             <br/>
            2、办理流程：请携带本人学生证，前往A408或A400-四号窗口办理（代办需携带该生学生证或身份证其中之一）或自助打印。
            （注：若需办理中英文在读证明，请携带普通在读证明前往档案馆。）
             <br/>
            二、出入境在读证明
             <br/>
            1、用途：护照、港澳通行证、台湾通行证（注：出入境在读证明适用于户籍未迁入上海大学的非上海户籍本科生办理以上三种证件所用，上海户籍或户籍已迁入上海大学的本科生只需开具普通在读证明即可）
             <br/>
            2、办理流程：学工办网站下载或A408领取《在校证明申请表》到学院签字盖公章后至A408学籍科办理。
            `
          },
          {
            name: '居住证明',
            open: false,
            detail: ` 请前往校本部A400学生服务中心15号窗口办理：<br/>
                      请同学先前往武保处网站下载相关表格，填写完成后在15号窗口进行信息审核与盖章<br/>
                      窗口电话：021-66135339<br/>
                      注意：居住证明办理只限宝山校区(校本部)住宿学生，其他校区或已退宿学生不予办理`
          },
          {
            name: '成绩证明',
            open: false,
            detail: `<br/>
                      在校本科生成绩大表，成绩排名证明，请前往在A楼5楼教务处办理<br/>
                      注意: 成绩证明办理请先在学生所在学院教务办公室签字盖章`
          },
          {
            name: '创新项目立项，结题证明',
            open: false,
            detail: ` 请至行政楼306找相关老师办理<br/>
                      注意：结题证明开具需学院已将相关结题材料上交后进行`
          },
          {
            name: '婚育证明',
            open: false,
            detail: `请至行政楼411找相关老师办理<br/>
                      电话: 021-66134532转802`
          },
          {
            name: '户籍证明',
            open: false,
            detail: ` 集体户口学生，因私需公安机关出具《户籍证明》，由本人填写申请表（须在申请表中填写事由和用途，如申办护照、出国签证、边境出入证、就业、结婚、公证等），请辅导员老师或导师签名认可并加盖学院公章，同时需开具在读证明，后持本人身份证、申请表、在读证明，在保卫处“窗口”申领《户籍证明》介绍信，最后携带本人身份证、保卫处出具的《户籍证明》介绍信和在读证明，到集体户口管辖地区公安派出所办理《户籍证明》。申请表可在武保处网站服务指南板块里下载也可在武保处领取。
                      <br />
                      <b>宝山校区</b>：集体户口管辖地区公安派出所：祁连派出所（锦秋路1281号）
                      <br />
                      <b>嘉定校区</b>：集体户口管辖地区公安派出所：嘉城派出所（塔城路555号）。
                      <br />
                      <b>延长校区</b>：集体户口管辖地区公安派出所：大宁派出所（彭江路200号）。还需携带身份证复印件。
                      <br />
                      保卫处咨询电话：
                      <br />
                      <b>宝山校区</b>：66132610，66134278
                      <br />
                      <b>嘉定校区</b>：69982395，69982400
                      <br />
                      <b>延长校区</b>：56331897
                      <br />
                      网址http://www.wubaochu.shu.edu.cn/Default.aspx
                      <br />`
          }
        ],
        [
          {
            name: '毕业生协议书鉴定(本科生)',
            open: false,
            detail: `  前往校本部A400学生服务中心5号窗口办理：<br/>
                      请先在网上填写电子协议书 <br/>
                      电子协议书输入流程:<br/>
                          (1) 进入上海大学就业网 <br/>
                          (2) 使用一卡通帐号密码登录 <br/>
                          (3) 管理中心->就业管理->填写毕业生去向 <br/>
                          (4) 生源地就业主管部门必须填写，有列表可查询(上海籍学生除外) <br/>
                          (5) 电子版提交完成后，将由工作人员鉴证 <br/>
                      窗口电话：021-66135238`
          },
          {
            name: '成绩单补办',
            open: false,
            detail: `  全国大学生英语四、六级考试成绩单遗失申请补办 <br/>
                      上海市高校计算机等级考试成绩单遗失申请补办 <br/>
                      国家普通话水平测试证书遗失补办 <br/>
                      国家汉字应用水平测试成绩单补办 <br/>
                      以上成绩单遗失补办可于A楼5楼教务处进行办理`
          },
          {
            name: '困难生认定(本科生)',
            open: false,
            detail: ` 前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>`
          },
          {
            name: '绿色通道(本科生)',
            open: false,
            detail: `   前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>`
          },
          {
            name: '国家助学贷款(本科生)',
            open: false,
            detail: ` 前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>`
          },
          {
            name: '助学金(本科生)',
            open: false,
            detail: ` 前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>`
          },
          {
            name: '临时困难补助(本科生)',
            open: false,
            detail: ` 前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>`
          },
          {
            name: '慈善爱心屋',
            open: false,
            detail: ` 前往C楼车库慈善爱心屋办理<br/>
                      电话: 021-66135120 <br/>`
          },
          {
            name: '勤工助学(本科生)',
            open: false,
            detail: ` 前往校本部A400学生服务中心8号窗口办理<br/>
                      窗口电话: 021-66134737 <br/>`
          }
        ],
        [
          {
            name: '南区场地预约',
            open: false,
            detail: `  请前往成就系统上预约`
          },
          {
            name: 'A400北区场地预约',
            open: false,
            detail: ` 至学生服务中心官网下载打印场地预约表，填写好后经负责教师签字盖章，交至A400前台。<br/>
                      前台电话:021-66131186<br/>
                      可打电话或直接前往A400前台进行预约`
          },
          {
            name: '校内活动场地审批',
            open: false,
            detail: ` 要在武保处备案，然后去团委审批，具体事宜可去北门武保处或团委询问`
          }
        ]
      ]
    };
  },
  computed: {
    navbarSliderClass () {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0';
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1';
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2';
      }
    }
  },
  methods: {
    tabClick (e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    },
    kindToggle (e) {
      var name = e.currentTarget.id,
        list = this.issues[this.activeIndex]

      for (var i = 0, len = list.length; i < len; ++i) {
        if (list[i].name == name) {
          list[i].open = !list[i].open;
        } else {
          list[i].open = false;
        }
        console.log(list[i].name)
        console.log(list[i].open)
      }
      this.issues[this.activeIndex] = list;
    }
  }
};
</script>

<style scoped>
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  text-align: left;
}
.weui-navbar__slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.weui-navbar__slider_2 {
  left: 29rpx;
  transform: translateX(500rpx);
}
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