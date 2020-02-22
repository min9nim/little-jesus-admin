import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCompositionApi from '@vue/composition-api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import locale from 'element-ui/lib/locale/lang/ko'
// import {ko} from 'element-ui/locale'   // not exist
import {setApiServer, initSentry} from '@/utils'

setApiServer()
initSentry(Vue)

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(ElementUI, {locale})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
