<template>
  <div class="job-intention-preview">
    <h2 class="section-title">求职意向</h2>
    <div class="content">
      <p v-if="data.position || data.industry || data.salary">
        <span v-if="data.position">{{ data.position }}</span>
        <span v-if="data.position && data.industry"> | </span>
        <span v-if="data.industry">{{ data.industry }}</span>
        <span v-if="(data.position || data.industry) && data.salary"> | </span>
        <span v-if="data.salary">{{ data.salary }}</span>
      </p>
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
.job-intention-preview {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid #165DFF;
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.content {
  font-size: 10.5pt;
}
</style>