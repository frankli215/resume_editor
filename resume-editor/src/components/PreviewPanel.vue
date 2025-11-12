<template>
  <div class="preview-panel">
    <!-- 折叠状态 -->
    <div v-if="isCollapsed" class="collapsed-view">
      <button class="expand-btn" @click="toggleCollapse" title="展开预览">
        ←
      </button>
    </div>
    
    <!-- 展开状态 -->
    <div v-else class="expanded-view">
      <!-- 顶部工具栏 -->
      <div class="preview-toolbar">
        <div class="toolbar-left">
          <span class="toolbar-title">实时预览</span>
          <div class="scale-selector">
            <select v-model="scale" class="scale-select">
              <option value="0.5">50%</option>
              <option value="0.75">75%</option>
              <option value="1">100%</option>
              <option value="1.25">125%</option>
              <option value="1.5">150%</option>
            </select>
          </div>
        </div>
        <div class="toolbar-right">
          <button class="toolbar-btn" @click="checkATS">ATS 检查</button>
          <button class="toolbar-btn primary" @click="printPreview">打印预览</button>
          <button class="collapse-btn" @click="toggleCollapse" title="收起预览">
            →
          </button>
        </div>
      </div>
      
      <!-- 预览主体 -->
      <div class="preview-container">
        <div 
          class="preview-content" 
          :style="{ 
            transform: `scale(${scale})`,
            width: '210mm',
            minHeight: '297mm'
          }"
        >
          <div class="resume-preview">
            <!-- 基础信息预览 -->
            <BasicInfoPreview 
              v-if="isModuleEnabled('basic-info') && resumeData.basicInfo && (resumeData.basicInfo.name || resumeData.basicInfo.phone || resumeData.basicInfo.email || resumeData.basicInfo.address)" 
              :data="resumeData.basicInfo" 
            />
            
            <!-- 求职意向预览 -->
            <JobIntentionPreview 
              v-if="isModuleEnabled('job-intention') && resumeData.jobIntention && (resumeData.jobIntention.position || resumeData.jobIntention.industry || resumeData.jobIntention.salary)" 
              :data="resumeData.jobIntention" 
            />
            
            <!-- 工作经历预览 -->
            <WorkExperiencePreview 
              v-if="isModuleEnabled('work-experience')" 
              :data="resumeData.workExperience" 
            />
            
            <!-- 教育经历预览 -->
            <EducationPreview 
              v-if="isModuleEnabled('education') && resumeData.education && resumeData.education.length > 0" 
              :data="resumeData.education" 
            />
            
            <!-- 项目经历预览 -->
            <ProjectPreview 
              v-if="isModuleEnabled('project') && resumeData.project && resumeData.project.length > 0" 
              :data="resumeData.project" 
            />
            
            <!-- 技能证书预览 -->
            <SkillsPreview 
              v-if="isModuleEnabled('skills') && resumeData.skills" 
              :data="resumeData.skills" 
            />
            
            <!-- 自我评价预览 -->
            <SelfEvaluationPreview 
              v-if="isModuleEnabled('self-evaluation') && resumeData.selfEvaluation && resumeData.selfEvaluation.content" 
              :data="resumeData.selfEvaluation" 
            />
          </div>
        </div>
      </div>
      
      <!-- 分页提示 -->
      <div class="pagination-info">
        第 1 页 / 共 1 页
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useResumeStore } from '../stores/resume'
import BasicInfoPreview from './previews/BasicInfoPreview.vue'
import JobIntentionPreview from './previews/JobIntentionPreview.vue'
import WorkExperiencePreview from './previews/WorkExperiencePreview.vue'
import EducationPreview from './previews/EducationPreview.vue'
import ProjectPreview from './previews/ProjectPreview.vue'
import SkillsPreview from './previews/SkillsPreview.vue'
import SelfEvaluationPreview from './previews/SelfEvaluationPreview.vue'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-collapse'])

// 使用简历存储
const resumeStore = useResumeStore()

// 预览比例
const scale = ref(1)

// 简历数据
const resumeData = computed(() => ({
  basicInfo: resumeStore.basicInfo,
  jobIntention: resumeStore.jobIntention,
  workExperience: resumeStore.workExperience,
  education: resumeStore.education,
  project: resumeStore.project,
  skills: resumeStore.skills,
  selfEvaluation: resumeStore.selfEvaluation
}))

// 检查模块是否启用
const isModuleEnabled = (moduleId) => {
  const module = resumeStore.modules.find(m => m.id === moduleId)
  return module ? module.enabled : false
}

// 切换折叠状态
const toggleCollapse = () => {
  emit('toggle-collapse')
}

// ATS检查
const checkATS = () => {
  alert('ATS检查功能待实现')
}

// 打印预览
const printPreview = () => {
  alert('打印预览功能待实现')
}
</script>

<style scoped>
.preview-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #F9F9F9;
}

.collapsed-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.expand-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expanded-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.preview-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
}

.scale-select {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 4px 8px;
  background: white;
  font-size: 12px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-btn {
  border: 1px solid var(--border-color);
  background: white;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
}

.toolbar-btn.primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.collapse-btn {
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

.collapse-btn:hover {
  background: #f5f5f5;
}

.preview-container {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
}

.preview-content {
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform-origin: center top;
  margin: 0 auto;
  position: relative;
}

.resume-preview {
  width: 210mm;
  min-height: 297mm;
  padding: 2cm;
  background: white;
  font-family: Arial, "宋体", sans-serif;
  font-size: 10.5pt;
  line-height: 1.5;
  color: black;
}

.resume-header {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
}

.name {
  font-size: 24pt;
  margin: 0 0 10px 0;
}

.contact-info {
  font-size: 10.5pt;
}

.section {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14pt;
  border-left: 4px solid var(--primary-color);
  padding-left: 8px;
  margin: 15px 0 10px 0;
}

.experience-item, .education-item {
  margin-bottom: 10px;
}

.experience-header, .education-header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 5px;
}

.company, .school {
  font-weight: bold;
  margin: 0;
}

.position, .major, .degree, .time {
  font-size: 10pt;
}

.experience-description, .evaluation-content {
  font-size: 10.5pt;
}

.experience-description ul, .evaluation-content ul {
  padding-left: 20px;
}

.experience-description li, .evaluation-content li {
  margin-bottom: 3px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.skills-list li {
  background: #f0f0f0;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 10pt;
}

.pagination-info {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>