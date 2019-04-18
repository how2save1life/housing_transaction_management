<template>
  <div class="leftBox">
    <el-col>
      <div class="left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#315580"
          text-color="#fff"
          active-text-color="#ffd04b"
          :default-openeds="['4']">
          <!--头像 信息-->
          <el-menu-item style="text-align: center;height: 154px;padding: 0">
            <el-menu-item style="text-align: center;height: 100px;padding-top: 10%">
              <img :src="url" class="userHeadPic"
                   :onerror="headpic">
            </el-menu-item>
            <el-menu-item style="text-align:left" >
              <i class="fa fa-user-circle fa-2x"></i>
              <span v-if="user!=='visitor'" slot="title" style="text-align: right;font-family: 微软雅黑;font-size: 11pt">{{userId}}</span>
              <span v-else slot="title" style="text-align: right;font-family: 微软雅黑;font-size: 11pt">游客在线</span>

            </el-menu-item>
          </el-menu-item>

          <el-menu-item index="1" @click="showdata">
            <i class="el-icon-news"></i>
            <span slot="title">数据一览</span>
          </el-menu-item>
          <el-menu-item v-if="user!=='visitor'" index="2" @click="showuser">
            <i class="el-icon-info"></i>
            <span slot="title">我的信息</span>
          </el-menu-item>
          <el-menu-item v-if="user==='Owner'||user==='visitor'" index="3" @click="savehouse">
            <i class="el-icon-circle-plus"></i>
            <span slot="title">我要卖房</span>
          </el-menu-item>
          <el-submenu v-if="user==='Owner'" index="4">
            <template slot="title">
              <i class="el-icon-zoom-in"></i>
              <span>查看房屋</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="showhouse">所有房屋</el-menu-item>
              <el-menu-item index="1-2" @click="showmyhouse">我的房屋</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else index="5" @click="showhouse">
            <i class="el-icon-zoom-in"></i>
            <span slot="title">查看房屋</span>
          </el-menu-item>
          <el-menu-item v-if="user==='Buyer'" index="6" @click="showcollect">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item v-if="user!=='visitor'" index="7" @click="showdeal">
            <i class="el-icon-goods"></i>
            <span slot="title" v-if="user==='Agency'">我的业务</span>
            <span slot="title" v-else>我的交易</span>

          </el-menu-item>

          <el-menu-item index="8" @click="showagency">
            <i class="el-icon-document"></i>
            <span slot="title">查看中介</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <!--   <el-col v-else-if="user==='Buyer'">
         <div class="left">
           <el-menu
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#315580"
             text-color="#fff"
             active-text-color="#ffd04b">
             <el-menu-item style="text-align: center;height: 154px;padding: 0">
               <el-menu-item style="text-align: center;height: 100px;padding-top: 10%">
                 <img :src="url" class="userHeadPic"
                      :onerror="headpic">

               </el-menu-item>

               <i class="fa fa-user-circle fa-2x"></i>
               <span slot="title" style="text-align: right;font-family: 微软雅黑;font-size: 14pt">房主</span>


             </el-menu-item>
             <el-menu-item style="text-align: center">
               <i class="fa fa-user-circle fa-2x"></i>
               <span slot="title" style="text-align: right;font-family: 微软雅黑;font-size: 14pt">买家</span>
             </el-menu-item>
             <el-menu-item index="1" @click="gohome">
               <i class="el-icon-back"></i>
               <span slot="title">回到主页</span>
             </el-menu-item>
             <el-menu-item index="2" @click="showuser">
               <i class="el-icon-info"></i>
               <span slot="title">我的信息</span>
             </el-menu-item>

             <el-menu-item index="3" @click="showhouse">
               <i class="el-icon-zoom-in"></i>
               <span slot="title">查看房屋</span>
             </el-menu-item>
             <el-menu-item index="4" @click="showcollect">
               <i class="el-icon-star-on"></i>
               <span slot="title">我的收藏</span>
             </el-menu-item>
             <el-menu-item index="5" @click="showdeal">
               <i class="el-icon-goods"></i>
               <span slot="title">我的交易</span>
             </el-menu-item>
             <el-menu-item index="6" @click="showagency">
               <i class="el-icon-document"></i>
               <span slot="title">查看中介</span>
             </el-menu-item>

           </el-menu>
         </div>
       </el-col>
       <el-col v-else-if="user==='Agency'">

         <div class="left">

           <el-menu
             default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#315580"
             text-color="#fff"
             active-text-color="#ffd04b">
             <el-menu-item style="text-align: center;height: 154px;padding: 0">
               <el-menu-item style="text-align: center;height: 100px;padding-top: 10%">
                 <img :src="url" class="userHeadPic"
                      :onerror="headpic">

               </el-menu-item>

               <i class="fa fa-user-circle fa-2x"></i>
               <span slot="title" style="text-align: right;font-family: 微软雅黑;font-size: 14pt">房主</span>


             </el-menu-item>
             <el-menu-item style="text-align: center">
               <i class="fa fa-user-circle fa-2x"></i>
               <span slot="title" style="text-align: right;font-family: 微软雅黑;font-size: 14pt">中介</span>
             </el-menu-item>
             <el-menu-item index="1" @click="gohome">
               <i class="el-icon-back"></i>
               <span slot="title">回到主页</span>
             </el-menu-item>
             <el-menu-item index="2" @click="showuser">
               <i class="el-icon-info"></i>
               <span slot="title">我的信息</span>
             </el-menu-item>

             <el-menu-item index="3" @click="showhouse">
               <i class="el-icon-zoom-in"></i>
               <span slot="title">查看房屋</span>
             </el-menu-item>
             <el-menu-item index="4" @click="showdeal">
               <i class="el-icon-goods"></i>
               <span slot="title">我的业务</span>
             </el-menu-item>
             <el-menu-item index="5" @click="showagency">
               <i class="el-icon-document"></i>
               <span slot="title">查看中介</span>
             </el-menu-item>

           </el-menu>
         </div>
       </el-col>-->


  </div>
</template>

<script>
  export default {
    name: "LeftBox",
    data() {
      return {
        user: this.$store.getters.getRoles,
        userId: this.$store.getters.getUserId,
        url: '',
        //head:'this.src="' + require('../../assets/images/moren.png') + '"'
        //url: '../static' + this.$store.getters.getUserHead
        headpic: 'this.src="../../static/pics/head/head.jpg"',
      };
    },
    mounted() {
      if (this.$store.getters.getRoles !== 'visitor') {
        this.$axios.get("http://localhost:8080/" + this.$store.getters.getRoles + /findMe/ + this.$store.getters.getUserId).then(response => {
          console.log(response.data)
          switch (this.$store.getters.getRoles) {
            case"Agency":
              this.url = '../static' + response.data.agencyHead
              //this.$store.commit('storeUserHead', response.data.agencyHead);////修改vuex中用户头像
              //console.log(this.$store.getters.getUserHead)
              break;
            case "Buyer":
              this.url = '../static' + response.data.buyerHead
              //this.$store.commit('storeUserHead', response.data.buyerHead);////修改vuex中用户头像
              //console.log(this.$store.getters.getUserHead)
              break;
            case "Owner":
              this.url = '../static' + response.data.ownerHead
              //this.$store.commit('storeUserHead', response.data.ownerHead);////修改vuex中用户头像
              //console.log(this.$store.getters.getUserHead)
              break;
          }
        })
      }
    },
    methods: {
      imageUrl() {
        console.log(this.$store.getters.getRoles, this.$store.getters.getUserId, his.$store.getters.getUserHead)
        if (this.$store.getters.getUserHead === '' || this.$store.getters.getUserHead === null) {
          // return '../../static/pics/head/head.jpg'
        }
        else {
          return '../static' + this.$store.getters.getUserHead
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      showdata() {
        this.$router.push('/data')
      },
      showhouse() {
        this.$router.push('/showhouse')
      },
      showmyhouse() {
        this.$router.push('/myhouse')
      },
      savehouse() {
        this.$router.push('/savehouse')
      },
      showuser() {
        this.$router.push('/me')
      },
      showcollect() {
        this.$router.push('/mycollect')
      },
      showagency() {
        this.$router.push('/showagency')
      },
      showdeal() {
        this.$router.push('/mydeal')
      }
    }
  };
</script>

<style>
  .userHeadPic {
    height: 50px;
  }

  .el-menu {
    /* //margin: auto;*/
  }

  .el-menu-item {
    width: 154px;
  }

  .el-submenu.is-opened {
    width: 154px;
  }

  .el-menu-item-group {
    padding: 0;
    width: 154px;
  }

  .el-submenu .el-menu-item {
    padding: 0;
    width: 154px;
    min-width: 100px;
  }

  .el-submenu {
    margin: auto;
    padding: 0;
    width: 154px;
  }

  .userHeadPic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border-style: dotted;
    border-width: 1px;
    border-color: white;
    padding: 1%;
  }
</style>

