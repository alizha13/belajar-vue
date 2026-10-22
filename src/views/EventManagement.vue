<script setup>
import { ref, reactive, computed } from 'vue'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
const { activeEvents, completedEvents, createEvent, completeEvent, deleteEvent } = useEvents()
const currentTab = ref('active')
const form = reactive({ title: '', cat: 'Workshop', date: '', loc: '', quota: '100', price: 'Free', desc: '' })
const errorMessage = ref('')
const successMessage = ref('')
const isModalOpen = ref(false)
const modalAction = ref('')
const selectedEvent = ref(null)
const modalTitle = computed(() => modalAction.value === 'complete' ? 'Complete Event?' : 'Delete Event Permanently?')
const modalMessage = computed(() => modalAction.value === 'complete' ? `Are you sure you want to mark "${selectedEvent.value?.title}" as completed? Once completed, the event will automatically be removed from public listings.` : `Are you sure you want to permanently delete "${selectedEvent.value?.title}"? This action cannot be undone and will permanently remove this event from all records.`)
const handleCompleteEvent = event => { selectedEvent.value = event; modalAction.value = 'complete'; isModalOpen.value = true }
const handleDeleteEvent = event => { selectedEvent.value = event; modalAction.value = 'delete'; isModalOpen.value = true }
const handleConfirmModal = () => {
  if (selectedEvent.value) {
    if (modalAction.value === 'complete') completeEvent(selectedEvent.value.id)
    else if (modalAction.value === 'delete') deleteEvent(selectedEvent.value.id)
  }
  isModalOpen.value = false
  selectedEvent.value = null
}
const formatEventDate = value => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-US', { month:'short', day:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }).format(date)
}
const handleCreateEvent = () => {
  errorMessage.value = ''
  successMessage.value = ''
  if (!form.title.trim() || !form.date.trim() || !form.loc.trim() || !form.desc.trim()) {
    errorMessage.value = 'Please fill in all required fields before publishing the event!'
    return
  }
  createEvent({ ...form, title: form.title.trim(), loc: form.loc.trim(), desc: form.desc.trim(), date: formatEventDate(form.date) })
  Object.assign(form, { title:'',cat:'Workshop',date:'',loc:'',quota:'100',price:'Free',desc:'' })
  currentTab.value = 'active'
  successMessage.value = 'Event published successfully and is now live!'
}
</script>
<template>
  <div class="event-management-page">
    <header class="page-header"><h2>Event Management Control</h2><p>Manage event lifecycle, publish new events, and archive completed records.</p></header>
    <div class="tab-container"><button :class="['tab-btn',{active:currentTab==='active'}]" @click="currentTab='active';successMessage=''">⚡ Active Events ({{ activeEvents.length }})</button><button :class="['tab-btn',{active:currentTab==='create'}]" @click="currentTab='create';successMessage=''">＋ Create Event</button><button :class="['tab-btn',{active:currentTab==='completed'}]" @click="currentTab='completed';successMessage=''">✅ Completed Events ({{ completedEvents.length }})</button></div>
    <p v-if="successMessage" class="alert-success">✅ {{ successMessage }}</p>
    <div v-if="currentTab==='active'" class="event-grid"><article v-for="item in activeEvents" :key="item.id" class="event-card"><div class="card-top"><span class="tag">{{ item.cat }}</span><span class="status-badge status-active">Active</span></div><h3>{{ item.title }}</h3><p class="event-meta">📅 {{ item.date }}<br />{{ item.loc }}</p><p class="event-description">{{ item.desc }}</p><div class="card-actions"><button class="btn-complete" @click="handleCompleteEvent(item)">✅ Complete Event</button><button class="btn-delete" @click="handleDeleteEvent(item)">🗑 Delete</button></div></article><div v-if="activeEvents.length===0" class="empty-state"><div class="empty-icon">📭</div><h3>No Active Events Yet</h3><p>All active events have ended or none have been created yet. Please create a new event!</p><AppButton @click="currentTab='create'">＋ Create Your First Event</AppButton></div></div>
    <div v-else-if="currentTab==='create'" class="form-card"><h3>Create New Event Form</h3><p>Information entered here will be instantly published to the Gatherly public catalog.</p><div v-if="errorMessage" class="alert-error">⚠️ {{ errorMessage }}</div><form @submit.prevent="handleCreateEvent" novalidate><div class="form-row"><label>Event Title <span>*</span><input v-model="form.title" type="text" placeholder="e.g. Modern UI/UX Masterclass" /></label></div><div class="form-row two-col"><label>Event Category <span>*</span><select v-model="form.cat"><option v-for="cat in ['Workshop','Meetup','Competition','Seminar','Conference']" :key="cat">{{ cat }}</option></select></label><label>Date &amp; Time <span>*</span><input v-model="form.date" type="datetime-local" /></label></div><div class="form-row two-col"><label>Venue / Location <span>*</span><input v-model="form.loc" placeholder="e.g. Innovation Center, Jakarta" /></label><label>Attendee Quota<input v-model="form.quota" type="number" min="1" /></label></div><div class="form-row"><label>Event Description <span>*</span><textarea v-model="form.desc" rows="5" placeholder="Describe the agenda, speakers, and key takeaways..."></textarea></label></div><div class="form-actions"><button type="button" class="btn-secondary" @click="currentTab='active'">Cancel</button><button type="submit" class="btn-primary">🚀 Publish Event Now</button></div></form></div>
    <div v-else class="event-grid"><article v-for="item in completedEvents" :key="item.id" class="event-card completed"><div class="card-top"><span class="tag">{{ item.cat }}</span><span class="status-badge status-completed">Completed</span></div><h3>{{ item.title }}</h3><p class="event-meta">📅 {{ item.date }}<br />{{ item.loc }}</p><p class="event-description">{{ item.desc }}</p><div class="card-actions"><button class="btn-delete" @click="handleDeleteEvent(item)">🗑 Delete</button></div></article><div v-if="completedEvents.length===0" class="empty-state"><div class="empty-icon">📦</div><h3>No Completed Events Yet</h3><p>Completed events will be archived here after they are marked as finished.</p></div></div>
    <AppModal :is-open="isModalOpen" :title="modalTitle" :message="modalMessage" :confirm-text="modalAction==='complete' ? 'Yes, Complete' : 'Yes, Delete Permanently'" @close="isModalOpen=false" @confirm="handleConfirmModal" />
  </div>
</template>
<style scoped>
.event-management-page{max-width:1250px;margin:auto}.page-header h2{font-size:1.9rem;margin:0 0 10px}.page-header p,.form-card>p{color:var(--text-muted);font-size:.9rem;margin:0 0 26px}.tab-container{display:flex;gap:12px;flex-wrap:wrap;border-bottom:1px solid var(--border-color);margin-bottom:24px;padding-bottom:12px}.tab-btn{border:0;background:transparent;color:var(--text-muted);padding:12px 18px;border-radius:8px;cursor:pointer;font-weight:650}.tab-btn.active{background:var(--primary);color:white;box-shadow:0 5px 12px rgba(102,68,255,.2)}.event-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}.event-card,.form-card,.empty-state{background:#fff;border:1px solid var(--border-color);border-radius:12px;padding:24px;box-shadow:0 3px 12px rgba(0,0,0,.03)}.event-card h3{font-size:1.15rem;margin:16px 0 10px}.card-top{display:flex;justify-content:space-between;align-items:center;gap:8px}.tag,.status-badge{border-radius:7px;padding:5px 10px;font-size:.75rem;font-weight:700}.tag{background:#eee9ff;color:var(--primary)}.status-active{background:#dcfce7;color:#15803d}.status-completed{background:#eef0f3;color:#64748b}.event-meta,.event-description{color:var(--text-muted);font-size:.86rem;line-height:1.7}.event-description{flex:1;white-space:pre-wrap}.event-card{display:flex;flex-direction:column}.card-actions{display:flex;gap:10px;margin-top:15px;border-top:1px solid var(--border-color);padding-top:18px;flex-wrap:wrap}.card-actions button,.form-actions button{padding:11px 16px;cursor:pointer;border-radius:8px;font-weight:700}.btn-complete{color:#16814d;background:#ecfdf3;border:1px solid #bbf7d0}.btn-delete{background:#fff1f2;color:#dc3545;border:1px solid #fecdd3}.completed h3{text-decoration:line-through;color:#858b99}.empty-state{text-align:center;grid-column:1/-1;padding:46px 20px}.empty-icon{font-size:2.7rem}.empty-state p{color:var(--text-muted);margin:12px auto 22px;max-width:450px}.form-card{max-width:850px}.form-card h3{margin:0 0 8px}.form-row{margin-bottom:18px}.form-row label{font-size:.88rem;font-weight:700;display:block}.form-row label span{color:#dc3545}.form-row input,.form-row select,.form-row textarea{font:inherit;width:100%;border:1px solid var(--border-color);padding:13px 14px;border-radius:8px;margin-top:8px;outline:0;background:white}.form-row input:focus,.form-row select:focus,.form-row textarea:focus{border-color:var(--primary)}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}.form-actions{display:flex;justify-content:flex-end;gap:12px;margin-top:24px}.btn-primary{border:0;background:var(--primary);color:white}.btn-secondary{border:1px solid var(--border-color);background:white;color:var(--text-main)}.alert-error,.alert-success{padding:14px 16px;border-radius:8px;margin-bottom:20px;font-size:.88rem}.alert-error{background:#fee2e2;color:#a82020}.alert-success{background:#dcfce7;color:#16803d}@media(max-width:650px){.two-col{grid-template-columns:1fr}}
</style>
