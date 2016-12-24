<template>
  <div>
    <Slider v-if="!excluded('slider')"></Slider>
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- <CodeBlock v-if="!excluded('code-block')" :code="code" :currentLine="currentTrace.line" :lastLine="lastTrace ? lastTrace.line : -1"></CodeBlock> -->
        <Monaco v-if="!excluded('code-block')" :code="code" :currentLine="currentTrace.line" :lastLine="lastTrace ? lastTrace.line : -1"></Monaco>
      </el-col>
      <el-col :span="12">
        <h4>Current Step</h4>
        <CurrentStepTable v-if="!excluded('current-step')" :step="[currentTrace]"></CurrentStepTable>
        <el-row :gutter="20">
          <el-col :span="12">
            <h4>Globals</h4>
            <GlobalsTable v-if="!excluded('globals')" :trace="currentTrace"></GlobalsTable>
          </el-col>
          <el-col :span="12">
            <h4>Output</h4>
            <OutputTable v-if="!excluded('output')" :trace="currentTrace"></OutputTable>
          </el-col>
        </el-row>
        <h4>Frames</h4>
        <FramesTable v-if="!excluded('frames')" :trace="currentTrace"></FramesTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
Todo:
[ ] Interactive code. Enable code editing and have a "run" button
[ ] Option: Initialize with markdown template
*/
import { mapState } from 'vuex';
import Slider from './../components/Slider';
import Monaco from './../components/Monaco';
import CurrentStepTable from './../components/CurrentStepTable';
import GlobalsTable from './../components/GlobalsTable';
import OutputTable from './../components/OutputTable';
import FramesTable from './../components/FramesTable';

export default {
  props: ['trace', 'code', 'exclude'],
  components: {
    Monaco,
    CurrentStepTable,
    FramesTable,
    GlobalsTable,
    OutputTable,
    Slider,
  },
  methods: {
    excluded(el) {
      return this.exclude ? this.exclude.includes(el) : false;
    }
  },
  computed: mapState({
    currentTrace(s) {
      return this.trace[s.codeI];
    },
    lastTrace(s) {
      return s.code.trace[s.codeI - 1];
    }
  })
};
</script>

<style src="../styles/app.css"></style>

<style lang="sass" scoped>
  // Prevent slider bug from selecting everything
  *
    user-select: none
</style>
