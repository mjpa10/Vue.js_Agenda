<template>
  <div id="contatos-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="input-table">
        <input type="text" v-model="searchTerm" placeholder="Buscar por nome, e-mail ou telefone"
          @input="getContatos" />
      </div>
      <div id="contatos-table-heading">
        <div>nome</div>
        <div>Email</div>
        <div>Telefone</div>
        <div>Ações:</div>
      </div>
    </div>

    <div id="contatos-table-rows">
      <div class="contato-table-row" v-for="Contato in Contatos" :key="Contato.id">
        <div>{{ Contato.nome }}</div>
        <div>{{ Contato.email }}</div>
        <div>{{ Contato.telefone }}</div>
        <div>

          <router-link :to="`/update/${Contato.id}`">
            <button class="editar_btn">Editar</button>
          </router-link>

          <button class="delete_btn" @click="deleteContato(Contato.id, Contato.nome)">Excluir</button>
        </div>
      </div>
    </div>


    <div id="Pagination-div">
      <Pagination :totalRows="totalRows" :perPage="perPage" v-model:currentPage="currentPage" />
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
import Pagination from './Pagination.vue';

export default {
  name: 'Dashboard',
  components: {
    Message,
    Pagination,
  },
  data() {
    return {
      Contatos: [],
      msg: null,
      currentPage: 1,
      perPage: 6,
      totalRows: 0,
      searchTerm: ''
    };
  },
  methods: {
    async getContatos() {
      try {
        const req = await fetch(`/api/Contatos/Filtrar?PageNumber=${this.currentPage}&PageSize=${this.perPage}&searchTerm=${this.searchTerm}`);
        const data = await req.json();
        const pagination = req.headers.get('X-Pagination');

        if (pagination) {
          const paginationData = JSON.parse(pagination);
          this.totalRows = paginationData.TotalItemCount;
        }

        this.Contatos = data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteContato(id, nome) {
      const req = await fetch(`/api/Contatos/${id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
        },
      });

      if (req.ok) {
        this.getContatos();
        this.msg = `Contato ${nome} foi excluído da agenda.`;
        setTimeout(() => this.msg = "", 2000);
      } else {
        console.error('Erro ao deletar contato:', req.status, req.statusText);
      }
    },
  },
  watch: {
    currentPage() {
      this.getContatos();
    },
  },
  mounted() {
    this.getContatos();
  },
};
</script>

<style scoped>
#contatos-table {
  max-width: 1200px;
  margin: 0 auto;
}

#contatos-table-heading,
#contatos-table-rows,
.contato-table-row {
  display: flex;
  flex-wrap: wrap;
}

#contatos-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#contatos-table-heading div,
.contato-table-row div {
  width: 25%;
  /* Ajuste conforme necessário */
  overflow-wrap: break-word;
  /* Para quebrar palavras longas */
  padding: 12px;
  /* Aumenta o padding interno das células */
}

.contato-table-row {
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  font-size: 16px;
}

.editar_btn,
.delete_btn {
  margin-left: 5px;
  /* Adiciona um pequeno espaçamento entre os botões */
  padding: 5px 10px;
  background-color: #007bff;
  /* Cor do botão de editar */
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid;
  transition: .5s;
}

.delete_btn {
  background-color: #dc3545;
}

.editar_btn:hover,
.delete_btn:hover {
  background: transparent;
  color: #222;
}

#Pagination-div {
  margin-top: 20px;
  text-align: center;
  position: relative;
}
</style>