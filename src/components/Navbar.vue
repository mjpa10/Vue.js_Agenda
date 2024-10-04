<template>
    <div>
    <nav>
      <div class="nav-container">
        <div class="logo">
          <h2>Agenda</h2>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-item">Home</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
nav {
  background-color: #333;
  border-bottom: 4px solid #444;
  padding: 10px 50px;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #fcba03;
}

h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
}

.nav-item {
  color: #fcba03;
  text-decoration: none;
  margin: 0 15px;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-item:hover {
  background-color: rgba(252, 186, 3, 0.2);
  color: #fff;
}

</style>