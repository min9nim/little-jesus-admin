<template lang="pug">
v-code(:students="$store.state.students")
</template>

<script lang="ts">
import VCode from 'lj-code'
import 'lj-code/dist/code.css'

export default {
  name: 'v-code-wrapper',
  components: {VCode},
}
</script>
<style scoped lang="stylus"></style>
