<template lang="html">
  <div id="app">
    <el-row id="app">
      <el-col :span="24">
        <el-menu theme="dark" default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/">HOME</el-menu-item>
          <el-menu-item index="stack">STACK</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect(key) {
      this.$router.push(key);
    }
  }
};
</script>
