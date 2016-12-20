<template>
  <pre class="hljs">
    <code>
      <div v-for="(line, i) in code" v-bind:class="{ active: currentLine == i + 1, last: lastLine == i + 1 }" class="line">
        <span class="line-number">{{i + 1}}</span><div class="code-line" v-html="line"></div>
      </div>
    </code>
  </pre>
</template>

<script>
export default {
  props: ['code', 'currentLine', 'lastLine']
};
</script>
