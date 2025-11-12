<template>
  <div id="app">
    <ResumeEditor />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useResumeStore } from './stores/resume'
import ResumeEditor from './views/ResumeEditor.vue'

const resumeStore = useResumeStore()

onMounted(() => {
  // 初始化简历数据
  resumeStore.initializeData()
  console.log('App mounted, resume data initialized')
})
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