<template lang="pug">
  .link(@click="open") >> QR코드 출석체크 바로가기 <<
</template>

<script>
import createLogger from 'if-logger'

const logger = createLogger({tags: ['Code.vue']})
export default {
  name: 'v-qr',
  async mounted() {},
  methods: {
    open() {
      window.open('https://little-jesus-code.now.sh', '_blank')
    },
  },
}
</script>
<style scoped lang="stylus">
.link {
  cursor: pointer;
}
</style>
