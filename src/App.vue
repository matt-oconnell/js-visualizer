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

<style lang="css">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0 20px;
}

#app {
  font-family: 'Roboto Mono';
  max-width: 100%;
  margin: 0 auto;
}
.el-row {
  /*margin-bottom: 20px;*/
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
