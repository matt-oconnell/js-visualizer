<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-slider v-model="localCodeI" :max="parseInt(trace.length)" show-stops show-input></el-slider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      localCodeI: this.$store.state.codeI,
      isReset: false
    };
  },
  watch: {
    localCodeI(i) {
      this.$store.dispatch('updateCodeI', i);
    },
    isReset(isTrue) {
      if (isTrue) {
        this.localCodeI = 0;
      }
    }
  },
  computed: mapState({
    trace: s => s.code ? s.code.trace : [],
    isReset: s => s.codeI === 0
  })
};
</script>

<style lang="sass">
  .el-tooltip__popper,
  .el-tooltip__popper span
    user-select: none
    font-family: 'Roboto Mono'
</style>
