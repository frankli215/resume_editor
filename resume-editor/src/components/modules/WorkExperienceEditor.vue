<template>
  <div class="work-experience-editor">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">公司名称 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.company"
          placeholder="请输入公司名称"
          @input="handleInput"
          maxlength="50"
        >
        <div class="char-count">{{ localData.company.length }}/50</div>
      </div>
      <div class="form-group">
        <label class="form-label">职位名称 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.position"
          placeholder="请输入职位名称"
          @input="handleInput"
          maxlength="30"
        >
        <div class="char-count">{{ localData.position.length }}/30</div>
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">开始时间 *</label>
        <DatePicker 
          v-model="localData.startDate"
          @update:modelValue="handleDateChange"
        />
      </div>
      <div class="form-group">
        <label class="form-label">结束时间 *</label>
        <DatePicker 
          v-model="localData.endDate"
          :min-date="localData.startDate"
          @update:modelValue="handleDateChange"
        />
      </div>
    </div>
    
    <div class="form-group">
      <label class="form-label">职责描述 *</label>
      <RichTextEditor 
        v-model="localData.description"
        @update:modelValue="handleDescriptionChange"
        :max-length="300"
        placeholder="请描述核心职责与成果（建议使用 STAR 法则）"
      />
      <div class="char-count">{{ getDescriptionLength() }}/300 字</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useResumeStore } from '../../stores/resume'
import DatePicker from '../common/DatePicker.vue'
import RichTextEditor from '../common/RichTextEditor.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }
})

// 使用简历存储
const resumeStore = useResumeStore()

// 本地数据副本
const localData = ref({ ...props.data })

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    localData.value = { ...newData }
  },
  { deep: true }
)

// 处理输入事件
const handleInput = () => {
  // 工作经历是数组，需要通过父组件更新
  console.log('工作经历数据变化:', { ...localData.value })
}

// 处理日期变化
const handleDateChange = () => {
  // 工作经历是数组，需要通过父组件更新
  console.log('工作经历日期变化:', { ...localData.value })
}

// 处理描述变化
const handleDescriptionChange = (value) => {
  localData.value.description = value
  // 工作经历是数组，需要通过父组件更新
  console.log('工作经历描述变化:', { ...localData.value })
}

// 获取描述长度
const getDescriptionLength = () => {
  return localData.value.description ? localData.value.description.replace(/<[^>]*>/g, '').length : 0
}
</script>

<style scoped>
.work-experience-editor {
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
  position: relative;
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

.char-count {
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: 12px;
  color: var(--text-secondary);
}
</style>