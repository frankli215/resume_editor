<template>
  <div class="work-experience-preview">
    <h2 class="section-title">工作经历</h2>
    <div 
      v-for="(item, index) in data" 
      :key="index"
      class="experience-item"
    >
      <div class="experience-header">
        <h3 class="company">{{ item.company }}</h3>
        <span class="position">{{ item.position }}</span>
        <span class="time">{{ item.startDate }} - {{ item.endDate }}</span>
      </div>
      <div class="experience-description" v-html="formatDescription(item.description)"></div>
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
.work-experience-preview {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid #165DFF;
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.experience-item {
  margin-bottom: 10px;
}

.experience-header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;
}

.company {
  font-weight: bold;
  margin: 0;
  font-size: 11pt;
}

.position {
  font-size: 10pt;
}

.time {
  font-size: 10pt;
  color: #666;
}

.experience-description {
  font-size: 10.5pt;
  line-height: 1.5;
}

.experience-description ul, .experience-description ol {
  padding-left: 20px;
  margin: 5px 0;
}

.experience-description li {
  margin-bottom: 3px;
}
</style>