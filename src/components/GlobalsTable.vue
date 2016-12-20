<template>
  <el-table :data="globals">
    <el-table-column prop="varName" label="Name"></el-table-column>
    <el-table-column prop="value" label="Value"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['globals']
};
</script>
