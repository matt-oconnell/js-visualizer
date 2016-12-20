<template>
  <el-table :data="output">
    <el-table-column prop="stdout" label="stdout" span></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['output']
};
</script>
