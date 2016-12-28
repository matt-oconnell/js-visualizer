<template>
  <el-table row-class-name="error" :data="step">
    <el-table-column prop="exception_msg" label="Exception"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['step']
};
</script>

<style lang="sass">
  .error
    background: #d25d5d !important
</style>
