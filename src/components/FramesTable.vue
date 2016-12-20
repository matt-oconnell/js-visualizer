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
    isNewestFrame(_, index) {
      if (this.trace) {
        if (index + 1 === this.trace.stack_to_render.length) {
          return 'new-row';
        }
      }
      return '';
    }
  }
};
</script>
