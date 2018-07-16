<template>
<div class="skyhook-codemirror">
  <textarea ref="textarea" :placeholder="placeholder"></textarea>
  <div id="skyhook-codemirror-panel" class="skyhook-codemirror-panel">
    <i :class="lintedIcon"></i>
    <i class="mdi md-auto-fix skyhook-clickable" v-if="fixable" @click.stop="fix"></i>
    <i :class="fullscreenIcon" @click.stop="toggleFullscreen"></i>
  </div>
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
import 'codemirror/addon/display/panel'
import 'codemirror/addon/display/placeholder'

import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/trailingspace'

import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'

import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint'

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

// Eslint
const eslintConfig = {
  'parser': 'espree',
  'parserOptions': {
    'sourceType': 'script'
  },
  'env': {
    'node': true,
    'es6': true
  },
  'globals': {
  },
  'rules': {
    'no-empty': ['error', {
      'allowEmptyCatch': true
    }],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'comma-spacing': 'error',
    'semi': 'error',
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'no-multi-spaces': 'error',
    'quotes': ['error', 'single', {
      'avoidEscape': true
    }],
    'no-multiple-empty-lines': ['error', {
      'max': 1
    }],
    'eqeqeq': ['error', 'always'],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-debugger': 'error',
    'no-caller': 'error',
    'no-undef': 'error',

    'keyword-spacing': 'error',
    'no-unreachable': 'error',
    'no-cond-assign': ['error', 'except-parens'],
    'no-sparse-arrays': 'error',
    'no-eval': 'error',
    'no-proto': 'error',
    'no-with': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true
    }],

    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'dot-location': [
      'error',
      'object'
    ],
    'dot-notation': 'error',
    'no-const-assign': 'error',
    'no-constant-condition': 'error',
    'no-empty-character-class': 'error',
    'no-floating-decimal': 'error',
    'no-mixed-requires': 'error',
    'no-redeclare': 'error',
    'no-shadow': [
      'error',
      {
        'allow': [
          'body',
          'error',
          'reject',
          'resolve',
          'response',
          'result'
        ]
      }
    ],
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': [
      'error',
      'nofunc'
    ],
    'no-useless-call': 'error',
    'no-useless-escape': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'object-curly-newline': [
      'error',
      {
        'minProperties': 1
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'object-property-newline': 'error',
    'one-var': [
      'error',
      'never'
    ],
    'one-var-declaration-per-line': 'error',
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'yoda': 'error'
  }
}

function getPosition (error, from) {
  let line = error.line - 1
  let ch = from ? error.column - 1 : error.column

  if (error.node && error.node.loc) {
    line = from ? error.node.loc.start.line - 1 : error.node.loc.end.line - 1
    ch = from ? error.node.loc.start.column : error.node.loc.end.column
  }

  return CodeMirror.Pos(line, ch)
}

function getSeverity (error) {
  switch (error.severity) {
    case 1:
      return 'warning'
    case 2:
      return 'error'
    default:
      return 'error'
  }
}

let linter
function validator (text, options, instance) {
  if (text && window.eslint) {
    if (!linter) {
      // eslint-disable-next-line
      linter = new window.eslint()
    }

    const errors = linter.verify(text, eslintConfig)
    console.log(errors)

    const results = []

    let fixable = false

    for (const error of errors) {
      if (error.fix) {
        fixable = true
      }

      results.push({
        message: error.message,
        severity: getSeverity(error),
        from: getPosition(error, true),
        to: getPosition(error, false)
      })
    }

    if (instance.vue) {
      instance.vue.linted = results.length === 0
      instance.vue.fixable = fixable
    }

    return results
  }
}

CodeMirror.registerHelper('lint', 'javascript', validator)

// Component
export default {
  name: 'codemirror',
  props: {
    code: String,
    placeholder: {
      type: String,
      default: ''
    },
    value: String
  },
  computed: {
    fullscreenIcon () {
      let icon = 'skyhook-clickable skyhook-codemirror-panel-button-fullscreen mdi mdi-fullscreen'
      if (this.fullscreen) {
        icon += '-exit'
      }
      return icon
    },
    lintedIcon () {
      if (this.linted === true) {
        return 'mdi mdi-checkbox-multiple-marked-circle'
      } else if (this.linted === false) {
        return 'mdi mdi-checkbox-multiple-blank-circle'
      } else {
        return 'mdi mdi-checkbox-multiple-blank-circle-outline'
      }
    }
  },
  data () {
    return {
      content: '',
      fixable: false,
      fullscreen: false,
      instance: null,
      linted: null,
      panel: null
    }
  },
  methods: {
    fix () {
      let content = this.instance.getValue()
      const result = linter.verifyAndFix(content, eslintConfig)
      console.log(result)
      this.instance.setValue(result.output)
    },
    toggleFullscreen () {
      this.fullscreen = !this.instance.getOption('fullScreen')
      this.instance.setOption('fullScreen', this.fullscreen)
      this.panel.classList.toggle('skyhook-codemirror-panel-fullscreen')
    }
  },
  mounted () {
    const vm = this
    const events = [
      'beforeChange',
      'beforeSelectionChange',
      'blur',
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
        'CodeMirror-lint-markers',
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter'
      ],
      keyMap: 'emacs',
      lineNumbers: true,
      lineWrapping: true,
      lint: true,
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

    this.instance.vue = this

    this.instance.setValue(this.code || this.value || this.content)

    this.instance.on('change', () => {
      this.content = this.instance.getValue()
      this.$emit('input', this.content)
    })

    for (const event of events) {
      vm.instance.on(event, function (...args) {
        const eventName = event.replace(/([A-Z])/g, '-$1').toLowerCase()
        vm.$emit(eventName, ...args)
      })
    }

    this.panel = document.getElementById('skyhook-codemirror-panel')
    this.instance.addPanel(this.panel, {
      position: 'bottom',
      stable: true
    })
  }
}
</script>

<style>
.skyhook-codemirror {
    width: 100%;
}
.skyhook-codemirror-panel {
    position: relative;
    box-sizing: border-box;
    background-color: #0073b1;
    border-radius: 0 0 5px 5px;
    height: 24px;
    width: 100%;
    padding-top: 1px;
    font-size: 20px;
    line-height: 24px;
    padding-left: 5px;
}
.skyhook-codemirror-panel-fullscreen {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    border-radius: 0 !important;
}
.skyhook-codemirror-panel-button-fullscreen {
    position: absolute;
    right: 5px;
}
.CodeMirror-fullscreen {
    margin-bottom: 24px;
}
</style>
