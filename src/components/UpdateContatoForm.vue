<template>
    <div>
       <Message :msg="msg" v-show="msg"/>  
      <form id="contato-form" @submit="updateContato">      
        <div class="input-container">
          <label for="nome">Nome:</label>
          <input id="nome" name="Nome" v-model="Contato.nome" placeholder="Digite o nome" />
        </div>
        <div class="input-container">
          <label for="email">Email:</label>
          <input id="email" v-model="Contato.email" placeholder="Digite o Email" />
        </div>
        <div class="input-container">
          <label for="telefone">Telefone:</label>
          <input id="telefone" v-model="Contato.telefone" placeholder="Digite o telefone" />
        </div>
        <div class="input-buttons">
        <input class="submit_btn" type="submit" value="Salvar Alterações">
        <router-link to="/">
        <button class="Voltar_btn" type="button" value="Voltar">Voltar</button>
        </router-link>
       </div>
      </form>
    </div>
  </template>
  
  <script>
  import Message from './Message.vue';
  export default {
    components:{
      Message
    },

    name:'UpdateForm',

    data() {
      return {
        Contato: {
          nome: '',
          email: '',
          telefone: ''
        },
        msg: null
      };
    },
    mounted() {
      this.getContatoByID(); // Carregar os dados do contato ao montar o componente
    },
    methods: {
      async getContatoByID() {

        const contatoId = this.$route.params.id; // Obtém o ID da rota

        const res = await fetch(`/api/Contatos/${contatoId}`);
        
        if (res.ok) {
        const data = await res.json();      
        this.Contato = data;
        
        } else {
          alert('Erro ao carregar contato.');
        }
      },

      async updateContato(e) {

        e.preventDefault(); // Previne o comportamento padrão do formulário

        const contatoId = this.$route.params.id; // Obtém o ID novamente
  
        const res = await fetch(`/api/Contatos/${contatoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.Contato) // Envia os dados atualizados
        });
  
        if (res.ok) {
          const data = await res.json();

            this.msg = `Contato ${data.nome} atualizado com sucesso!`;

            setTimeout(() => {this.msg= "";
            this.$router.push('/')},2000);

        } else {
          const errorData = await res.json();
          console.log(errorData)

          // Acessa as mensagens de erro diretamente
          const nomeErrors = errorData.errors.Nome ? errorData.errors.Nome : '';
    const emailErrors = errorData.errors.Email ? errorData.errors.Email : '';
    const telefoneErrors = errorData.errors.Telefone ? errorData.errors.Telefone : '';

    // Formata a mensagem considerando que pode ser uma string
    const formattedNomeErrors = Array.isArray(nomeErrors) ? nomeErrors.join(', ') : nomeErrors;
    const formattedEmailErrors = Array.isArray(emailErrors) ? emailErrors.join(', ') : emailErrors;
    const formattedTelefoneErrors = Array.isArray(telefoneErrors) ? telefoneErrors.join(', ') : telefoneErrors;

    // Monta a mensagem final
    this.msg = `Erros: ${formattedNomeErrors} ${formattedEmailErrors} ${formattedTelefoneErrors}`;

            setTimeout(() => this.msg= "",3500);
        }
      }
    }
  }
  </script>
  
  <style scoped>
 #contato-form {
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 600px;
    margin: 40px auto; /* Adicionando margem superior para espaçamento */
    position: relative;
}

.input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px; /* Espaçamento entre os campos */
}

label {
    font-weight: bold;
    color: #222;
    margin-bottom: 5px; /* Espaçamento abaixo do label */
}

input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    transition: border-color 0.3s;
}

input:focus {
    border-color: #28a745; /* Borda verde ao focar */
    outline: none; /* Remove o contorno padrão */
}

.input-buttons {
    display: flex;
    flex-direction: column; /* Alinha os botões verticalmente */
    align-items: center; /* Centraliza os botões */
    margin-top: 20px; /* Espaçamento superior */
}

.submit_btn, .Voltar_btn {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    font-weight: bold;
    font-size: 16px;
    width: 100%; /* Faz os botões ocuparem 100% da largura */
    margin-bottom: 10px; /* Espaçamento entre os botões */
}

.submit_btn {
    border: 2px solid #28a745;
    background-color: #28a745;
    color: #fff;
}

.submit_btn:hover {
    background-color: transparent;
    color: #28a745;
    border: 2px solid #28a745; /* Adicionando borda ao passar o mouse */
}

.Voltar_btn {
    border: 2px solid #ffc107;
    background-color: #ffc107;
    color: #fff;
}

.Voltar_btn:hover {
    background-color: transparent;
    color: #ffc107;
    border: 2px solid #ffc107; /* Adicionando borda ao passar o mouse */
}

  </style>
  