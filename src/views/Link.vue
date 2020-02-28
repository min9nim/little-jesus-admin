<template lang="pug">
  .main
    .link(@click="open") >> 학생용 QR코드 출석체크 바로가기 <<
    .link(@click="open") >> 선생님용 출석체크 바로가기 <<
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
  margin: 10px 0;
  cursor: pointer;

  &:hover {
    // color: green;
    font-weight: bold;
  }
}
</style>
