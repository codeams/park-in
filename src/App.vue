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
    background-color: #0c1531;
}
.btn {
  border: none;
  border: none;
  border-radius: 16px;
  padding: 10px 35px;
}
.btn-primary {
  background-color: #196eef;
}
input{
  border-radius: 10px !important;
  /* background-color: transparent !important; */
  padding: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms, transform 500ms;
}
.fade-enter, .fade-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
