<template>
  <pre class="hljs">
    <code>
      <div v-for="(line, i) in code" v-bind:class="{ active: isCurrent(i), last: isLast(i) }" class="line">
        <span class="number">{{i + 1}}</span>
        <div class="code" v-html="line"></div>
      </div>
    </code>
  </pre>
</template>

<script>
export default {
  props: ['code', 'currentLine', 'lastLine'],
  methods: {
    isCurrent(i) {
      return this.currentLine === i + 1;
    },
    isLast(i) {
      return this.lastLine === i + 1;
    }
  }
};
</script>

<style src="../styles/code-theme.css"></style>
<style lang="sass" scoped>
  code, pre
    display: block
    margin: 0

  pre
    white-space: normal

  code
    white-space: pre

  .line
    font-size: 12px
    width: 100%
    display: flex
    align-items: center
    padding: 5px 10px
    transition: background-color .5

    &.active
      background-color: rgba(0, 128, 0, 0.40)

    &.last
      background-color: rgba(0, 128, 0, 0.10)

    .number
      display: inline-block
      width: 20px
      white-space: normal
      margin-right: 20px
      margin-left: 3px

    .code
      display: inline-block
</style>
