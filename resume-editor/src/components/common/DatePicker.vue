<template>
  <div class="date-picker">
    <div class="date-input" @click="togglePicker">
      <input 
        type="text" 
        class="form-input" 
        :value="displayValue"
        readonly
        :placeholder="placeholder"
      >
      <span class="calendar-icon">📅</span>
    </div>
    
    <div v-if="showPicker" class="date-picker-panel" @click.stop>
      <div class="picker-header">
        <button class="nav-btn" @click="prevYear">«</button>
        <select v-model="currentYear" class="year-select">
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <button class="nav-btn" @click="nextYear">»</button>
      </div>
      
      <div class="months-grid">
        <div 
          v-for="month in 12" 
          :key="month"
          class="month-item"
          :class="{ selected: isSelectedMonth(month) }"
          @click="selectMonth(month)"
        >
          {{ month }}月
        </div>
      </div>
      
      <div class="picker-footer">
        <button class="today-btn" @click="selectToday">至今</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择年月'
  },
  minDate: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// 当前年份和月份
const currentYear = ref(new Date().getFullYear())
const showPicker = ref(false)

// 年份选项（近20年）
const years = computed(() => {
  const current = new Date().getFullYear()
  return Array.from({ length: 20 }, (_, i) => current - 10 + i)
})

// 显示值
const displayValue = computed(() => {
  return props.modelValue || props.placeholder
})

// 切换选择器显示
const togglePicker = () => {
  showPicker.value = !showPicker.value
}

// 上一年
const prevYear = () => {
  currentYear.value--
}

// 下一年
const nextYear = () => {
  currentYear.value++
}

// 检查是否为选中月份
const isSelectedMonth = (month) => {
  if (!props.modelValue) return false
  const [year, selectedMonth] = props.modelValue.split('.')
  return parseInt(year) === currentYear.value && parseInt(selectedMonth) === month
}

// 选择月份
const selectMonth = (month) => {
  // 检查是否在最小日期之后
  if (props.minDate) {
    const [minYear, minMonth] = props.minDate.split('.').map(Number)
    if (currentYear.value < minYear || (currentYear.value === minYear && month < minMonth)) {
      return
    }
  }
  
  const value = `${currentYear.value}.${String(month).padStart(2, '0')}`
  emit('update:modelValue', value)
  showPicker.value = false
}

// 选择"至今"
const selectToday = () => {
  emit('update:modelValue', '至今')
  showPicker.value = false
}

// 点击外部关闭选择器
const handleClickOutside = (event) => {
  if (showPicker.value && !event.target.closest('.date-picker')) {
    showPicker.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.date-picker {
  position: relative;
  width: 100%;
}

.date-input {
  position: relative;
  cursor: pointer;
}

.form-input {
  width: 100%;
  padding: 8px 12px;
  padding-right: 30px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.calendar-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.date-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  width: 250px;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
}

.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
}

.nav-btn {
  border: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}

.nav-btn:hover {
  background: #f5f5f5;
}

.year-select {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
}

.months-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 10px;
}

.month-item {
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.month-item:hover {
  background: #f5f5f5;
}

.month-item.selected {
  background: var(--primary-color);
  color: white;
}

.picker-footer {
  padding: 10px;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.today-btn {
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 14px;
}

.today-btn:hover {
  text-decoration: underline;
}
</style>