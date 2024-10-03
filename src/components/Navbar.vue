<template>
    <div>
     <nav>
        <router-link to="/" id="logo_url">
            
        </router-link>    
    <router-link to="/">Home</router-link> 
    <router-link to="/create">contatos</router-link>
  </nav>
</div>
</template>

<script>
export default {
}
</script>

<style  scoped>
nav{
    background-color: #222;
    border-bottom: 4px solid #111;
    padding: 15px 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

#logo_url{
    margin: auto;
    margin-left: 0;
}

#logo{
    width: 40px;
    height: 40px;
}

nav a{
    color: #fcBA03;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
}

nav a:hover{
    color: #fff;
}



</style>