import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    // 基础信息
    basicInfo: {
      name: '张三',
      phone: '138-0000-0000',
      email: 'zhangsan@example.com',
      address: '北京市朝阳区某某街道'
    },
    
    // 求职意向
    jobIntention: {
      position: '前端开发工程师',
      industry: '互联网/IT',
      salary: '15K-20K',
      city: '北京'
    },
    
    // 工作经历
    workExperience: [{
      company: '某某科技有限公司',
      position: '前端开发工程师',
      startDate: '2020-07',
      endDate: '至今',
      description: '<ul><li>负责公司官网和后台管理系统的前端开发工作，使用Vue.js框架开发响应式用户界面</li><li>与UI设计师和后端工程师紧密协作，确保项目按时交付并满足需求</li><li>优化网站性能，将页面加载速度提升30%，用户体验显著改善</li><li>参与代码审查和技术分享，提升团队整体技术水平</li></ul>'
    }],
    
    // 教育经历
    education: [{
      school: '某某大学',
      major: '计算机科学与技术',
      degree: '本科',
      startDate: '2016-09',
      endDate: '2020-06'
    }],
    
    // 项目经历
    project: [],
    
    // 技能证书
    skills: {
      skills: ['HTML/CSS', 'JavaScript', 'Vue.js', 'React', 'Node.js']
    },
    
    // 自我评价
    selfEvaluation: {
      content: '具备3年前端开发经验，熟练掌握Vue.js和React框架，有丰富的Web应用开发经验。具备良好的沟通能力和团队协作精神，能够快速适应新环境并承担工作压力。'
    },
    
    // 模块配置
    modules: [
      { id: 'basic-info', name: '基础信息', icon: '👤', type: 'core', required: true, enabled: true, incomplete: true },
      { id: 'job-intention', name: '求职意向', icon: '🎯', type: 'core', required: true, enabled: true, incomplete: true },
      { id: 'work-experience', name: '工作经历', icon: '💼', type: 'experience', required: false, enabled: true, incomplete: false },
      { id: 'education', name: '教育经历', icon: '🎓', type: 'experience', required: false, enabled: true, incomplete: false },
      { id: 'project', name: '项目经历', icon: '📁', type: 'experience', required: false, enabled: false, incomplete: false },
      { id: 'skills', name: '技能证书', icon: '🔧', type: 'additional', required: false, enabled: true, incomplete: true },
      { id: 'self-evaluation', name: '自我评价', icon: '💬', type: 'additional', required: false, enabled: false, incomplete: false }
    ],
    
    // 模块顺序
    moduleOrder: [
      'basic-info',
      'job-intention',
      'work-experience',
      'education',
      'project',
      'skills',
      'self-evaluation'
    ]
  }),
  
  getters: {
    // 获取启用的模块
    enabledModules: (state) => {
      return state.modules.filter(module => module.enabled)
    },
    
    // 获取按顺序排列的启用模块
    orderedEnabledModules: (state) => {
      return state.moduleOrder
        .map(id => state.modules.find(module => module.id === id))
        .filter(module => module && module.enabled)
    },
    
    // 检查模块是否必选
    isRequiredModule: (state) => (moduleId) => {
      const module = state.modules.find(m => m.id === moduleId)
      return module ? module.required : false
    }
  },
  
  actions: {
    // 更新基础信息
    updateBasicInfo(data) {
      this.basicInfo = { ...this.basicInfo, ...data }
      this.checkBasicInfoCompletion()
    },
    
    // 检查基础信息是否完整
    checkBasicInfoCompletion() {
      const module = this.modules.find(m => m.id === 'basic-info')
      if (module) {
        module.incomplete = !this.basicInfo.name || !this.basicInfo.phone
      }
    },
    
    // 更新求职意向
    updateJobIntention(data) {
      this.jobIntention = { ...this.jobIntention, ...data }
      this.checkJobIntentionCompletion()
    },
    
    // 检查求职意向是否完整
    checkJobIntentionCompletion() {
      const module = this.modules.find(m => m.id === 'job-intention')
      if (module) {
        module.incomplete = !this.jobIntention.position || !this.jobIntention.industry
      }
    },
    
    // 添加工作经历
    addWorkExperience(entry = {}) {
      this.workExperience.push({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        ...entry
      })
      this.checkWorkExperienceCompletion()
    },
    
    // 更新工作经历
    updateWorkExperience(index, data) {
      if (this.workExperience[index]) {
        this.workExperience[index] = { ...this.workExperience[index], ...data }
        this.checkWorkExperienceCompletion()
      }
    },
    
    // 删除工作经历
    deleteWorkExperience(index) {
      this.workExperience.splice(index, 1)
      this.checkWorkExperienceCompletion()
    },
    
    // 检查工作经历是否完整
    checkWorkExperienceCompletion() {
      const module = this.modules.find(m => m.id === 'work-experience')
      if (module) {
        module.incomplete = module.enabled && this.workExperience.length === 0
      }
    },
    
    // 添加教育经历
    addEducation(entry = {}) {
      this.education.push({
        school: '',
        major: '',
        degree: '',
        startDate: '',
        endDate: '',
        ...entry
      })
      this.checkEducationCompletion()
    },
    
    // 更新教育经历
    updateEducation(index, data) {
      if (this.education[index]) {
        this.education[index] = { ...this.education[index], ...data }
        this.checkEducationCompletion()
      }
    },
    
    // 删除教育经历
    deleteEducation(index) {
      this.education.splice(index, 1)
      this.checkEducationCompletion()
    },
    
    // 检查教育经历是否完整
    checkEducationCompletion() {
      const module = this.modules.find(m => m.id === 'education')
      if (module) {
        module.incomplete = module.enabled && this.education.length === 0
      }
    },
    
    // 添加项目经历
    addProject(entry = {}) {
      this.project.push({
        name: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
        ...entry
      })
      this.checkProjectCompletion()
    },
    
    // 更新项目经历
    updateProject(index, data) {
      if (this.project[index]) {
        this.project[index] = { ...this.project[index], ...data }
        this.checkProjectCompletion()
      }
    },
    
    // 删除项目经历
    deleteProject(index) {
      this.project.splice(index, 1)
      this.checkProjectCompletion()
    },
    
    // 检查项目经历是否完整
    checkProjectCompletion() {
      const module = this.modules.find(m => m.id === 'project')
      if (module) {
        module.incomplete = module.enabled && this.project.length === 0
      }
    },
    
    // 更新技能证书
    updateSkills(data) {
      this.skills = { ...this.skills, ...data }
      this.checkSkillsCompletion()
    },
    
    // 检查技能证书是否完整
    checkSkillsCompletion() {
      const module = this.modules.find(m => m.id === 'skills')
      if (module) {
        module.incomplete = module.enabled && this.skills.skills.length < 3
      }
    },
    
    // 更新自我评价
    updateSelfEvaluation(data) {
      this.selfEvaluation = { ...this.selfEvaluation, ...data }
      this.checkSelfEvaluationCompletion()
    },
    
    // 检查自我评价是否完整
    checkSelfEvaluationCompletion() {
      const module = this.modules.find(m => m.id === 'self-evaluation')
      if (module) {
        module.incomplete = module.enabled && !this.selfEvaluation.content
      }
    },
    
    // 切换模块启用状态
    toggleModuleEnabled(moduleId) {
      const module = this.modules.find(m => m.id === moduleId)
      if (module && !module.required) {
        module.enabled = !module.enabled
        
        // 检查对应模块的完整性
        switch (moduleId) {
          case 'work-experience':
            this.checkWorkExperienceCompletion()
            break
          case 'education':
            this.checkEducationCompletion()
            break
          case 'project':
            this.checkProjectCompletion()
            break
          case 'skills':
            this.checkSkillsCompletion()
            break
          case 'self-evaluation':
            this.checkSelfEvaluationCompletion()
            break
        }
      }
    },
    
    // 更新模块顺序
    updateModuleOrder(newOrder) {
      // 只更新相同模块的顺序
      const validIds = new Set(this.modules.map(m => m.id))
      this.moduleOrder = newOrder.filter(id => validIds.has(id))
    },
    
    // 初始化数据
    initializeData() {
      // 初始化时检查所有模块的完整性
      this.checkBasicInfoCompletion()
      this.checkJobIntentionCompletion()
      this.checkWorkExperienceCompletion()
      this.checkEducationCompletion()
      this.checkProjectCompletion()
      this.checkSkillsCompletion()
      this.checkSelfEvaluationCompletion()
    }
  }
})