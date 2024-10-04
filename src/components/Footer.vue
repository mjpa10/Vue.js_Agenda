<template>
  <footer id="footer">
    <div class="footer-content">
      <p>Agenda &copy; 2024</p>
      <div class="footer-links">
        <a href="/">Sobre</a>
        <a href="/">Privacidade</a>
        <a href="/">Contato</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
  height: auto; /* Permitir que o footer ajuste sua altura */
  background-color: #222;
  border-top: 4px solid #111;
  color: #FCBA03;
  display: flex;
  flex-direction: column; /* Mudar para coluna para melhor layout */
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px; /* Adiciona um pouco de espaço */
}

.footer-content {
  text-align: center; /* Centraliza o conteúdo */
}

.footer-links {
  margin-top: 10px; /* Espaço acima dos links */
}

.footer-links a {
  color: #FCBA03;
  text-decoration: none;
  margin: 0 15px; /* Espaço entre os links */
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #fff; /* Muda a cor ao passar o mouse */
}
</style>
