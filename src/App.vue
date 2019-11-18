<template lang="pug">
#app
  #nav
    el-tabs(v-model="state.activeName" @tab-click="handleClick")
      el-tab-pane(label="Class" name="/")
      el-tab-pane(label="Teacher" name="/teacher")
      el-tab-pane(label="Student" name="/student")
      el-tab-pane(label="Point" name="/point")
  router-view
</template>
<script lang="ts">
import {reactive, onMounted} from '@vue/composition-api'

export default {
  setup(props: any, {root}: any) {
    const state = reactive({
      activeName: location.pathname,
    })
    // onMounted(() => {
    //   setTimeout(() => {
    //     state.activeName = root.$route.path // root.$route.path 의 초기화 시점이 왜 이리 늦지..
    //   }, 50)
    // })
    return {
      state,
      handleClick(tab: any, event: any) {
        // console.log(tab, event)
        root.$router.push(tab.name)
      },
    }
  },
}
</script>

<style lang="stylus" >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: center;

  .el-tabs__item {
    padding: 0 10px;
    height: 35px;
  }

  a {
    margin: 0 5px;
    font-weight: bold;
    color: #2c3e50;
  }

  a.router-link-exact-active {
    color: #42b983;
  }
}

#app {
  .el-card {
    // border: 5px solid #f1f1f1;
    .el-card__header {
      padding: 10px 10px;
      background-color: #f9f9f9;
    }

    .el-card__body {
      padding: 10px 10px;
    }
  }
}
</style>
