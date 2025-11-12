<template>
  <div class="draggable-module-list">
    <div 
      v-for="(module, index) in enabledModules" 
      :key="module.id"
      class="module-container"
      :class="{ 'drag-over': dragOverIndex === index }"
    >
      <div 
        class="module-wrapper"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragover="handleDragOver($event, index)"
        @dragleave="handleDragLeave"
        @drop="handleDrop($event, index)"
        @dragend="handleDragEnd"
      >
        <div class="module-header">
          <div class="module-title">
            <span class="module-icon">{{ getModuleIcon(module.id) }}</span>
            <span class="module-name">{{ getModuleName(module.id) }}</span>
          </div>
          <div class="module-actions">
            <button class="action-btn add-btn" @click="addEntry(module.id)">+ 添加条目</button>
            <div class="more-actions">
              <button class="action-btn more-btn">⋮</button>
              <div class="dropdown-menu">
                <button class="dropdown-item">复制模块</button>
                <button class="dropdown-item">删除所有条目</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="module-content">
          <div 
            v-if="!hasEntries(module.id)" 
            class="empty-state"
            @click="addEntry(module.id)"
          >
            + 点击添加 {{ getModuleName(module.id) }} 内容
          </div>
          
          <div v-else class="entries-list">
            <div 
              v-for="(entry, entryIndex) in getModuleEntries(module.id)" 
              :key="entryIndex"
              class="entry-item"
              :class="{ 'selected': selectedEntry === `${module.id}-${entryIndex}` }"
            >
              <div class="entry-content">
                <component 
                  :is="getModuleComponent(module.id)" 
                  :data="entry"
                  @update="updateEntry(module.id, entryIndex, $event)"
                />
              </div>
              <div class="entry-actions">
                <button class="entry-action-btn edit-btn" title="编辑">✏️</button>
                <button class="entry-action-btn copy-btn" title="复制" @click="copyEntry(module.id, entryIndex)">📋</button>
                <button class="entry-action-btn delete-btn" title="删除" @click="deleteEntry(module.id, entryIndex)">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useResumeStore } from '../stores/resume'
import BasicInfoEditor from './modules/BasicInfoEditor.vue'
import JobIntentionEditor from './modules/JobIntentionEditor.vue'
import WorkExperienceEditor from './modules/WorkExperienceEditor.vue'
import EducationEditor from './modules/EducationEditor.vue'
import ProjectEditor from './modules/ProjectEditor.vue'
import SkillsEditor from './modules/SkillsEditor.vue'
import SelfEvaluationEditor from './modules/SelfEvaluationEditor.vue'

// 使用简历存储
const resumeStore = useResumeStore()

// 启用的模块
const enabledModules = computed(() => {
  return resumeStore.orderedEnabledModules.map(module => ({ id: module.id }))
})

const selectedEntry = ref(null)
const dragOverIndex = ref(null)
const draggedIndex = ref(null)

// 获取模块名称
const getModuleName = (moduleId) => {
  const names = {
    'basic-info': '基础信息',
    'job-intention': '求职意向',
    'work-experience': '工作经历',
    'education': '教育经历',
    'project': '项目经历',
    'skills': '技能证书',
    'self-evaluation': '自我评价'
  }
  return names[moduleId] || moduleId
}

// 获取模块图标
const getModuleIcon = (moduleId) => {
  const icons = {
    'basic-info': '👤',
    'job-intention': '🎯',
    'work-experience': '💼',
    'education': '🎓',
    'project': '📁',
    'skills': '🔧',
    'self-evaluation': '💬'
  }
  return icons[moduleId] || '📄'
}

// 获取模块组件
const getModuleComponent = (moduleId) => {
  const components = {
    'basic-info': BasicInfoEditor,
    'job-intention': JobIntentionEditor,
    'work-experience': WorkExperienceEditor,
    'education': EducationEditor,
    'project': ProjectEditor,
    'skills': SkillsEditor,
    'self-evaluation': SelfEvaluationEditor
  }
  return components[moduleId] || 'div'
}

// 检查模块是否有条目
const hasEntries = (moduleId) => {
  const data = resumeStore[moduleId]
  if (Array.isArray(data)) {
    return data.length > 0
  }
  return !!data
}

// 获取模块条目
const getModuleEntries = (moduleId) => {
  return resumeStore[moduleId] || []
}

// 添加条目
const addEntry = (moduleId) => {
  switch (moduleId) {
    case 'work-experience':
      resumeStore.addWorkExperience()
      break
    case 'education':
      resumeStore.addEducation()
      break
    case 'project':
      resumeStore.addProject()
      break
    default:
      // 其他模块不需要添加条目
      break
  }
}

// 更新条目
const updateEntry = (moduleId, entryIndex, data) => {
  switch (moduleId) {
    case 'basic-info':
      resumeStore.updateBasicInfo(data)
      break
    case 'job-intention':
      resumeStore.updateJobIntention(data)
      break
    case 'work-experience':
      resumeStore.updateWorkExperience(entryIndex, data)
      break
    case 'education':
      resumeStore.updateEducation(entryIndex, data)
      break
    case 'project':
      resumeStore.updateProject(entryIndex, data)
      break
    case 'skills':
      resumeStore.updateSkills(data)
      break
    case 'self-evaluation':
      resumeStore.updateSelfEvaluation(data)
      break
  }
}

// 复制条目
const copyEntry = (moduleId, entryIndex) => {
  const data = resumeStore[moduleId]
  if (Array.isArray(data) && data[entryIndex]) {
    const entry = { ...data[entryIndex] }
    switch (moduleId) {
      case 'work-experience':
        resumeStore.addWorkExperience(entry)
        break
      case 'education':
        resumeStore.addEducation(entry)
        break
      case 'project':
        resumeStore.addProject(entry)
        break
    }
  }
}

// 删除条目
const deleteEntry = (moduleId, entryIndex) => {
  switch (moduleId) {
    case 'work-experience':
      resumeStore.deleteWorkExperience(entryIndex)
      break
    case 'education':
      resumeStore.deleteEducation(entryIndex)
      break
    case 'project':
      resumeStore.deleteProject(entryIndex)
      break
  }
}

// 拖拽处理
const handleDragStart = (event, index) => {
  draggedIndex.value = index
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', index)
}

const handleDragOver = (event, index) => {
  event.preventDefault()
  dragOverIndex.value = index
  event.dataTransfer.dropEffect = 'move'
}

const handleDragLeave = () => {
  dragOverIndex.value = null
}

const handleDrop = (event, index) => {
  event.preventDefault()
  dragOverIndex.value = null
  
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    // 更新模块顺序
    const newOrder = [...resumeStore.moduleOrder]
    const [movedModule] = newOrder.splice(draggedIndex.value, 1)
    newOrder.splice(index, 0, movedModule)
    resumeStore.updateModuleOrder(newOrder)
  }
}

const handleDragEnd = () => {
  dragOverIndex.value = null
  draggedIndex.value = null
}
</script>

<style scoped>
.draggable-module-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.module-container {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: border-color 0.2s;
}

.module-container:hover {
  border-color: var(--primary-color);
}

.module-container.drag-over {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

.module-wrapper {
  cursor: move;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-color);
}

.module-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.module-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.add-btn {
  color: var(--success-color);
}

.add-btn:hover {
  text-decoration: underline;
}

.more-btn {
  color: var(--text-secondary);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: none;
}

.more-actions:hover .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.module-content {
  padding: 20px;
}

.empty-state {
  text-align: center;
  padding: 20px;
  border: 1px dashed var(--success-color);
  border-radius: 4px;
  color: var(--success-color);
  cursor: pointer;
}

.empty-state:hover {
  background: #F0FFF4;
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.entry-item {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 16px;
  position: relative;
  transition: border-color 0.2s;
}

.entry-item.selected {
  border-color: #FF7D00;
}

.entry-actions {
  position: absolute;
  right: 16px;
  top: 16px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.entry-item:hover .entry-actions {
  opacity: 1;
}

.entry-action-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.entry-action-btn:hover {
  background: #f5f5f5;
}

.edit-btn:hover {
  color: var(--primary-color);
}

.copy-btn:hover {
  color: var(--success-color);
}

.delete-btn:hover {
  color: var(--error-color);
}
</style>