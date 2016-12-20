<template>
  <el-table :data="step">
    <el-table-column prop="event" label="Event"></el-table-column>
    <el-table-column prop="line" label="Line"></el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['step']
};
</script>
