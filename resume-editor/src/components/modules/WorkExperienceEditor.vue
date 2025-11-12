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
        <div class="char-count">{{ (localData.company || '').length }}/50</div>
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
        <div class="char-count">{{ (localData.position || '').length }}/30</div>
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

const emit = defineEmits(['update'])

// 使用简历存储
const resumeStore = useResumeStore()

// 本地数据副本，确保有默认值
const localData = ref({
  company: props.data.company || '某某科技有限公司',
  position: props.data.position || '前端开发工程师',
  startDate: props.data.startDate || '2020-07',
  endDate: props.data.endDate || '至今',
  description: props.data.description || '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>',
  ...props.data
})

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      localData.value = { 
        company: newData.company || '某某科技有限公司',
        position: newData.position || '前端开发工程师',
        startDate: newData.startDate || '2020-07',
        endDate: newData.endDate || '至今',
        description: newData.description || '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>',
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

// 获取描述长度（去除HTML标签）
const getDescriptionLength = () => {
  if (!localData.value.description) return 0
  // 简单去除HTML标签计算长度
  return localData.value.description.replace(/<[^>]*>/g, '').length
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