<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-slider v-model="codeI" :max="parseInt(trace.length)" show-stops show-input></el-slider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      codeI: this.$store.state.codeI
    };
  },
  watch: {
    codeI(i) {
      this.$store.dispatch('updateCodeI', i);
    }
  },
  computed: mapState({
    trace: s => s.code ? s.code.trace : []
  })
};
</script>

<style>
  .el-progress {
    margin-top: 15px;
  }
</style>
