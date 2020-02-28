<template lang="pug">
  .main
    .link
      el-link(:href="qrUrl" target="_blank") >> 학생용 QR코드 출석체크 바로가기 <<
    .link
      el-link(:href="checkUrl" target="_blank") >> 선생님용 출석체크 바로가기 <<
</template>

<script>
import createLogger from 'if-logger'

let qrUrl = 'https://little-jesus-code-dev.now.sh'
let checkUrl = 'https://little-jesus-dev.now.sh'
if (location.host === 'little-jesus-admin-2020.now.sh') {
  qrUrl = 'https://little-jesus-code.now.sh'
  checkUrl = 'https://little-jesus-2020.now.sh'
}

const logger = createLogger({tags: ['Code.vue']})

logger.info({qrUrl, checkUrl})

export default {
  name: 'v-qr',
  async mounted() {},
  data() {
    return {
      qrUrl,
      checkUrl,
    }
  },
}
</script>
<style scoped lang="stylus">
.link {
  margin: 10px 0;
}
</style>
