<template>
  <el-table :data="globals">
    <el-table-column prop="varName" label="Name"></el-table-column>
    <el-table-column prop="value" label="Value"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['trace'],
  computed: {
    globals() {
      const globals = [];
      this.trace.ordered_globals.forEach((varName) => {
        const rawVal = this.trace.globals[varName];
        let value = rawVal;
        if (Array.isArray(rawVal) && rawVal[0] === 'REF') {
          value = this.trace.heap[rawVal[1]][0];
        }
        globals.push({ varName, value });
      });
      return globals;
    }
  }
};
</script>
