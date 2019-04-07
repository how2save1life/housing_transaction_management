<template>
  <div id="app">
    <el-container>
      <el-header>
        <router-view name="header"></router-view>
      </el-header>
      <el-container class="mainContainer">
        <el-aside>
          <router-view name="left"></router-view>
        </el-aside>
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
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }

    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
          console.log('reload')
        })
      }
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
  }

  .el-header {
    background-color: #456A8F;

  }

  .mainContainer {
    display: flex;
    min-height: 800px;
  }

  .el-aside {
    background-color: #456A8F;
    color: navy;
    flex: 2;

  }

  .el-main {
    background-color: #ffffff;
    flex: 15;
  }
</style>
