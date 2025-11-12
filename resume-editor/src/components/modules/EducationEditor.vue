<template>
  <div class="education-editor">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">学校名称 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.school"
          placeholder="请输入学校名称"
          @input="handleInput"
          maxlength="50"
        >
        <div class="char-count">{{ localData.school.length }}/50</div>
      </div>
      <div class="form-group">
        <label class="form-label">专业 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.major"
          placeholder="请输入专业名称"
          @input="handleInput"
          maxlength="30"
        >
        <div class="char-count">{{ localData.major.length }}/30</div>
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">学历 *</label>
        <select 
          class="form-input" 
          v-model="localData.degree"
          @change="handleInput"
        >
          <option value="">请选择学历</option>
          <option value="专科">专科</option>
          <option value="本科">本科</option>
          <option value="硕士">硕士</option>
          <option value="博士">博士</option>
        </select>
      </div>
      <div class="form-group">
        <!-- 占位符 -->
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useResumeStore } from '../../stores/resume'
import DatePicker from '../common/DatePicker.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      school: '',
      major: '',
      degree: '',
      startDate: '',
      endDate: ''
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
  // 教育经历是数组，需要通过父组件更新
  console.log('教育经历数据变化:', { ...localData.value })
}

// 处理日期变化
const handleDateChange = () => {
  // 教育经历是数组，需要通过父组件更新
  console.log('教育经历日期变化:', { ...localData.value })
}
</script>

<style scoped>
.education-editor {
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