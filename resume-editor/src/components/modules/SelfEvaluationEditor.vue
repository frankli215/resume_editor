<template>
  <div class="self-evaluation-editor">
    <div class="form-group">
      <RichTextEditor 
        v-model="localData.content"
        @update:modelValue="handleContentChange"
        :max-length="500"
        placeholder="请描述您的专业技能、工作态度、团队协作能力等（建议200-500字）"
      />
      <div 
        class="char-count" 
        :class="{ warning: getContentLength() > 500 }"
      >
        {{ getContentLength() }}/500 字
        <span v-if="getContentLength() > 500">（内容过长，建议精简至500字内）</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import RichTextEditor from '../common/RichTextEditor.vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      content: ''
    })
  }
})

const emit = defineEmits(['update'])

// 本地数据副本
const localData = ref({ 
  content: props.data.content || '具备3年前端开发经验，熟练掌握Vue.js和React框架，有丰富的Web应用开发经验。具备良好的沟通能力和团队协作精神，能够快速适应新环境并承担工作压力。'
})

// 监听数据变化
watch(
  () => props.data,
  (newData) => {
    localData.value = { 
      content: newData.content || '具备3年前端开发经验，熟练掌握Vue.js和React框架，有丰富的Web应用开发经验。具备良好的沟通能力和团队协作精神，能够快速适应新环境并承担工作压力.'
    }
  },
  { deep: true }
)

// 处理内容变化
const handleContentChange = (value) => {
  emit('update', { content: value })
}

// 获取内容长度
const getContentLength = () => {
  return localData.value.content ? localData.value.content.replace(/<[^>]*>/g, '').length : 0
}
</script>

<style scoped>
.self-evaluation-editor {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.char-count {
  font-size: 12px;
  color: var(--text-secondary);
}

.char-count.warning {
  color: var(--error-color);
}
</style>