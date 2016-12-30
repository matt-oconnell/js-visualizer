<template>
  <div>
    <el-row :gutter="20" style="padding: 10px 0;">
      <el-col :span="24">
        <el-slider v-model="localcodeStepI" :max="parseInt(trace.length)" show-stops show-input></el-slider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      localcodeStepI: this.$store.state.codeStepI
    };
  },
  watch: {
    localcodeStepI(i) {
      this.$store.dispatch('updateCodeStepI', i);
    },
    isReset(isTrue) {
      if (isTrue) {
        this.localcodeStepI = 0;
      }
    }
  },
  computed: mapState({
    trace: s => s.code ? s.code.trace : [],
    isReset: s => s.codeStepI === 0
  })
};
</script>

<style lang="sass">
  .el-tooltip__popper,
  .el-tooltip__popper span
    user-select: none
    font-family: 'Roboto Mono'
</style>
