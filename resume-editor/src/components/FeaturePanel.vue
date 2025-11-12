<template>
  <div class="feature-panel">
    <div class="panel-header">
      <h2>功能面板</h2>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>
    <div class="panel-content">
      <div class="feature-item" @click="handleFeatureClick('export')">
        <div class="feature-icon">📤</div>
        <div class="feature-info">
          <h3>导出简历</h3>
          <p>将简历导出为PDF、Word等格式</p>
        </div>
      </div>
      <div class="feature-item" @click="handleFeatureClick('template')">
        <div class="feature-icon">📋</div>
        <div class="feature-info">
          <h3>模板管理</h3>
          <p>选择和管理简历模板</p>
        </div>
      </div>
      <div class="feature-item" @click="handleFeatureClick('settings')">
        <div class="feature-icon">⚙️</div>
        <div class="feature-info">
          <h3>设置</h3>
          <p>自定义编辑器设置</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])

const handleFeatureClick = (feature) => {
  console.log('功能点击:', feature)
  // 这里可以添加具体功能的处理逻辑
}
</script>

<style scoped>
.feature-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h2 {
  margin: 0;
  font-size: 18px;
  color: var(--text-color);
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-secondary);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-btn:hover {
  background: #f5f5f5;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feature-item:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-info h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: var(--text-color);
}

.feature-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}
</style>