<template>
  <div>
    <Slider></Slider>
    <el-row :gutter="20">
      <el-col :span="12">
        <CodeBlock :code="func" :currentLine="currentStep[0].line" :lastLine="currentStep[0].lastLine"></CodeBlock>
      </el-col>
      <el-col :span="12">
        <h4>Current Step</h4>
        <CurrentStepTable :step="currentStep"></CurrentStepTable>
        <el-row :gutter="20">
          <el-col :span="12">
            <h4>Globals</h4>
            <GlobalsTable :globals="globals"></GlobalsTable>
          </el-col>
          <el-col :span="12">
            <h4>Output</h4>
            <OutputTable :output="stdout"></OutputTable>
          </el-col>
        </el-row>
        <h4>Frames</h4>
        <FramesTable :trace="currentTrace" :stack="currentStack"></FramesTable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
Todo:
[X] Split into smaller components
[ ] Lower level components should all be "dumb"
[ ] Clean up styles
[ ] Refactor
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
import markdown from '../modules/markdown';

export default {
  components: {
    CodeBlock,
    CurrentStepTable,
    FramesTable,
    GlobalsTable,
    OutputTable,
    Slider,
  },
  created: function created() {
    this.$store.dispatch('getCode');
  },
  computed: mapState({
    trace: s => s.code ? s.code.trace : [],
    currentTrace(s) {
      return this.trace ? this.trace[s.codeI] : null;
    },
    stdout() {
      if (!this.currentTrace) return [{}];
      return this.currentTrace.stdout
        .split('\n')
        .map(stdout => ({ stdout }))
        .filter(el => el.stdout);
    },
    globals() {
      if (!this.currentTrace) return [{}];
      const globals = [];
      this.currentTrace.ordered_globals.forEach((varName) => {
        const rawVal = this.currentTrace.globals[varName];
        let value = rawVal;
        if (Array.isArray(rawVal) && rawVal[0] === 'REF') {
          value = this.currentTrace.heap[rawVal[1]][0];
        }
        globals.push({ varName, value });
      });
      return globals;
    },
    currentStep(s) {
      if (!this.currentTrace) return [{}];
      const last = s.code.trace[s.codeI - 1];
      return [{
        event: this.currentTrace.event,
        line: this.currentTrace.line,
        lastLine: last ? last.line : -1
      }];
    },
    currentStack() {
      if (!this.currentTrace) return [{}];
      return this.currentTrace.stack_to_render.map((el) => {
        const locals = [];
        Object.keys(el.encoded_locals).forEach((key) => {
          const rawVal = el.encoded_locals[key];
          const val = Array.isArray(rawVal) ? rawVal[1] : rawVal;
          locals.push({ variable: key, val });
        });
        return {
          frame: el.frame_id,
          function: el.func_name,
          localVals: locals
        };
      });
    },
    func: (s) => {
      if (s.code) {
        const funcStr = s.code.code;
        const funcTmpl = `\`\`\`js
${funcStr}`;
        // fix this mess
        return markdown.render(funcTmpl).split('<code>')[1].split('</code>')[0].split('\n');
      }
      return '';
    }
  })
};
</script>

<style media="screen">
  .grey {
    color: grey;
  }
  code, pre {
    display: block;
    margin: 0;
  }
  pre {
    white-space: normal;
  }
  code {
    white-space: pre;
  }
  .code-line {
    display: inline-block;
  }
  .line {
    line-height: .8;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    transition: background-color .5s
  }
  .line.active {
    background-color: rgba(0, 128, 0, 0.40);
  }
  .line.last {
    background-color: rgba(0, 128, 0, 0.10);
  }
  .line-number {
    display: inline-block;
    width: 20px;
    white-space: normal;
    margin-right: 20px;
    margin-left: 3px;
  }
  .buttons {
    margin-top: 25px;
    text-align: center;
  }
  /* eleme.io customizations */
  .el-table tr.new-row {
    background-color: #EFF2F7;
  }
</style>
