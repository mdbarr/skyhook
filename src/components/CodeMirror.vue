<template>
<div class="skyhook-codemirror">
  <textarea ref="textarea" :placeholder="placeholder"></textarea>
</div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'

import 'codemirror/mode/javascript/javascript'

import 'codemirror/theme/lesser-dark.css'

export default {
  name: 'codemirror',
  props: {
  },
  data () {
    return {
      content: '',
      instance: null,
      placeholder: 'nothing here'
    }
  },
  mounted () {
    this.instance = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'javascript',
      smartIndent: true,
      tabSize: 2,
      theme: 'lesser-dark'
    })
  }
}
</script>

<style scoped>
.skyhook-codemirror {
    width: 60%
}
</style>
