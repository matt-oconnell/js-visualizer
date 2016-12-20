<template>
  <el-table :data="stack" :row-class-name="isNewestFrame">
    <el-table-column prop="function" label="Function"></el-table-column>
    <el-table-column prop="frame" label="Frame"></el-table-column>
    <el-table-column prop="localVals" label="Local Values" inline-template>
      <div>
        <div v-for="local in row.localVals">
          <span v-if="local.variable === '__return__'">
            <i class="el-icon-d-arrow-right"></i> return:
          </span>
          <span v-if="local.variable !== '__return__'">
            {{local.variable}}:
          </span>
          <span :class="local.val === 'undefined' ? 'grey' : ''">
            {{local.val}}
          </span>
        </div>
      </div>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['stack', 'trace'],
  methods: {
    isNewestFrame(_, i) {
      if (this.trace && i + 1 === this.trace.stack_to_render.length) {
        return 'new-row';
      }
      return '';
    }
  }
};
</script>

<style src="../styles/code-theme.css" scoped></style>
<style lang="sass" scoped>
  .grey
  	color: grey
</style>

<style lang="sass">
  /* eleme.io customizations */
  .el-table tr.new-row
  	background-color: #EFF2F7
</style>
