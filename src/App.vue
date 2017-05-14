<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
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

body
{
    font-family: 'Poppins', sans-serif;

    position: relative;

    height: 100%;

    color: white;
    background: rgb(36, 43, 66);
    /* background-image: url('~assets/background-blue.png'); */
    background-color: #222;
}
</style>
