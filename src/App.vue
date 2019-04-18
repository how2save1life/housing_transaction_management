<template>
  <div id="app" >
    <el-container class="leftContainer">
      <el-aside width="154px" >
        <router-view name="left" v-if="isRouterAlive"></router-view>
      </el-aside>
      <el-container class="mainContainer">
        <el-header>
          <router-view name="header"></router-view>
        </el-header>
        <el-main>
          <router-view name="main" v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: 'App',
    provide() { // 注册一个方法
      return {
        buyer: this.buyer
      }
    },
    data() {
      return {
        isRouterAlive: true,
        clientHeight: '',
      }

    },
  /*  mounted() { // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },

    watch: { // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },*/

    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
          console.log('reload')
        })
      },
   /*   changeFixed(clientHeight) { //动态修改样式
        console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight + 'px';

      },*/
      /*    created() {
            //在页面加载时读取localStorage里的状态信息
            localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("userMsg"))));

            //在页面刷新时将vuex里的信息保存到localStorage里
            window.addEventListener("beforeunload", () => {
              localStorage.setItem("userMsg", JSON.stringify(this.$store.state))
            })
          },*/
    }
  }
</script>

<style>
  /*#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

  }*/
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .leftContainer {
    height: 100%;
  }

  .el-header {
    background-color: #4272AE;
padding-left: 0;
  }

  .mainContainer {
    display: flex;
    /*min-height: 575px;*/

  }

  .el-aside {
    background-color: #315580;
    color: navy;
    width: 154px;
    min-height: 632px;
  }

  .el-main {
    background-color: #ffffff;
    flex: 15;
  }
</style>
