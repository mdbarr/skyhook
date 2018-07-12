<template>
<div class="skyhook-codemirror">
  <textarea ref="textarea" :placeholder="placeholder"></textarea>
</div>
</template>

<script>
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'

// Addons
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/comment/continuecomment'

import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/dialog/dialog'

import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/display/placeholder'

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/trailingspace'

import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'

import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'

import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/json-lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'

import 'codemirror/addon/merge/merge.css'
import 'codemirror/addon/merge/merge'

import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'

import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/search/matchesonscrollbar.css'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'

import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/selection/mark-selection'

// Keymap
import 'codemirror/keymap/emacs'

// Mode
import 'codemirror/mode/javascript/javascript'

// Theme
import 'codemirror/theme/lesser-dark.css'

export default {
  name: 'codemirror',
  props: {
  },
  data () {
    return {
      content: '',
      instance: null,
      placeholder: 'module.exports = {};'
    }
  },
  mounted () {
    const vm = this
    const events = [
      'beforeChange',
      'beforeSelectionChange',
      'blur',
      'change',
      'changes',
      'cursorActivity',
      'electricInput',
      'focus',
      'gutterClick',
      'gutterContextMenu',
      'keyHandled',
      'optionChange',
      'refresh',
      'scroll',
      'scrollCursorIntoView',
      'update',
      'viewportChange'
    ]

    this.instance = CodeMirror.fromTextArea(this.$refs.textarea, {
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: [
        // 'CodeMirror-lint-markers',
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter'
      ],
      keyMap: 'emacs',
      lineNumbers: true,
      lineWrapping: true,
      lint: false,
      matchBrackets: true,
      matchTags: true,
      mode: 'javascript',
      scrollbarStyle: 'overlay',
      showMatchesOnScrollbar: true,
      showTrailingSpace: true,
      smartIndent: true,
      styleActiveLine: true,
      tabSize: 2,
      theme: 'lesser-dark'
    })

    for (const event of events) {
      vm.instance.on(event, function (...args) {
        const eventName = event.replace(/([A-Z])/g, '-$1').toLowerCase()
        vm.$emit(eventName, ...args)
      })
    }
  }
}
</script>

<style scoped>
.skyhook-codemirror {
    width: 60%
}
</style>
