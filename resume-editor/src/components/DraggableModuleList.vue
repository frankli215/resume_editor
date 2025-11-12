<template>
  <div class="draggable-module-list">
    <div 
      v-for="(module, index) in enabledModules" 
      :key="module.id"
      class="module-container"
      :class="{ 'drag-over': dragOverIndex === index }"
      @dragover="handleDragOver($event, index)"
      @dragleave="handleDragLeave"
      @drop="handleDrop($event, index)"
    >
      <div 
        class="module-wrapper"
        draggable="true"
        @dragstart="handleDragStart($event, index)"
        @dragend="handleDragEnd"
      >
        <div class="module-header">
          <div class="module-title">
            <span class="module-icon">{{ getModuleIcon(module.id) }}</span>
            <span class="module-name">{{ getModuleName(module.id) }}</span>
          </div>
          <div class="module-actions">
            <button 
              v-if="isMultiEntryModule(module.id)" 
              class="add-btn"
              @click="addEntry(module.id)"
            >
              + 添加条目
            </button>
          </div>
        </div>
        
        <div class="module-content">
          <!-- 单条目模块 -->
          <component
            v-if="isSingleEntryModule(module.id)"
            :is="getModuleComponent(module.id)"
            :data="getModuleData(module.id)"
            @update="updateEntry(module.id, 0, $event)"
          />
          
          <!-- 多条目模块 -->
          <div v-else>
            <!-- 已保存的条目 -->
            <div 
              v-for="(entry, entryIndex) in getModuleEntries(module.id)" 
              :key="entryIndex"
              class="entry-item"
            >
              <div class="entry-header">
                <span class="entry-title">
                  {{ module.id === 'work-experience' ? entry.company : 
                     module.id === 'education' ? entry.school : 
                     module.id === 'project' ? entry.name : '' }}
                </span>
                <div class="entry-actions">
                  <button 
                    class="copy-btn"
                    @click="copyEntry(module.id, entryIndex)"
                  >
                    复制
                  </button>
                  <button 
                    class="delete-btn"
                    @click="deleteEntry(module.id, entryIndex)"
                  >
                    删除
                  </button>
                </div>
              </div>
              <component
                :is="getModuleComponent(module.id)"
                :data="entry"
                @update="updateEntry(module.id, entryIndex, $event)"
              />
            </div>
            
            <!-- 新条目表单 -->
            <div 
              v-for="(newEntry, newEntryIndex) in newEntries[module.id]" 
              :key="`new-${newEntryIndex}`"
              class="entry-item new-entry"
            >
              <div class="entry-header">
                <span class="entry-title">新增条目</span>
                <div class="entry-actions">
                  <button 
                    v-if="newEntries[module.id].length > 1"
                    class="delete-btn"
                    @click="removeNewEntryForm(module.id, newEntryIndex)"
                  >
                    删除
                  </button>
                </div>
              </div>
              <component
                :is="getModuleComponent(module.id)"
                :data="newEntry"
                @update="updateNewEntry(module.id, newEntryIndex, $event)"
              />
              <div class="entry-actions">
                <button 
                  class="save-btn"
                  @click="addEntryFromForm(module.id, newEntryIndex)"
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
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

// 新条目表单数组，为每个模块类型维护一个数组
const newEntries = reactive({
  'work-experience': [{
    company: '某某科技有限公司',
    position: '前端开发工程师',
    startDate: '2020-07',
    endDate: '至今',
    description: '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>'
  }],
  'education': [{
    school: '某某大学',
    major: '计算机科学与技术',
    degree: '本科',
    startDate: '2016-09',
    endDate: '2020-06'
  }],
  'project': [{
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  }]
})

// 单条目模块列表（包括工作经历）
const singleEntryModules = ['basic-info', 'job-intention', 'work-experience', 'skills', 'self-evaluation']

// 多条目模块列表（不包括工作经历）
const multiEntryModules = ['education', 'project']

// 判断是否为单条目模块
const isSingleEntryModule = (moduleId) => {
  return singleEntryModules.includes(moduleId)
}

// 判断是否为多条目模块
const isMultiEntryModule = (moduleId) => {
  return multiEntryModules.includes(moduleId)
}

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
  // 对于单条目模块，检查是否有实际数据
  if (isSingleEntryModule(moduleId)) {
    if (!data) return false
    // 检查对象是否有非空属性（排除空字符串）
    return Object.values(data).some(value => {
      // 如果值存在且不为空字符串，则认为有数据
      return value !== undefined && value !== null && value !== ''
    })
  }
  return !!data
}

// 获取模块条目
const getModuleEntries = (moduleId) => {
  return resumeStore[moduleId] || []
}

// 获取单条目模块的数据（带默认值）
const getModuleData = (moduleId) => {
  const storeData = resumeStore[moduleId] || {}
  
  // 根据模块类型返回带默认值的数据
  switch (moduleId) {
    case 'basic-info':
      return {
        name: storeData.name || '张三',
        phone: storeData.phone || '138-0000-0000',
        email: storeData.email || 'zhangsan@example.com',
        address: storeData.address || '北京市朝阳区某某街道'
      }
    case 'job-intention':
      return {
        position: storeData.position || '前端开发工程师',
        industry: storeData.industry || '互联网/IT',
        salary: storeData.salary || '15K-20K',
        city: storeData.city || '北京'
      }
    case 'work-experience':
      // 工作经历作为单条目模块处理
      return {
        company: storeData.company || '某某科技有限公司',
        position: storeData.position || '前端开发工程师',
        startDate: storeData.startDate || '2020-07',
        endDate: storeData.endDate || '至今',
        description: storeData.description || '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>'
      }
    case 'skills':
      return {
        skills: storeData.skills && storeData.skills.length > 0 ? storeData.skills : ['HTML/CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js']
      }
    case 'self-evaluation':
      return {
        content: storeData.content || '具备3年前端开发经验，熟练掌握Vue.js和React框架，有丰富的Web应用开发经验。具备良好的沟通能力和团队协作精神，能够快速适应新环境并承担工作压力。'
      }
    default:
      return storeData
  }
}

// 更新新条目数据
const updateNewEntry = (moduleId, entryIndex, data) => {
  if (newEntries[moduleId] && newEntries[moduleId][entryIndex]) {
    newEntries[moduleId][entryIndex] = { ...newEntries[moduleId][entryIndex], ...data }
  }
}

// 添加新条目表单
const addEntry = (moduleId) => {
  if (newEntries[moduleId]) {
    // 根据模块类型添加空的新条目表单
    switch (moduleId) {
      case 'work-experience':
        newEntries[moduleId].push({
          company: '某某科技有限公司',
          position: '前端开发工程师',
          startDate: '2020-07',
          endDate: '至今',
          description: '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>'
        })
        break
      case 'education':
        newEntries[moduleId].push({
          school: '某某大学',
          major: '计算机科学与技术',
          degree: '本科',
          startDate: '2016-09',
          endDate: '2020-06'
        })
        break
      case 'project':
        newEntries[moduleId].push({
          name: '',
          role: '',
          startDate: '',
          endDate: '',
          description: ''
        })
        break
    }
  }
}

// 从表单添加新条目
const addEntryFromForm = (moduleId, entryIndex) => {
  // 添加新条目
  if (newEntries[moduleId] && newEntries[moduleId][entryIndex]) {
    const entryData = newEntries[moduleId][entryIndex]
    
    // 如果是第一个表单（索引为0），则更新现有条目而不是添加新条目
    if (entryIndex === 0 && resumeStore[moduleId] && resumeStore[moduleId].length > 0) {
      // 更新现有条目
      updateEntry(moduleId, 0, entryData)
    } else {
      // 添加新条目
      switch (moduleId) {
        case 'work-experience':
          resumeStore.addWorkExperience(entryData)
          break
        case 'education':
          resumeStore.addEducation(entryData)
          break
        case 'project':
          resumeStore.addProject(entryData)
          break
      }
    }
    
    // 移除已添加的表单（除了第一个表单）
    if (entryIndex > 0) {
      removeNewEntryForm(moduleId, entryIndex)
    } else {
      // 对于第一个表单，重置为默认值而不是移除
      switch (moduleId) {
        case 'work-experience':
          newEntries[moduleId][entryIndex] = {
            company: '某某科技有限公司',
            position: '前端开发工程师',
            startDate: '2020-07',
            endDate: '至今',
            description: '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>'
          }
          break
        case 'education':
          newEntries[moduleId][entryIndex] = {
            school: '某某大学',
            major: '计算机科学与技术',
            degree: '本科',
            startDate: '2016-09',
            endDate: '2020-06'
          }
          break
        case 'project':
          newEntries[moduleId][entryIndex] = {
            name: '',
            role: '',
            startDate: '',
            endDate: '',
            description: ''
          }
          break
      }
    }
    
    // 添加一个新的空表单（除了项目经历）
    if (moduleId !== 'project') {
      addEntry(moduleId)
    }
  }
}

// 移除新条目表单
const removeNewEntryForm = (moduleId, entryIndex) => {
  if (newEntries[moduleId] && newEntries[moduleId][entryIndex]) {
    newEntries[moduleId].splice(entryIndex, 1)
    // 确保始终至少有一个空表单
    if (newEntries[moduleId].length === 0) {
      addEntry(moduleId)
    }
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
      // 工作经历作为单条目模块处理，直接更新整个对象
      resumeStore.updateWorkExperience(0, data)
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
  gap: 20px;
  padding: 20px 0;
}

.module-container {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.module-container:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.module-container.drag-over {
  border-color: #165DFF;
  box-shadow: 0 0 0 2px rgba(22, 93, 255, 0.2);
}

.module-wrapper {
  cursor: move;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  background: #fafafa;
  border-radius: 8px 8px 0 0;
}

.module-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.module-icon {
  font-size: 16px;
}

.module-name {
  font-weight: 600;
  font-size: 16px;
}

.module-actions .add-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.module-actions .add-btn:hover {
  background: #0044cc;
}

.module-content {
  padding: 20px;
}

.entry-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: #fdfdfd;
}

.entry-item.new-entry {
  background: #f0f8ff;
  border-color: #165DFF;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.entry-title {
  font-weight: 600;
  font-size: 14px;
}

.entry-actions {
  display: flex;
  gap: 8px;
}

.entry-actions .delete-btn,
.entry-actions .copy-btn,
.entry-actions .save-btn {
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.entry-actions .delete-btn:hover {
  background: #ff4d4f;
  color: white;
  border-color: #ff4d4f;
}

.entry-actions .copy-btn:hover {
  background: #165DFF;
  color: white;
  border-color: #165DFF;
}

.entry-actions .save-btn {
  background: var(--success-color);
  color: white;
  border-color: var(--success-color);
}

.entry-actions .save-btn:hover {
  background: #4caf50;
  border-color: #4caf50;
}
</style>