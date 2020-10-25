<template>
  <div
    class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal"
    v-if="showModal"
  >
    <div
      class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    ></div>

    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto bg-white shadow-lg rounded-16px modal-container md:max-w-md"
    >
      <div class="px-6 py-4 text-left modal-content">
        <!--Title-->
        <div class="flex items-center justify-between border-b">
          <p class="text-16 text-dark" v-if="op === 0">Criar novo contato</p>
          <p class="text-16 text-dark" v-if="op === 1">Editar contato</p>
          <p class="text-16 text-dark" v-if="op === 2">Excluir contato</p>
        </div>

        <!--Body-->
        <div v-if="op === 0 || op === 1" class="mb-3 h-modal-create">
          <div class="mt-4 mb-2">
            <label class="block mb-2 text-dark text-14" for="username">
              Nome
            </label>
            <input
              class="w-full px-3 py-2 leading-tight border rounded text-14 text-dark"
              id="name"
              type="text"
              v-model="newContact.name"
            />
          </div>
          <div class="mb-1">
            <label class="block mb-2 text-dark text-14" for="email">
              E-mail
            </label>
            <input
              class="w-full px-3 py-2 mb-3 leading-tight border rounded text-14 text-dark"
              id="email"
              type="email"
              v-model="newContact.email"
            />
          </div>
          <div class="mb-4">
            <label class="block mb-2 text-dark text-14" for="phone">
              Telefone
            </label>
            <input
              class="px-3 py-2 mb-3 leading-tight border rounded w-135px text-14 text-dark"
              id="phone"
              type="tel"
              @keyup="formatPhoneNumber(newContact.phone)"
              maxlength="15"
              v-model="newContact.phone"
            />
          </div>
        </div>
        <div v-if="op === 2" class="h-modal-delete">
          <p class="pt-10 font-normal text-14 text-dark">
            Deseja realmente excluir o contato?
          </p>
        </div>

        <!--Footer-->
        <div class="flex justify-end pt-2 border-t">
          <button
            class="z-50 inline-flex items-center px-4 py-2 font-bold text-white bg-white rounded-full"
            @click="closeModal"
          >
            <span class="font-medium text-salmon text-14">Cancelar</span>
          </button>
          <button
            v-if="op === 0"
            :class="{
              'z-50 inline-flex items-center px-4 py-2 font-bold text-white rounded-full bg-salmon opacity-50 cursor-not-allowed pointer-events-none': disabledButton,
              'z-50 inline-flex items-center px-4 py-2 font-bold text-white rounded-full bg-salmon': !disabledButton,
            }"
            @click="saveContact"
          >
            <span class="font-medium text-white text-14">Salvar</span>
          </button>
          <button
            v-if="op === 1"
            :class="{
              'z-50 inline-flex items-center px-4 py-2 font-bold text-white rounded-full bg-salmon opacity-50 cursor-not-allowed pointer-events-none': disabledButton,
              'z-50 inline-flex items-center px-4 py-2 font-bold text-white rounded-full bg-salmon': !disabledButton,
            }"
            @click="editContact"
          >
            <span class="font-medium text-white text-14">Salvar</span>
          </button>
          <button
            v-if="op === 2"
            class="z-50 inline-flex items-center px-4 py-2 font-bold text-white rounded-full bg-salmon"
            @click="deleteContact"
          >
            <span class="font-medium text-white text-14">Excluir</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      newContact: {
        name: '',
        email: '',
        phone: '',
      },
    }
  },
  props: {
    id: {
      type: Number,
    },
  },
  watch: {
    showModal() {
      if (this.showModal) {
        if (this.op === 1) {
          this.newContact = this.contactBook[this.id]
        } else {
          this.newContact.name = ''
          this.newContact.email = ''
          this.newContact.phone = ''
        }
      }
    },
  },
  computed: {
    ...mapState(['contactBook', 'showModal', 'op']),
    disabledButton() {
      if (
        (this.op === 0 || this.op === 1) &&
        this.newContact.name.length === 0 &&
        this.newContact.email.length === 0 &&
        this.newContact.phone.length === 0
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    ...mapMutations(['createContact', 'refresh', 'alterShowModal', 'alterOp']),
    async saveContact() {
      let contactToSave = { name: '', email: '', phone: '', avatar: '' }
      contactToSave.avatar = this.newContact.name.split(' ')[0]
      contactToSave.name = this.newContact.name
      contactToSave.email = this.newContact.email
      contactToSave.phone = this.newContact.phone
      this.createContact(contactToSave)
      this.contactBook.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      this.refresh(this.contactBook)
      this.closeModal()
    },
    async editContact() {
      let contactToSave = { name: '', email: '', phone: '', avatar: '' }
      contactToSave.avatar = this.newContact.name.split(' ')[0]
      contactToSave.name = this.newContact.name
      contactToSave.email = this.newContact.email
      contactToSave.phone = this.newContact.phone
      this.contactBook[this.id] = contactToSave
      this.contactBook.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      this.refresh(this.contactBook)
      this.closeModal()
    },
    async deleteContact() {
      this.contactBook.splice(this.id, 1)
      this.contactBook.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      this.refresh(this.contactBook)
      this.closeModal()
    },
    closeModal() {
      this.alterOp(null)
      this.alterShowModal()
    },
    formatPhoneNumber(str) {
      let cleaned = ('' + str).replace(/\D/g, '')

      let match =
        cleaned.match(/^(\d{2})(\d{5})(\d{4})$/) ||
        cleaned.match(/^(\d{2})(\d{4})(\d{4})$/)

      this.newContact.phone = '(' + match[1] + ') ' + match[2] + '-' + match[3]
    },
  },
}
</script>

<style scoped>
.button-save,
.button-save:hover,
.button-save:active,
.button-save:focus {
  background-color: salmon !important;
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px rgba(255, 255, 255, 0.16);
}
.button-save:disabled {
  opacity: 0.32;
}
.button-cancel,
.button-cancel:hover,
.button-cancel:active,
.button-cancel:focus {
  color: salmon !important;
  background-color: transparent !important;
  border-radius: 16px;
  box-shadow: 0 2px 4px 0 transparent !important;
  border: solid 1px transparent !important;
}
.align-end {
  display: flex;
  justify-content: flex-end;
}
</style>

<style>
.form-group > label {
  margin-bottom: 0 !important;
}
</style>
