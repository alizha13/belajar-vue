<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
const route = useRoute()
const router = useRouter()
const { getEventById } = useEvents()
const registered = ref(false)
const event = computed(() => getEventById(route.params.id))
</script>
<template>
  <div class="event-detail-page">
    <button @click="router.push('/browse/events')" class="btn-back">← Back to Events</button>
    <template v-if="event">
      <div class="detail-header"><span class="event-tag">{{ event.cat }}</span><h1>{{ event.title }}</h1><div class="meta-info"><span class="meta-item">📅 {{ event.date }}</span><span class="meta-item">{{ event.loc }}</span><span class="meta-item">👥 Quota: {{ event.quota || 100 }} Attendees</span></div></div>
      <div class="detail-content grid-asymmetric"><div class="main-desc"><h2>About This Event</h2><p style="white-space:pre-line">{{ event.desc }}</p></div><div class="sidebar"><AppCard class="ticket-card sticky-pane"><h3>Attendee Registration</h3><p class="price">{{ event.done ? 'Registration Closed' : (event.price || 'Free') }}</p><p class="ticket-desc">{{ event.done ? 'Registration is closed as this event has ended.' : 'Secure your seat now before the quota is full.' }}</p><AppButton v-if="!event.done" variant="primary" @click="registered = true">Register Now</AppButton><button v-else class="registration-closed" disabled>Registration Closed</button><p v-if="registered" class="spots">Registration successfully received!</p><p v-else class="spots">{{ event.done ? 'This event has been completed.' : `${event.quota || 100} spots available` }}</p></AppCard></div></div>
    </template>
    <div v-else class="not-found-card"><h2>404 - Event Not Found</h2><p>The event you are looking for is unavailable or has been removed by the organizer.</p><AppButton @click="router.push('/browse/events')">Back to Event Catalog</AppButton></div>
  </div>
</template>
<style scoped>
.btn-back {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: var(--space-6);
  color: var(--text-muted);
}
.detail-header {
  background: var(--bg-light);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  padding: var(--space-12) var(--space-8);
  margin-bottom: var(--space-8);
}
.event-tag {
  display: inline-block;
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: var(--space-4);
}
.detail-header h1 {
  font-size: 2.8rem;
  margin-bottom: var(--space-4);
  line-height: 1.2;
}
.meta-info {
  display: flex;
  gap: var(--space-6);
}
.meta-item {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 1.05rem;
}

.grid-asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-12);
}

.main-desc h2 {
  margin-bottom: var(--space-4);
  font-size: 1.8rem;
  border-left: 4px solid var(--primary);
  padding-left: var(--space-2);
}
.main-desc p {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  font-size: 1.05rem;
}
.agenda-list {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-8) 0;
}
.agenda-list li {
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 1.05rem;
}

.ticket-card {
  padding: var(--space-8);
  text-align: center;
}

.sticky-pane {
  position: sticky;
  top: 100px;
}

.ticket-card h3 {
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
}
.price {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: var(--space-2);
}
.ticket-desc {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.btn-register {
  width: 100%;
}
.spots {
  margin-top: var(--space-4);
  color: #e63946;
  font-weight: 600;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .grid-asymmetric {
    grid-template-columns: 1fr;
  }
}
</style>

<style scoped>.meta-info{flex-wrap:wrap}.registration-closed{background:#d1d5db;color:#555;border:0;padding:12px 18px;border-radius:10px;cursor:not-allowed}.not-found-card{text-align:center;background:#fff;padding:55px 20px;border:1px solid var(--border-color);border-radius:12px}.not-found-card p{color:var(--text-muted);margin-bottom:25px}@media(max-width:750px){.grid-asymmetric{grid-template-columns:1fr}.detail-header h1{font-size:2rem}}</style>