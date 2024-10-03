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
                <div class="input-container">
                    <input type="submit" class="submit_btn" value="Criar Contato">
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
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    position: sticky;
    top: 0;
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
    margin: 0 auto;
    transition: .5s;
}

.submit_btn:hover {
    background: transparent;
    color: #222;
}
</style>