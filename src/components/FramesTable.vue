<template>
  <el-table :data="stack" :row-class-name="isNewestFrame">
    <el-table-column prop="function" label="Function"></el-table-column>
    <el-table-column prop="frame" label="Frame"></el-table-column>
    <el-table-column label="Local Variables" inline-template>
      <div>
        <div v-for="variable in row.localVariables">
          <span v-if="variable.name === '__return__'">
            <i class="el-icon-d-arrow-right"></i> return:
          </span>
          <span v-if="variable.name !== '__return__'">
            {{variable.name}}:
          </span>
          <span :class="variable.val === 'undefined' ? 'grey' : ''">
            {{variable.val}}
          </span>
        </div>
      </div>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['trace'],
  methods: {
    isNewestFrame(_, i) {
      if (i + 1 === this.trace.stack_to_render.length) {
        return 'new-row';
      }
      return '';
    }
  },
  computed: {
    stack() {
      return this.trace.stack_to_render.map((frame) => {
        const localVariables = [];
        Object.keys(frame.encoded_locals).forEach((key) => {
          const rawVal = frame.encoded_locals[key];
          const val = Array.isArray(rawVal) ? rawVal[1] : rawVal;
          localVariables.push({ name: key, val });
        });
        return {
          frame: frame.frame_id,
          function: frame.func_name,
          localVariables
        };
      });
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
