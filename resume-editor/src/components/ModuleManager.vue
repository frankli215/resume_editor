<template>
  <div class="module-manager">
    <!-- 顶部操作栏 -->
    <div class="top-bar">
      <div class="title" v-if="!isCollapsed">简历模块</div>
      <div class="actions">
        <button class="icon-btn" @click="toggleCollapse" :title="isCollapsed ? '展开' : '折叠'">
          <span v-if="isCollapsed">→</span>
          <span v-else>←</span>
        </button>
        <button class="icon-btn" @click="refreshModules" title="刷新">
          ↺
        </button>
      </div>
    </div>
    
    <!-- 模块列表区 -->
    <div class="module-list" v-if="!isCollapsed">
      <!-- 核心信息组 -->
      <div class="module-group">
        <div class="group-title">核心信息</div>
        <div 
          v-for="module in coreModules" 
          :key="module.id"
          class="module-item"
          :class="{ 'incomplete': module.incomplete }"
        >
          <div class="module-icon">{{ module.icon }}</div>
          <div class="module-name">{{ module.name }}</div>
          <div class="module-switch">
            <label class="switch">
              <input 
                type="checkbox" 
                :checked="module.enabled" 
                :disabled="module.required"
                @change="toggleModuleEnabled(module.id)"
              >
              <span class="slider"></span>
            </label>
          </div>
          <div 
            class="incomplete-indicator" 
            v-if="module.incomplete"
            title="未完善"
          >
            !
          </div>
        </div>
      </div>
      
      <!-- 经历类组 -->
      <div class="module-group">
        <div class="group-title optional">经历类</div>
        <div 
          v-for="module in experienceModules" 
          :key="module.id"
          class="module-item draggable"
          :class="{ 'incomplete': module.incomplete }"
          draggable="true"
          @dragstart="handleDragStart($event, module)"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          <div class="drag-handle">⋮⋮</div>
          <div class="module-icon">{{ module.icon }}</div>
          <div class="module-name">{{ module.name }}</div>
          <div class="module-switch">
            <label class="switch">
              <input 
                type="checkbox" 
                :checked="module.enabled"
                @change="toggleModuleEnabled(module.id)"
              >
              <span class="slider"></span>
            </label>
          </div>
          <div 
            class="incomplete-indicator" 
            v-if="module.incomplete"
            title="未完善"
          >
            !
          </div>
        </div>
      </div>
      
      <!-- 补充类组 -->
      <div class="module-group">
        <div class="group-title optional">补充类</div>
        <div 
          v-for="module in additionalModules" 
          :key="module.id"
          class="module-item draggable"
          :class="{ 'incomplete': module.incomplete }"
          draggable="true"
          @dragstart="handleDragStart($event, module)"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          <div class="drag-handle">⋮⋮</div>
          <div class="module-icon">{{ module.icon }}</div>
          <div class="module-name">{{ module.name }}</div>
          <div class="module-switch">
            <label class="switch">
              <input 
                type="checkbox" 
                :checked="module.enabled"
                @change="toggleModuleEnabled(module.id)"
              >
              <span class="slider"></span>
            </label>
          </div>
          <div 
            class="incomplete-indicator" 
            v-if="module.incomplete"
            title="未完善"
          >
            !
          </div>
        </div>
      </div>
    </div>
    
    <!-- 折叠状态下的图标 -->
    <div class="collapsed-icons" v-else>
      <div 
        v-for="module in allModules" 
        :key="module.id"
        class="collapsed-icon"
        :title="module.name"
      >
        {{ module.icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useResumeStore } from '../stores/resume'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-collapse'])

// 使用简历存储
const resumeStore = useResumeStore()

// 分组模块
const coreModules = computed(() => 
  resumeStore.modules.filter(module => module.type === 'core')
)

const experienceModules = computed(() => 
  resumeStore.modules.filter(module => module.type === 'experience')
)

const additionalModules = computed(() => 
  resumeStore.modules.filter(module => module.type === 'additional')
)

const allModules = computed(() => resumeStore.modules)

// 切换折叠状态
const toggleCollapse = () => {
  emit('toggle-collapse')
}

// 刷新模块状态
const refreshModules = () => {
  // 这里可以添加刷新逻辑
  console.log('刷新模块状态')
}

// 切换模块启用状态
const toggleModuleEnabled = (moduleId) => {
  resumeStore.toggleModuleEnabled(moduleId)
}

// 拖拽处理
const draggedModule = ref(null)

const handleDragStart = (event, module) => {
  draggedModule.value = module
  event.dataTransfer.effectAllowed = 'move'
}

const handleDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const handleDrop = (event) => {
  event.preventDefault()
  if (draggedModule.value) {
    console.log('拖拽完成:', draggedModule.value.name)
    draggedModule.value = null
  }
}
</script>

<style scoped>
.module-manager {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.title {
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 12px;
}

.icon-btn:hover {
  background: #f5f5f5;
}

.module-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.module-group {
  margin-bottom: 16px;
}

.group-title {
  padding: 8px 16px;
  font-size: 12px;
  color: var(--text-secondary);
  background: #F2F3F5;
}

.group-title.optional {
  background: white;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-top: 8px;
}

.module-item {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  gap: 8px;
  position: relative;
}

.module-item:hover {
  background: #f9f9f9;
}

.module-item.draggable:hover {
  background: #E8F3FF;
  cursor: move;
}

.drag-handle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-right: 4px;
}

.module-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.module-name {
  flex: 1;
  font-size: 14px;
  color: var(--text-color);
}

.module-switch {
  margin: 0 8px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #C9CDD4;
  transition: .3s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--success-color);
}

input:checked + .slider:before {
  transform: translateX(20px);
}

input:disabled + .slider {
  opacity: 0.6;
  cursor: not-allowed;
}

.incomplete-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--warning-color);
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.collapsed-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 24px;
}

.collapsed-icon {
  font-size: 20px;
  width: 100%;
  text-align: center;
  padding: 8px 0;
  border-radius: 4px;
}

.collapsed-icon:hover {
  background: #f5f5f5;
}
</style>