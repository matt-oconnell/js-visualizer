<template>
  <div>
    <Slider v-if="!excluded('slider')"></Slider>
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- <CodeBlock v-if="!excluded('code-block')" :code="code" :currentLine="currentTrace.line" :lastLine="lastTrace ? lastTrace.line : -1"></CodeBlock> -->
        <Monaco v-if="!excluded('code-block')" :code="modelCode" @codeChanged="updateCode" :currentLine="currentTrace.line" :lastLine="lastTrace ? lastTrace.line : -1"></Monaco>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-button class="wide" type="primary" @click="getCode">Analyze Code!</el-button>
        </el-row>
        <el-row v-if="!excluded('current-step') && currentTrace.exception_msg">
          <h4>Errors</h4>
          <ExceptionTable :step="[currentTrace]"></ExceptionTable>
        </el-row>
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
    <el-row>
      <br>
      <el-col>
        <el-button @click="showMessage">Welcome Message</el-button>
        <a target="_blank" href="https://github.com/matt-oconnell/js-visualizer">See Source</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
Todo:
[ ] Handle Errors
*/
import { mapState } from 'vuex';
import Slider from './../components/Slider';
import Monaco from './../components/Monaco';
import CurrentStepTable from './../components/CurrentStepTable';
import ExceptionTable from './../components/ExceptionTable';
import GlobalsTable from './../components/GlobalsTable';
import OutputTable from './../components/OutputTable';
import FramesTable from './../components/FramesTable';

export default {
  props: ['trace', 'code', 'exclude'],
  components: {
    Monaco,
    CurrentStepTable,
    ExceptionTable,
    FramesTable,
    GlobalsTable,
    OutputTable,
    Slider,
  },
  data() {
    return {
      modelCode: this.code
    };
  },
  methods: {
    excluded(el) {
      return this.exclude ? this.exclude.includes(el) : false;
    },
    getCode(code) {
      this.$store.dispatch('analyzeCode', this.modelCode);
    },
    updateCode(code) {
      this.modelCode = code;
      localStorage.setItem('code', code);
    },
    showMessage() {
      const msg = `This JS Visualizer is an attempt to expose the process
      of a javascript program running in Node v6.0.0. Some language features
      are buggy (i.e. Promises don't work.)

      Write code in the editor and click "Analyze Code" to analyze it.

      Drag the slider at the top of the screen to scrub through the steps of the program.

      Use the Vue browser plugin to see whats going on under the hood.
      `;
      this.$alert(msg, 'Javascript Stack Visualizer', {
        confirmButtonText: 'Got it',
        callback: () => {
          localStorage.setItem('messageSeen', 'true');
        }
      });
    }
  },
  computed: mapState({
    currentTrace(s) {
      return this.trace[s.codeStepI];
    },
    lastTrace: s => s.code.trace[s.codeStepI - 1]
  }),
  mounted() {
    if (!localStorage.getItem('messageSeen')) {
      this.showMessage();
    }
  }
};
</script>

<style src="../styles/app.css"></style>

<style lang="sass" scoped>
  // Prevent slider bug from selecting everything
  *
    user-select: none

  .el-button.wide
    width: 100%
</style>
