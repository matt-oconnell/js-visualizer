<template>
  <div>
    <Visualizer v-if="isLoaded" :trace="trace" :code="code"></Visualizer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Visualizer from './../components/Visualizer';

export default {
  components: {
    Visualizer
  },
  computed: mapState({
    trace: s => s.code.trace,
    code: s => s.code.code,
    isLoaded: s => !!s.code
  }),
  mounted: function created() {
    this.$store.dispatch('analyzeCode', `let i = 0;
function pow(base, power) {
  console.log('called', i++);
  let result = base;
  if (power > 1) {
    return result * pow(base, --power);
  }
  return result
}

function times2(val) {
  return val * 2;
}

const answer = times2(pow(2, 3));
console.log(answer);
    `);
    // this.$store.dispatch('getCode');
  }
};
</script>
