<template>
  <div class="skills-preview">
    <h2 class="section-title">技能证书</h2>
    <div class="skills-content">
      <ul class="skills-list" v-if="data.skills && data.skills.length > 0">
        <li v-for="(skill, index) in data.skills" :key="index">
          {{ skill }}
        </li>
      </ul>
      <div v-else class="no-skills">
        暂无技能信息
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.skills-preview {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid #165DFF;
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-list li {
  background: #f0f0f0;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 10pt;
}

.no-skills {
  font-size: 10pt;
  color: #888;
  font-style: italic;
}
</style>