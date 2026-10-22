<script setup>
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'
const router = useRouter()
const { events, totalEvents, activeEvents, completedEvents } = useEvents()
</script>
<template>
  <div class="dashboard-overview">
    <div class="dashboard-header"><div><h2>Organizer Analytics & Overview</h2><p>Monitor your event statistics and track status across all managed events.</p></div><AppButton @click="router.push('/dashboard/events')">🗂️ Manage Events →</AppButton></div>
    <div class="metrics-grid">
      <div class="metric-card"><h3>TOTAL EVENTS</h3><strong class="metric-value">{{ totalEvents }}</strong><p>All recorded events</p></div>
      <div class="metric-card"><h3>ACTIVE EVENTS</h3><strong class="metric-value metric-success">{{ activeEvents.length }}</strong><p>Live in public catalog</p></div>
      <div class="metric-card"><h3>COMPLETED EVENTS</h3><strong class="metric-value metric-muted">{{ completedEvents.length }}</strong><p>Archived completed events</p></div>
    </div>
    <div class="data-table-container"><div class="table-heading"><div><h3>Recent Events Status Overview</h3><p>Master registry of all events managed across the Gatherly platform.</p></div><button class="text-link" @click="router.push('/dashboard/events')">Open Event Management →</button></div>
      <table class="data-table"><thead><tr><th>EVENT TITLE</th><th>CATEGORY</th><th>DATE & LOCATION</th><th>QUOTA</th><th>STATUS</th></tr></thead>
      <tbody><tr v-if="events.length === 0"><td colspan="5"><div class="empty-table"><div class="empty-icon">📊</div><p>No events recorded in the system yet.</p><AppButton @click="router.push('/dashboard/events')">Create First Event</AppButton></div></td></tr>
      <tr v-for="item in events" :key="item.id"><td><strong>{{ item.title }}</strong></td><td><span class="category-badge">{{ item.cat }}</span></td><td>{{ item.date }}<small>{{ item.loc }}</small></td><td>{{ item.quota ?? 100 }}</td><td><span :class="['status-badge', item.done ? 'status-completed' : 'status-active']">{{ item.done ? 'Completed' : 'Active' }}</span></td></tr></tbody></table>
    </div>
  </div>
</template>
<style scoped>
.dashboard-overview{max-width:1280px;margin:auto}.dashboard-header,.table-heading{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:24px}.dashboard-header h2{font-size:1.9rem;margin:0 0 8px}.dashboard-header p,.table-heading p,.metric-card p{color:var(--text-muted);margin:0;font-size:.9rem}.metrics-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-bottom:24px}.metric-card,.data-table-container{background:white;border:1px solid var(--border-color);border-radius:12px;padding:24px;box-shadow:0 2px 9px rgba(0,0,0,.025)}.metric-card h3{font-size:.75rem;color:var(--text-muted);letter-spacing:.08em;margin:0 0 16px}.metric-value{display:block;font-size:2.5rem;color:var(--primary);margin-bottom:6px}.metric-success{color:#22a568}.metric-muted{color:#70778a}.data-table-container{overflow-x:auto}.table-heading h3{margin:0 0 8px}.text-link{border:0;background:transparent;color:var(--primary);font-weight:700;cursor:pointer;white-space:nowrap}.data-table{width:100%;border-collapse:collapse;min-width:640px}.data-table th,.data-table td{text-align:left;padding:15px 12px;border-bottom:1px solid var(--border-color);font-size:.88rem}.data-table th{font-size:.72rem;letter-spacing:.06em;color:var(--text-muted);background:#fafafb}.data-table td small{display:block;color:var(--text-muted);margin-top:5px}.status-badge,.category-badge{display:inline-flex;padding:5px 10px;border-radius:7px;font-size:.78rem;font-weight:700}.category-badge{background:#f1edff;color:var(--primary)}.status-active{background:#dcfce7;color:#15803d}.status-completed{background:#f1f2f4;color:#687081}.empty-table{text-align:center;padding:38px 12px}.empty-table p{color:var(--text-muted)}.empty-icon{font-size:2.5rem;margin-bottom:8px}@media(max-width:850px){.metrics-grid{grid-template-columns:1fr}.dashboard-header,.table-heading{align-items:flex-start;flex-direction:column}}
</style>
