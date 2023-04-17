<template>
  <mdb-footer>
    <p class="mb-0 py-3 text-center">
      &copy; {{new Date().getFullYear()}} Copyright: <a href="http://www.brainsbug.com"> brainsbug.com </a>
    </p>
  </mdb-footer>
</template>

<script>
import { mdbFooter } from 'mdbvue'

export default {
  name: 'Footer',
  components: {
    mdbFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
