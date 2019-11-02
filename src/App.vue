<template lang="pug">
#app
  #nav
    router-link(to="/") Class
    router-link(to="/teachers") Teacher
    router-link(to="/students") Student
    router-link(to="/points") Point
  router-view
</template>

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
  margin-bottom: 20px;

  a {
    margin: 0 5px;
    font-weight: bold;
    color: #2c3e50;
  }

  a.router-link-exact-active {
    color: #42b983;
  }
}
</style>
