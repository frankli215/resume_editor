<template>
  <div class="project-preview">
    <h2 class="section-title">项目经历</h2>
    <div 
      v-for="(item, index) in data" 
      :key="index"
      class="project-item"
    >
      <div class="project-header">
        <h3 class="project-name">{{ item.name }}</h3>
        <span class="role">{{ item.role }}</span>
        <span class="time">{{ item.startDate }} - {{ item.endDate }}</span>
      </div>
      <div class="project-description" v-html="formatDescription(item.description)"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
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
.project-preview {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid #165DFF;
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.project-item {
  margin-bottom: 10px;
}

.project-header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;
}

.project-name {
  font-weight: bold;
  margin: 0;
  font-size: 11pt;
}

.role {
  font-size: 10pt;
}

.time {
  font-size: 10pt;
  color: #666;
}

.project-description {
  font-size: 10.5pt;
  line-height: 1.5;
}

.project-description ul, .project-description ol {
  padding-left: 20px;
  margin: 5px 0;
}

.project-description li {
  margin-bottom: 3px;
}
</style>