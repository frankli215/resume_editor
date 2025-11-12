<template>
  <div class="basic-info-editor">
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">姓名 *</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.name"
          placeholder="请输入姓名"
          @input="handleInput"
        >
      </div>
      <div class="form-group">
        <label class="form-label">电话 *</label>
        <input 
          type="tel" 
          class="form-input" 
          v-model="localData.phone"
          placeholder="请输入电话"
          @input="handleInput"
        >
      </div>
    </div>
    
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">邮箱</label>
        <input 
          type="email" 
          class="form-input" 
          v-model="localData.email"
          placeholder="请输入邮箱"
          @input="handleInput"
        >
      </div>
      <div class="form-group">
        <label class="form-label">地址</label>
        <input 
          type="text" 
          class="form-input" 
          v-model="localData.address"
          placeholder="请输入地址"
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
      name: '',
      phone: '',
      email: '',
      address: ''
    })
  }
})

const emit = defineEmits(['update'])

// 使用简历存储
const resumeStore = useResumeStore()

// 本地数据副本，确保有默认值
const localData = ref({
  name: props.data.name || '张三',
  phone: props.data.phone || '138-0000-0000',
  email: props.data.email || 'zhangsan@example.com',
  address: props.data.address || '北京市朝阳区某某街道',
  ...props.data
})

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    if (newData) {
      localData.value = { 
        name: newData.name || '张三',
        phone: newData.phone || '138-0000-0000',
        email: newData.email || 'zhangsan@example.com',
        address: newData.address || '北京市朝阳区某某街道',
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
</script>

<style scoped>
.basic-info-editor {
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