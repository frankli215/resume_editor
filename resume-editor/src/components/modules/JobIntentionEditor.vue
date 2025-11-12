<template>
  <div class="job-intention-editor">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">期望职位 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.position"
          placeholder="请输入期望职位"
          @input="handleInput"
        >
      </div>
      <div class="form-group">
        <label class="form-label">期望行业 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.industry"
          placeholder="请输入期望行业"
          @input="handleInput"
        >
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">期望薪资</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.salary"
          placeholder="例如：15K-20K"
          @input="handleInput"
        >
      </div>
      <div class="form-group">
        <label class="form-label">工作城市</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.city"
          placeholder="请输入工作城市"
          @input="handleInput"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useResumeStore } from '../../stores/resume'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      position: '',
      industry: '',
      salary: '',
      city: ''
    })
  }
})

// 使用简历存储
const resumeStore = useResumeStore()

// 本地数据副本
const localData = ref({ ...resumeStore.jobIntention })

// 监听数据变化
watch(
  () => resumeStore.jobIntention,
  (newData) => {
    localData.value = { ...newData }
  },
  { deep: true }
)

// 处理输入事件
const handleInput = () => {
  resumeStore.updateJobIntention({ ...localData.value })
}
</script>

<style scoped>
.job-intention-editor {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group {
  flex: 1;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--text-color);
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
}
</style>