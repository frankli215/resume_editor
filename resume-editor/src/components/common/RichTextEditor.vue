<template>
  <div class="rich-text-editor">
    <div 
      v-show="showToolbar" 
      class="toolbar"
      ref="toolbarRef"
    >
      <button 
        class="toolbar-btn" 
        :class="{ active: isBold }"
        @click="toggleBold"
        title="加粗"
      >
        <strong>B</strong>
      </button>
      <button 
        class="toolbar-btn" 
        :class="{ active: isItalic }"
        @click="toggleItalic"
        title="斜体"
      >
        <em>I</em>
      </button>
      <button 
        class="toolbar-btn" 
        :class="{ active: isUnderline }"
        @click="toggleUnderline"
        title="下划线"
      >
        <u>U</u>
      </button>
      <button 
        class="toolbar-btn" 
        @click="insertUnorderedList"
        title="无序列表"
      >
        ・
      </button>
      <button 
        class="toolbar-btn" 
        @click="insertOrderedList"
        title="有序列表"
      >
        1.
      </button>
      <button 
        class="toolbar-btn" 
        @click="removeFormat"
        title="清除格式"
      >
        ×
      </button>
    </div>
    
    <div 
      ref="editorRef"
      class="editor"
      :class="{ focused: isFocused }"
      contenteditable
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @paste="handlePaste"
      v-html="modelValue"
    ></div>
    
    <div v-if="showPasteNotice" class="paste-notice">
      已去除外部格式，避免排版错乱
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  maxLength: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['update:modelValue'])

// 元素引用
const editorRef = ref(null)
const toolbarRef = ref(null)

// 状态
const isFocused = ref(false)
const showToolbar = ref(false)
const showPasteNotice = ref(false)

// 格式状态
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)

// 处理输入
const handleInput = () => {
  if (!editorRef.value) return
  
  const content = editorRef.value.innerHTML
  emit('update:modelValue', content)
  
  // 更新格式状态
  updateFormatState()
}

// 处理焦点
const handleFocus = () => {
  isFocused.value = true
  showToolbar.value = true
  updateFormatState()
}

// 处理失去焦点
const handleBlur = (event) => {
  // 检查是否是点击工具栏导致的失去焦点
  if (toolbarRef.value && toolbarRef.value.contains(event.relatedTarget)) {
    setTimeout(() => {
      if (editorRef.value) {
        editorRef.value.focus()
      }
    }, 0)
    return
  }
  
  isFocused.value = false
  showToolbar.value = false
}

// 处理粘贴
const handlePaste = (event) => {
  event.preventDefault()
  
  // 获取纯文本内容
  let text = (event.clipboardData || window.clipboardData).getData('text/plain')
  
  // 限制长度
  const currentLength = getTextLength()
  const availableLength = props.maxLength - currentLength
  if (availableLength <= 0) return
  
  if (text.length > availableLength) {
    text = text.substring(0, availableLength)
  }
  
  // 插入纯文本
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(document.createTextNode(text))
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  
  // 触发输入事件
  handleInput()
  
  // 显示提示
  showPasteNotice.value = true
  setTimeout(() => {
    showPasteNotice.value = false
  }, 3000)
}

// 获取文本长度（不包含HTML标签）
const getTextLength = () => {
  if (!editorRef.value) return 0
  return editorRef.value.textContent.length
}

// 更新格式状态
const updateFormatState = () => {
  const selection = window.getSelection()
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const parentElement = range.commonAncestorContainer.parentElement || range.commonAncestorContainer
    
    isBold.value = document.queryCommandState('bold')
    isItalic.value = document.queryCommandState('italic')
    isUnderline.value = document.queryCommandState('underline')
  }
}

// 切换加粗
const toggleBold = () => {
  document.execCommand('bold', false, null)
  updateFormatState()
  handleInput()
}

// 切换斜体
const toggleItalic = () => {
  document.execCommand('italic', false, null)
  updateFormatState()
  handleInput()
}

// 切换下划线
const toggleUnderline = () => {
  document.execCommand('underline', false, null)
  updateFormatState()
  handleInput()
}

// 插入无序列表
const insertUnorderedList = () => {
  document.execCommand('insertUnorderedList', false, null)
  handleInput()
}

// 插入有序列表
const insertOrderedList = () => {
  document.execCommand('insertOrderedList', false, null)
  handleInput()
}

// 清除格式
const removeFormat = () => {
  document.execCommand('removeFormat', false, null)
  handleInput()
}

// 点击外部隐藏工具栏
const handleClickOutside = (event) => {
  if (
    editorRef.value && 
    !editorRef.value.contains(event.target) && 
    toolbarRef.value && 
    !toolbarRef.value.contains(event.target)
  ) {
    showToolbar.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // 设置占位符
  if (editorRef.value && !props.modelValue) {
    editorRef.value.innerHTML = ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.rich-text-editor {
  position: relative;
}

.toolbar {
  position: absolute;
  top: -40px;
  left: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #F5F7FA;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px;
  z-index: 100;
  height: 36px;
}

.toolbar-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.toolbar-btn:hover {
  background: #DCDFE6;
}

.toolbar-btn.active {
  background: #E5E6EB;
}

.editor {
  min-height: 80px;
  max-height: 150px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
  background: white;
}

.editor:focus {
  outline: none;
  border-color: var(--primary-color);
}

.editor:empty:not(:focus)::before {
  content: attr(data-placeholder);
  color: var(--text-secondary);
  font-style: italic;
}

.paste-notice {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
}
</style>