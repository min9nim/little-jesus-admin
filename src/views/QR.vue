<template lang="pug">
  .link(@click="open") >> QR코드 출석체크 바로가기 <<
</template>

<script>
import createLogger from 'if-logger'

let qrUrl = 'https://little-jesus-code-dev.now.sh'
if (location.host === 'little-jesus-admin-2020.now.sh') {
  qrUrl = 'https://little-jesus-code.now.sh'
}

const logger = createLogger({tags: ['Code.vue']})
export default {
  name: 'v-qr',
  async mounted() {},
  methods: {
    open() {
      window.open(qrUrl, '_blank')
    },
  },
}
</script>
<style scoped lang="stylus">
.link {
  cursor: pointer;
}
</style>
