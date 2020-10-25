<template>
  <nav class="z-10 w-full p-2 pb-4 mt-0 mb-2 bg-transparent">
    <div class="flex flex-wrap items-center justify-center w-full">
      <div class="flex justify-start mr-auto font-extrabold text-white w-148px">
        <img :src="require('@/assets/img/ic-logo.svg')" />
      </div>
      <div
        class="flex flex-wrap items-center justify-center overflow-hidden w-144px"
      >
        <button
          v-if="contactBook.length > 0"
          class="inline-flex items-center px-4 py-2 font-bold text-white rounded-full bg-light-yellowish-green"
          @click="createNewContact"
        >
          <img :src="require('@/assets/img/ic-plus.svg')" class="mr-1" />
          <span class="font-medium text-salmon text-14">Criar Contato</span>
        </button>
      </div>
      <div
        class="flex items-center content-center justify-end pt-2 overflow-hidden pl-32px w-search"
      >
        <input
          v-model="newSearchValue"
          type="search"
          name="search"
          placeholder="Buscar..."
          class="w-full h-8 px-5 text-black rounded bg-pale-lilac text-16 focus:outline-none"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      newSearchValue: '',
    }
  },
  computed: {
    ...mapState(['contactBook', 'showModal', 'op']),
  },
  methods: {
    ...mapMutations(['alterShowModal', 'alterOp']),
    createNewContact() {
      this.alterOp(0)
      this.alterShowModal()
    },
  },
}
</script>

<style>
.search-input {
  background-color: #e4e7f4 !important;
  width: 65vw !important;
}
</style>
