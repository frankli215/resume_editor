<template>
  <div class="skills-editor">
    <div class="form-group">
      <label class="form-label">技能列表</label>
      <div class="skills-input-container">
        <input 
          type="text" 
          class="form-input" 
          v-model="newSkill"
          placeholder="输入技能，按回车添加"
          @keyup.enter="addSkill"
        >
        <button class="add-skill-btn" @click="addSkill">添加</button>
      </div>
      
      <div class="skills-tags">
        <div 
          v-for="(skill, index) in localData.skills" 
          :key="index"
          class="skill-tag"
        >
          {{ skill }}
          <button class="remove-skill-btn" @click="removeSkill(index)">×</button>
        </div>
      </div>
      
      <div class="skills-count" :class="{ warning: localData.skills.length < 3 }">
        已添加 {{ localData.skills.length }} 项技能
        <span v-if="localData.skills.length < 3">（建议至少添加3项技能）</span>
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
      skills: []
    })
  }
})

// 使用简历存储
const resumeStore = useResumeStore()

// 本地数据副本
const localData = ref({ 
  skills: [...(resumeStore.skills?.skills || [])] 
})

// 新技能输入
const newSkill = ref('')

// 监听数据变化
watch(
  () => resumeStore.skills,
  (newData) => {
    localData.value.skills = [...(newData?.skills || [])]
  },
  { deep: true }
)

// 添加技能
const addSkill = () => {
  if (newSkill.value.trim() && !localData.value.skills.includes(newSkill.value.trim())) {
    const newSkills = [...localData.value.skills, newSkill.value.trim()]
    resumeStore.updateSkills({ skills: newSkills })
    newSkill.value = ''
  }
}

// 删除技能
const removeSkill = (index) => {
  const newSkills = [...localData.value.skills]
  newSkills.splice(index, 1)
  resumeStore.updateSkills({ skills: newSkills })
}
</script>

<style scoped>
.skills-editor {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--text-color);
}

.skills-input-container {
  display: flex;
  gap: 10px;
}

.form-input {
  flex: 1;
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

.add-skill-btn {
  padding: 8px 16px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-skill-btn:hover {
  background: #0a4fd0;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
}

.skill-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f0f0f0;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
}

.remove-skill-btn {
  width: 16px;
  height: 16px;
  border: none;
  background: #ccc;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-skill-btn:hover {
  background: #999;
}

.skills-count {
  font-size: 12px;
  color: var(--text-secondary);
}

.skills-count.warning {
  color: var(--warning-color);
}
</style>