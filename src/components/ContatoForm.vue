<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="contato-form" @submit="createContato">
                <div class="input-container">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" name="Nome" v-model="Nome" placeholder="Digite o nome">
                </div>
                <div class="input-container">
                    <label for="email">Email:</label>
                    <input type="text" id="email" name="email" v-model="Email" placeholder="Digite o Email">
                </div>
                <div class="input-container">
                    <label for="telefone">telefone:</label>
                    <input type="text" id="telefone" name="telefone" v-model="Telefone" placeholder="Digite o telefone">
                </div>
                <div class="input-buttons">
                    <input type="submit" class="submit_btn" value="Criar Contato">
                    <router-link to="/">
        <button class="Voltar_btn" type="button" value="Voltar">Voltar</button>
        </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Message from "./Message.vue"

name: 'ContatoForm'
export default {
    components: {
        Message
    },
    data() {
        return {
            Nome: null,
            Email: null,
            Telefone: null,
            msg: null
        }
    }, methods: {
        async getContatos() {
            try {
                const response = await fetch('/api/Contatos');
                const data = await response.json();
            } catch (error) {
                console.error('Error:', error);
            }
        },
        async createContato(c) {

            c.preventDefault();

            const data = {
                Email: this.Email,
                Nome: this.Nome,
                Telefone: this.Telefone
            }

            const req = await fetch('/api/Contatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (req.ok) {
                const res = await req.json();
                this.msg = `Contato ${res.nome} adicionado com Sucesso`

                setTimeout(() => {
                    this.msg = "";
                    this.$router.push('/')
                }, 2000);

                //limpa os campos
                this.Nome = ''
                this.Email = ''
                this.Telefone = ''
            }
            else {

                const errorData = await req.json();
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
                setTimeout(() => this.msg = "", 3500);

            }
        }

    }, mounted() {
        this.getContatos()
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

h2 {
    margin-bottom: 20px; /* Espaçamento abaixo do título */
    color: #28a745; /* Cor do título */
}

.input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 15px; /* Espaçamento entre os campos */
}
.input-buttons {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    margin-top: 20px; 
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
    justify-content: space-between; /* Distribui os botões */
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
    width: 100%; 
    margin-bottom: 10px; 
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
    background-color: #ffc107;
    color: #fff;
    border: 2px solid #ffc107;
}

.Voltar_btn:hover {
    background-color: transparent;
    color: #ffc107;
    border: 2px solid #ffc107; /* Adicionando borda ao passar o mouse */
}

</style>