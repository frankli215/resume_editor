<template>
  <div class="project-editor">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">项目名称 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.name"
          placeholder="请输入项目名称"
          @input="handleInput"
          maxlength="50"
        >
        <div class="char-count">{{ (localData.name || '').length }}/50</div>
      </div>
      <div class="form-group">
        <label class="form-label">担任角色 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.role"
          placeholder="请输入担任角色"
          @input="handleInput"
          maxlength="30"
        >
        <div class="char-count">{{ (localData.role || '').length }}/30</div>
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
      <label class="form-label">项目描述 *</label>
      <RichTextEditor 
        v-model="localData.description"
        @update:modelValue="handleDescriptionChange"
        :max-length="300"
        placeholder="请描述项目背景、职责与成果（建议使用 STAR 法则）"
      />
      <div class="char-count">{{ getDescriptionLength() }}/300 字</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DatePicker from '../common/DatePicker.vue'
import RichTextEditor from '../common/RichTextEditor.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: ''
    })
  }
})

const emit = defineEmits(['update'])

// 本地数据副本，确保有默认值
const localData = ref({
  name: props.data.name || '',
  role: props.data.role || '',
  startDate: props.data.startDate || '',
  endDate: props.data.endDate || '',
  description: props.data.description || '',
  ...props.data
})

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      localData.value = { 
        name: newData.name || '',
        role: newData.role || '',
        startDate: newData.startDate || '',
        endDate: newData.endDate || '',
        description: newData.description || '',
        ...newData 
      }
    }
  },
  { deep: true }
)

// 处理输入事件
const handleInput = () => {
  emit('update', { ...localData.value })
}

// 处理日期变化
const handleDateChange = () => {
  emit('update', { ...localData.value })
}

// 处理描述变化
const handleDescriptionChange = (value) => {
  localData.value.description = value
  emit('update', { ...localData.value })
}

// 获取描述长度
const getDescriptionLength = () => {
  return localData.value.description ? localData.value.description.replace(/<[^>]*>/g, '').length : 0
}
</script>

<style scoped>
.project-editor {
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