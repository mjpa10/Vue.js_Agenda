<template>
  <Navbar/>
  <router-view/>
  <Footer/>
</template>

<style>
* {
  font-family: Helvetica, Arial, sans-serif; /* Adicionando alternativas de fonte */
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Faz o contêiner ocupar a altura total da viewport */
}

.main-container{
  flex: 1;
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