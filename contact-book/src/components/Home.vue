<template>
  <div>
    <Navbar :contactBook="contactBook" />

    <div class="container mx-auto min-h-container">
      <div class="flex flex-wrap overflow-hidden">
        <div
          class="flex flex-wrap items-center justify-center w-full overflow-hidden min-h-container"
        >
          <div v-if="contactBook.length < 1">
            <img
              :src="require('@/assets/img/ic-book.svg')"
              class="mb-2 w-100"
            />
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

          <div v-if="contactBook.length > 0">
            <!-- <template #cell(avatar)="data">
                <avatar :username="data.item.avatar"></avatar>
              </template>
              <template #cell(name)="data">
                {{ data.item.name }}
              </template>
              <template #cell(email)="data">
                {{ data.item.email }}
              </template>
              <template #cell(phone)="data">
                {{ data.item.phone }}
              </template> -->
          </div>

          <CreateContact />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import CreateContact from './CreateContact'
// import Avatar from 'vue-avatar'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      fields: [
        {
          key: 'avatar',
          label: '',
          tdClass: 'avatar-td',
          thClass: 'avatar-td',
        },
        {
          key: 'name',
          label: 'Contatos',
        },
        { key: 'email', label: 'E-mail' },
        { key: 'phone', label: 'Telefone' },
      ],
    }
  },
  components: {
    Navbar,
    CreateContact,
    // Avatar,
  },
  computed: {
    ...mapState(['contactBook', 'showModal']),
  },
  methods: {
    createNewContact() {
      this.alterShowModal()
    },
    ...mapMutations(['alterShowModal']),
  },
}
</script>

<style>
.avatar-td {
  max-width: 10px;
}
</style>
