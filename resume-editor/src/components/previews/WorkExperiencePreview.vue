<template>
  <div class="work-experience-preview">
    <h2 class="section-title">工作经历</h2>
    <div 
      v-for="(item, index) in displayData" 
      :key="index"
      class="experience-item"
    >
      <div class="experience-header">
        <h3 class="company">{{ item.company }}</h3>
        <span class="position">{{ item.position }}</span>
        <span class="time">{{ formatDate(item.startDate) }} - {{ formatDate(item.endDate) }}</span>
      </div>
      <div class="experience-description" v-html="formatDescription(item.description)"></div>
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

// 显示数据，如果没有数据则显示默认示例数据
const displayData = computed(() => {
  if (props.data && props.data.length > 0) {
    return props.data
  }
  // 返回默认示例数据
  return [{
    company: '某某科技有限公司',
    position: '前端开发工程师',
    startDate: '2020-07',
    endDate: '至今',
    description: '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>'
  }]
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
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 6px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.experience-header {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
  align-items: center;
}

.company {
  font-weight: bold;
  margin: 0;
  font-size: 12pt;
  color: #333;
}

.position {
  font-size: 11pt;
  color: #666;
}

.time {
  font-size: 10pt;
  color: #999;
  margin-left: auto;
}

.experience-description {
  font-size: 10.5pt;
  line-height: 1.6;
  color: #444;
}

.experience-description ul, .experience-description ol {
  padding-left: 20px;
  margin: 8px 0;
}

.experience-description li {
  margin-bottom: 5px;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .experience-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .time {
    margin-left: 0;
  }
}
</style>