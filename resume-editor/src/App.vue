<template>
  <div id="app">
    <ResumeEditor />
  </div>
</template>

<script setup>
import ResumeEditor from './views/ResumeEditor.vue'
</script>

<style>
#app {
  height: 100vh;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

/* Windows系统字体 */
#app {
  font-family: "Microsoft YaHei", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>