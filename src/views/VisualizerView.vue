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
  created: function created() {
    this.$store.dispatch('getCode');
  }
};
</script>
