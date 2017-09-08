import Vue from 'vue'
import App from './components/App.vue'
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)
new Vue({
  el: '#app',
  render: h => h(App)
})
