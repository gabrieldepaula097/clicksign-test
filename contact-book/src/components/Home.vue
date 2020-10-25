<template>
  <div>
    <Navbar />
    <div v-if="contactBook.length > 0" class="w-full">
      <div class="flex flex-wrap items-center justify-center w-full p-2">
        <table
          class="w-full p-2 border-2 border-collapse xs:auto md:table-fixed rounded-4px border-table-border"
        >
          <thead>
            <tr class="text-bluey-grey">
              <th class="px-2 py-2 text-left border-b-2 w-60px"></th>
              <th class="px-2 py-2 text-left border-b-2">Nome</th>
              <th class="px-2 py-2 text-left border-b-2">E-mail</th>
              <th class="px-2 py-2 text-left border-b-2">Telefone</th>
              <th class="px-2 py-2 border-b-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(contact, index) in contactBook"
              :key="index"
              class="cursor-default hover:bg-very-light-pink text-dark"
            >
              <td class="px-2 py-2 border-b-2 w-60px">
                <avatar :username="contact.avatar" :size="40"></avatar>
              </td>
              <td class="px-2 py-2 text-left border-b-2">
                {{ contact.name }}
              </td>
              <td class="px-2 py-2 text-left border-b-2">
                {{ contact.email }}
              </td>
              <td class="px-2 py-2 text-left border-b-2">
                {{ contact.phone }}
              </td>
              <td class="px-2 py-2 border-b-2">
                <div class="flex items-center justify-end">
                  <button @click="() => editContact(index)">
                    <img
                      :src="require('@/assets/img/ic-edit.svg')"
                      class="mr-4"
                    /></button
                  ><button @click="() => deleteContact(index)">
                    <img
                      :src="require('@/assets/img/ic-delete.svg')"
                      class="mr-2"
                    />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="container mx-auto min-h-container"
      v-if="contactBook.length < 1"
    >
      <div class="flex flex-wrap overflow-hidden">
        <div
          class="flex flex-col flex-wrap items-center justify-center w-full overflow-hidden min-h-container"
        >
          <img :src="require('@/assets/img/ic-book.svg')" class="mb-2 w-100" />
          <p class="mb-2 font-normal text-16 text-dark">
            Nenhum contato foi criado ainda.
          </p>
          <button
            class="inline-flex items-center px-6 py-2 font-bold text-white rounded-full bg-light-yellowish-green"
            @click="createNewContact"
          >
            <img :src="require('@/assets/img/ic-plus.svg')" class="mr-1" />
            <span class="font-medium text-salmon text-14">Criar Contato</span>
          </button>
        </div>
      </div>
    </div>
    <Modal :id.sync="id" />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Modal from './Modal'
import Avatar from 'vue-avatar'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      id: null,
    }
  },
  components: {
    Navbar,
    Modal,
    Avatar,
  },
  computed: {
    ...mapState(['contactBook', 'showModal', 'op']),
  },
  methods: {
    createNewContact() {
      this.alterOp(0)
      this.alterShowModal()
    },
    editContact(index) {
      this.alterOp(1)
      this.id = index
      this.alterShowModal()
    },
    deleteContact(index) {
      this.alterOp(2)
      this.id = index
      this.alterShowModal()
    },

    ...mapMutations(['alterShowModal', 'alterOp']),
  },
}
</script>

<style>
button:focus {
  outline: none !important;
}
</style>
