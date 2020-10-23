import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contactBook: [],
    showModal: false,
  },
  mutations: {
    createContact(state, newContact) {
      state.contactBook.push(newContact)
    },
    editContact(state, contact) {
      state.name = contact.name
      state.email = contact.email
      state.phone = contact.phone
    },
    alterShowModal(state) {
      state.showModal = !state.showModal
    },
  },
  getters: {
    contactBook: (state) => {
      return state.contactBook
    },
    contactByName: (state) => (name) => {
      return state.contactBook.find((contact) => contact.name === name)
    },
    contactByEmail: (state) => (email) => {
      return state.contactBook.find((contact) => contact.email === email)
    },
    contactByPhone: (state) => (phone) => {
      return state.contactBook.find((contact) => contact.phone === phone)
    },
    showModal: (state) => {
      return state.showModal
    },
  },
  plugins: [createPersistedState()],
})
