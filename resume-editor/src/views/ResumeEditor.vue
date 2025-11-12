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
    
    <!-- 功能面板 -->
    <div 
      v-if="showFeaturePanel" 
      class="feature-panel-overlay"
      @click="closeFeaturePanel"
    >
      <div class="feature-panel-wrapper" @click.stop>
        <FeaturePanel />
      </div>
    </div>
    
    <!-- 功能按钮 -->
    <div class="floating-actions">
      <button class="action-btn" @click="toggleFeaturePanel" title="功能面板">
        ⚙️
      </button>
      <button class="action-btn" @click="saveResume" title="保存简历">
        💾
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ModuleManager from '../components/ModuleManager.vue'
import DraggableModuleList from '../components/DraggableModuleList.vue'
import PreviewPanel from '../components/PreviewPanel.vue'
import FeaturePanel from '../components/FeaturePanel.vue'

// 响应式状态
const isLeftPanelCollapsed = ref(false)
const isPreviewCollapsed = ref(false)
const windowWidth = ref(window.innerWidth)
const showFeaturePanel = ref(false)

// 切换左侧面板折叠状态
const toggleLeftPanel = () => {
  isLeftPanelCollapsed.value = !isLeftPanelCollapsed.value
}

// 切换预览面板折叠状态
const togglePreview = () => {
  isPreviewCollapsed.value = !isPreviewCollapsed.value
}

// 切换功能面板
const toggleFeaturePanel = () => {
  showFeaturePanel.value = !showFeaturePanel.value
}

// 关闭功能面板
const closeFeaturePanel = () => {
  showFeaturePanel.value = false
}

// 保存简历
const saveResume = () => {
  console.log('保存简历')
  // 这里可以添加保存逻辑
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
  background: #f5f5f5;
}

.left-panel {
  height: 100%;
  background: white;
  border-right: 1px solid var(--border-color);
  transition: width 0.3s ease;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
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
  background: #f5f5f5;
}

.editor-container::-webkit-scrollbar {
  width: 6px;
}

.editor-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.editor-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.editor-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.right-panel {
  height: 100%;
  background: white;
  border-left: 1px solid var(--border-color);
  transition: width 0.3s ease;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

.right-panel.collapsed {
  width: 60px;
}

/* 功能面板样式 */
.feature-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.feature-panel-wrapper {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
}

/* 悬浮按钮 */
.floating-actions {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.action-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: #165DFF;
  color: white;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #0a4fd0;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
  
  .floating-actions {
    bottom: 20px;
    right: 20px;
  }
  
  .action-btn {
    width: 45px;
    height: 45px;
    font-size: 16px;
  }
}
</style>