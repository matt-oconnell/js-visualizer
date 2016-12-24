<template>
  <div>
    <Monaco
        height="600"
        language="javascript"
        :code="code"
        :options="options"
        :highlighted="highlightLines"
        @mounted="onMounted"
        @codeChange="onCodeChange"
        >
    </Monaco>
    <button @click="clickHandler">Log value</button>
    <input v-model="highlightLines[0].number" placeholder="primary highlight #">
    <input v-model="highlightLines[1].number" placeholder="secondary highlight #">
  </div>
</template>

<script>
import Monaco from 'vue-monaco-editor';

module.exports = {
  components: {
    Monaco
  },
  data() {
    return {
      code: '// type your code \n',
      highlightLines: [
        {
          number: 0,
          class: 'primary-highlighted-line'
        },
        {
          number: 0,
          class: 'secondary-highlighted-line'
        }
      ]
    };
  },
  methods: {
    onMounted(editor) {
      console.log('after mount!', editor, editor.getValue(), editor.getModel());
      this.editor = editor;
    },
    onCodeChange(editor) {
      console.log('code changed!', this.editor.getValue());
    },
    clickHandler() {
      console.log('here is the code:', this.editor.getValue());
    }
  },
  created() {
    this.options = {
      selectOnLineNumbers: false
    };
  }
};
</script>
<!--
<style media="screen">
  .secondary-highlighted-line {
    background: rgba(0, 128, 0, 0.40);
  }
  .primary-highlighted-line {
    background: rgba(0, 128, 0, 0.10);
  }
</style> -->
