<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-slider v-model="codeI" :max="parseInt(trace.length)" show-stops show-input></el-slider>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <pre class="hljs">
          <code>
            <div v-for="(line, i) in func" v-bind:class="{ active: currentStep[0].line == i + 1, last: currentStep[0].lastLine == i + 1 }" class="line">
              <span class="line-number">{{i + 1}}</span><div class="code-line" v-html="line"></div>
            </div>
          </code>
        </pre>
      </el-col>
      <el-col :span="12">
        <h4>Current Step</h4>
        <el-table :data="currentStep">
          <el-table-column prop="event" label="Event"></el-table-column>
          <el-table-column prop="line" label="Line"></el-table-column>
        </el-table>
        <el-row :gutter="20">
          <el-col :span="12">
            <h4>Globals</h4>
            <el-table :data="globals">
              <el-table-column prop="varName" label="Name"></el-table-column>
              <el-table-column prop="value" label="Value"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <h4>Output</h4>
            <el-table :data="stdout">
              <el-table-column prop="stdout" label="stdout" span></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <h4>Frames</h4>
        <el-table :data="currentStack" :row-class-name="isNewestFrame">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
/*
Todo:
split into smaller components
Clean up styles
Interactive code. Enable code editing and have a "run" button
Option: Initialize with markdown template
Option: Include different tables based on props
*/
import { mapState } from 'vuex';
import markdown from '../modules/markdown';

export default {
  created: function created() {
    this.$store.dispatch('getCode');
  },
  data() {
    return {
      codeI: this.$store.state.codeI
    };
  },
  methods: {
    isNewestFrame(_, index) {
      if (this.currentTrace) {
        if (index + 1 === this.currentTrace.stack_to_render.length) {
          return 'new-row';
        }
      }
      return '';
    }
  },
  watch: {
    codeI(i) {
      this.$store.dispatch('updateCodeI', i);
    }
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
