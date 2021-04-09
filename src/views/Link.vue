<template lang="pug">
  .main
    .link
      el-link(:href="qrUrl" target="_blank") >> 학생용 QR코드 출석체크 바로가기 <<
    .link
      el-link(:href="checkUrl" target="_blank") >> 선생님용 출석체크 바로가기 <<
</template>

<script>
import createLogger from 'if-logger'
import {oneOf} from 'mingutils'

const qrUrl = oneOf([
  [location.host === 'little-jesus-admin-2020.vercel.app', 'https://little-jesus-code.vercel.app'],
  [location.host === 'little-jesus-admin-2021.vercel.app', 'https://little-jesus-code-2021.vercel.app'],
  [true, 'https://little-jesus-code-dev.vercel.app'],
])
const checkUrl = oneOf([
  [location.host === 'little-jesus-admin-2020.vercel.app', 'https://little-jesus-2020.vercel.app'],
  [location.host === 'little-jesus-admin-2021.vercel.app', 'https://little-jesus-2021.vercel.app'],
  [true, 'https://little-jesus-dev.vercel.app'],
])

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
