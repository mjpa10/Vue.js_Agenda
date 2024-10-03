<template>
    <nav aria-label="Pagination">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
            Anterior
          </button>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            Próxima
          </button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script> 
  name:'Pagination'
  export default { 
    props: {
      totalRows: {
        type: Number,
        required: true,
      },
      perPage: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalRows / this.perPage);
      }
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.$emit('update:currentPage', page);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    justify-content: center;
  }
  </style>
  