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
        
        <input class="submit_btn" type="submit" value="Salvar Alterações">
        <router-link to="/">
        <button class="Voltar_btn" type="button" value="Voltar">Voltar</button>
        </router-link>
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
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 5px solid #fcba03;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
}

.submit_btn {
  background-color: #28a745;
  color: #fff;
  font-weight: bold;
  border: 2px solid;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: .5s;
}

.submit_btn:hover {
  background: transparent;
  color: #222;
}

.Voltar_btn {
  background-color: #ffc107;
  color: #fff;
  font-weight: bold;
  border: 2px solid;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  transition: .5s;
}

.Voltar_btn:hover {
  background: transparent;
  color: #222;
}

.Message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
}

  </style>
  