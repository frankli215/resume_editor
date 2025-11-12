<template>
  <div class="education-preview">
    <h2 class="section-title">教育经历</h2>
    <div 
      v-for="(item, index) in data" 
      :key="index"
      class="education-item"
    >
      <div class="education-header">
        <h3 class="school">{{ item.school }}</h3>
        <span class="major">{{ item.major }}</span>
        <span class="degree">{{ item.degree }}</span>
        <span class="time">{{ item.startDate }} - {{ item.endDate }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Array,
    required: true
  }
})
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