import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index.js'
import './assets/styles/main.css'

// 初始化简历数据
import { useResumeStore } from './stores/resume.js'

const app = createApp(App)

app.use(pinia)

// 初始化简历存储
const resumeStore = useResumeStore()
resumeStore.initializeData()

app.mount('#app')