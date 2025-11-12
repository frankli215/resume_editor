<template>
  <div class="basic-info-preview">
    <h1 class="name">{{ data.name }}</h1>
    <div class="contact-info" v-if="data.phone || data.email || data.address">
      <span v-if="data.phone">{{ data.phone }}</span>
      <span v-if="data.phone && data.email"> | </span>
      <span v-if="data.email">{{ data.email }}</span>
      <span v-if="(data.phone || data.email) && data.address"> | </span>
      <span v-if="data.address">{{ data.address }}</span>
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
.basic-info-preview {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.name {
  font-size: 24pt;
  margin: 0 0 10px 0;
  font-weight: bold;
}

.contact-info {
  font-size: 10.5pt;
}
</style>