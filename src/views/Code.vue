<template lang="pug">
v-code(:students="$store.state.students" v-loading='state.loading')
</template>

<script>
import {VCode} from '@mgsong/lj-common'
import '@mgsong/lj-common/dist/lj.css'
import {initStudents} from './home.fn'
import createLogger from 'if-logger'

const logger = createLogger({tags: ['Code.vue']})
export default {
  name: 'v-code-wrapper',
  components: {VCode},
  data() {
    return {
      state: {loading: false},
    }
  },
  async mounted() {
    logger.addTags('mounted').verbose('call')

    if (this.$store.state.students.length === 0) {
      logger.addTags('mounted').info('`$store.state.students.length` is 0')
      await initStudents({root: this, state: this.state})
    }
  },
}
</script>
<style scoped lang="stylus"></style>
