<template>
  <div class="self-evaluation-preview">
    <h2 class="section-title">自我评价</h2>
    <div class="evaluation-content" v-html="formatDescription(data.content)"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 格式化描述内容
const formatDescription = (content) => {
  // 简单的HTML清理和格式化
  if (!content) return ''
  return content
}
</script>

<style scoped>
.self-evaluation-preview {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid #165DFF;
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.evaluation-content {
  font-size: 10.5pt;
  line-height: 1.5;
}

.evaluation-content ul, .evaluation-content ol {
  padding-left: 20px;
  margin: 5px 0;
}

.evaluation-content li {
  margin-bottom: 3px;
}
</style>