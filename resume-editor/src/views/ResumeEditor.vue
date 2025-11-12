<template>
  <div class="resume-editor">
    <!-- 左侧模块控制区 -->
    <div 
      class="left-panel" 
      :class="{ 'collapsed': isLeftPanelCollapsed }"
      :style="{ width: isLeftPanelCollapsed ? 'var(--left-panel-collapsed-width)' : 'var(--left-panel-width)' }"
    >
      <ModuleManager 
        :is-collapsed="isLeftPanelCollapsed" 
        @toggle-collapse="toggleLeftPanel"
      />
    </div>
    
    <!-- 中间内容编辑区 -->
    <div class="main-content">
      <div class="editor-container">
        <DraggableModuleList />
      </div>
    </div>
    
    <!-- 右侧实时预览区 -->
    <div 
      class="right-panel" 
      :class="{ 'collapsed': isPreviewCollapsed }"
      :style="{ width: isPreviewCollapsed ? '60px' : '50%' }"
    >
      <PreviewPanel 
        :is-collapsed="isPreviewCollapsed" 
        @toggle-collapse="togglePreview"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ModuleManager from '../components/ModuleManager.vue'
import DraggableModuleList from '../components/DraggableModuleList.vue'
import PreviewPanel from '../components/PreviewPanel.vue'

// 响应式状态
const isLeftPanelCollapsed = ref(false)
const isPreviewCollapsed = ref(false)
const windowWidth = ref(window.innerWidth)

// 切换左侧面板折叠状态
const toggleLeftPanel = () => {
  isLeftPanelCollapsed.value = !isLeftPanelCollapsed.value
}

// 切换预览面板折叠状态
const togglePreview = () => {
  isPreviewCollapsed.value = !isPreviewCollapsed.value
}

// 响应式处理
const handleResize = () => {
  windowWidth.value = window.innerWidth
  
  // 屏幕 <1200px：右侧预览区可点击收起
  if (windowWidth.value < 1200) {
    // 可以在这里添加逻辑处理
  }
  
  // 屏幕 <768px：切换为上下布局
  if (windowWidth.value < 768) {
    // 可以在这里添加逻辑处理
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.resume-editor {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.left-panel {
  height: 100%;
  background: white;
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.left-panel.collapsed {
  width: var(--left-panel-collapsed-width);
}

.main-content {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.editor-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: var(--bg-color);
}

.right-panel {
  height: 100%;
  background: #F9F9F9;
  border-left: 1px solid var(--border-color);
  transition: width 0.3s ease;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.right-panel.collapsed {
  width: 60px;
}

/* 响应式适配 */
@media (max-width: 1199px) {
  .right-panel {
    width: 40%;
  }
}

@media (max-width: 767px) {
  .resume-editor {
    flex-direction: column;
  }
  
  .left-panel, .right-panel {
    width: 100%;
    height: 40%;
  }
  
  .main-content {
    height: 60%;
  }
}
</style>