<template>
  <div class="education-preview">
    <h2 class="section-title">教育经历</h2>
    <div 
      v-for="(item, index) in displayData" 
      :key="index"
      class="education-item"
    >
      <div class="education-header">
        <h3 class="school">{{ item.school }}</h3>
        <span class="major">{{ item.major }}</span>
        <span class="degree">{{ item.degree }}</span>
        <span class="time">{{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

// 显示数据，只显示实际存在的数据，不显示默认值
const displayData = computed(() => {
  return props.data || []
})

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  // 如果是日期对象，格式化为 YYYY-MM
  if (date instanceof Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
  }
  // 如果是字符串，直接返回
  return date
}

// 格式化描述内容
const formatDescription = (content) => {
  // 简单的HTML清理和格式化
  if (!content) return ''
  return content
}
</script>

<style scoped>
.education-preview {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid #165DFF;
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.education-item {
  margin-bottom: 10px;
}

.education-header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;
}

.school {
  font-weight: bold;
  margin: 0;
  font-size: 11pt;
}

.major {
  font-size: 10pt;
}

.degree {
  font-size: 10pt;
}

.time {
  font-size: 10pt;
  color: #666;
}
</style>