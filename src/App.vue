<template>
  <Navbar/>
  <router-view/>
  <Footer/>
</template>

<style>
*{
  font-family: helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container{
  margin: 50px;
  min-height: 250px;
}

h1{
  text-align: center;
  font-size: 42px;
  color: #222;
  margin-bottom:30px;
}

</style>
<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  components:{
    Navbar,
    Footer
  }
}
</script>