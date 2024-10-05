<template>
  <div id="contatos-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      
      <div id="input-table" class="input-container">
        <input 
          type="text"
          v-model="searchTerm"
          placeholder="Buscar por nome, e-mail ou telefone"
          @input="getContatos" 
          class="search-input"
          />
          <router-link to="/create">
            <button class="add_btn">Adicionar Contato </button>
          </router-link>
      </div>
      <div id="contatos-table-heading">
        <div>nome</div>
        <div>Email</div>
        <div>Telefone</div>
        <div>Ações:</div>
      </div>
    </div>

    <div id="contatos-table-rows">
      <div 
      class="contato-table-row"
       v-for="Contato in Contatos" 
       :key="Contato.id"
       >
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
    </div>


    <div id="Pagination-div">
      <Pagination 
      :totalRows="totalRows" 
      :perPage="perPage" 
      v-model:currentPage="currentPage"
       />
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
      perPage: 5,
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
.input-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
  margin-bottom: 20px;
  margin-top: 20px;
}
.search-input {
  width: 80%; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px; 
  margin-right: 10px; 
  transition: border 0.3s; /* Transição suave da borda */
  box-sizing: border-box;
  height: 40px; 
}
.search-input:focus {
  border-color: #007bff; /* Cor da borda ao focar */
  outline: none; /* Remove contorno padrão */
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
  overflow-wrap: break-word; /* Para quebrar palavras longas */
  padding: 12px;  
}

.contato-table-row {
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  font-size: 16px;
  transition: background 0.3s;
}

.contato-table-row:hover {
  background-color: #f1f1f1; 
}

.editar_btn,
.delete_btn,
.add_btn  {
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  transition: background 0.3s, transform 0.3s;
  color: white; 
  justify-content: center; 
  align-items: center; 
  font-size: 16px; 
}
.add_btn {
  padding: 10px 15px; 
  background-color: #28a745;  
  border: 2px solid #28a745; 
  }

.editar_btn {
  background-color: #007bff; 
  border: 2px solid #007bff; 
}

.delete_btn {
  background-color: #dc3545; 
  border: 0.5px solid #dc3545; 
}
.delete_btn:hover{
  background-color: transparent;
  color: #dc3545;
  border: 0.5px solid #dc3545; 
}

.editar_btn:hover{
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff; 
}

.add_btn:hover {
  background-color: transparent;
  color: #28a745;
  border: 2px solid #28a745; 
}

#Pagination-div {
  margin-top: 20px;
  text-align: center;
  position: relative;
}


</style>