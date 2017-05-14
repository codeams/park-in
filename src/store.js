
import Firebase from 'firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

let config = {
  apiKey: 'AIzaSyAOEqPQ_PQJZwf3vARmHOYvjZwUz7gxVYk',
  authDomain: 'myfirebase-db-84f29.firebaseapp.com',
  databaseURL: 'https://myfirebase-db-84f29.firebaseio.com',
  projectId: 'myfirebase-db-84f29',
  storageBucket: 'myfirebase-db-84f29.appspot.com',
  messagingSenderId: '1052979453336'
}

Firebase.initializeApp(config)

let state = {
  parks: {}
}

let getters = {
  parks: state => state.parks
}

let actions = {
  setParksRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
    bindFirebaseRef('parks', ref)
  })
}

export default {
  namespaced: true,
  strict: true,

  state,
  getters,
  mutations: firebaseMutations,
  actions
}
