<template>
  <div>
    <Slider></Slider>
    <el-row :gutter="20">
      <el-col :span="12">
        <CodeBlock :code="code" :currentLine="currentTrace.line" :lastLine="lastTrace ? lastTrace.line : -1"></CodeBlock>
      </el-col>
      <el-col :span="12">
        <h4>Current Step</h4>
        <CurrentStepTable :step="[currentTrace]"></CurrentStepTable>
        <el-row :gutter="20">
          <el-col :span="12">
            <h4>Globals</h4>
            <GlobalsTable :trace="currentTrace"></GlobalsTable>
          </el-col>
          <el-col :span="12">
            <h4>Output</h4>
            <OutputTable :trace="currentTrace"></OutputTable>
          </el-col>
        </el-row>
        <h4>Frames</h4>
        <FramesTable :trace="currentTrace"></FramesTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
Todo:
[ ] Interactive code. Enable code editing and have a "run" button
[ ] Option: Initialize with markdown template
[ ] Option: Include different tables based on props
*/
import { mapState } from 'vuex';
import Slider from './../components/Slider';
import CodeBlock from './../components/CodeBlock';
import CurrentStepTable from './../components/CurrentStepTable';
import GlobalsTable from './../components/GlobalsTable';
import OutputTable from './../components/OutputTable';
import FramesTable from './../components/FramesTable';

export default {
  props: ['trace', 'code'],
  components: {
    CodeBlock,
    CurrentStepTable,
    FramesTable,
    GlobalsTable,
    OutputTable,
    Slider,
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
