<template>
  <el-table :data="output">
    <el-table-column prop="line" label="stdout" span></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['trace'],
  computed: {
    output() {
      return this.trace.stdout
        .split('\n')
        .map(line => ({ line }))
        .filter(el => el.line);
    }
  }
};
</script>
