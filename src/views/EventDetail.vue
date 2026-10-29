<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
const route = useRoute()
const router = useRouter()
const { getEventById, isUserRegistered } = useEvents()
const registered = computed(() => isUserRegistered(route.params.id))
const event = computed(() => getEventById(route.params.id))
</script>
<template>
  <div class="event-detail-page">
    <button @click="router.push('/browse/events')" class="btn-back">← Back to Events</button>
    <template v-if="event">
      <div class="detail-header"><span class="event-tag">{{ event.cat }}</span><h1>{{ event.title }}</h1><div class="meta-info"><span class="meta-item">Date: {{ event.date }}</span><span class="meta-item">{{ event.loc }}</span><span class="meta-item">Remaining Quota: {{ event.quota }} Attendees</span></div></div>
      <div class="detail-content grid-asymmetric"><div class="main-desc"><h2>About This Event</h2><p style="white-space:pre-line">{{ event.desc }}</p></div><div class="sidebar"><AppCard class="ticket-card sticky-pane"><h3>Event Registration</h3><p v-if="registered" class="registered-message">You are registered for this event. Your booking is confirmed.</p><p v-if="!registered" class="ticket-desc">{{ event.done ? 'Registration is closed as this event has ended.' : 'Secure your spot now before the remaining quota is filled.' }}</p><button v-if="event.done" class="registration-closed" disabled>Registration Closed</button><template v-else-if="registered"><button class="registration-closed" disabled>Already Registered</button><button class="receipt-link" @click="router.push(`/browse/your-events/${event.id}`)">View Your Ticket Receipt →</button></template><button v-else-if="Number(event.quota) <= 0" class="registration-closed" disabled>Sold Out</button><AppButton v-else variant="primary" @click="router.push(`/browse/events/${event.id}/register`)">Register Now</AppButton><p v-if="!registered" class="spots">{{ event.done ? 'This event has been completed.' : registered ? 'Your registration is confirmed.' : Number(event.quota) <= 0 ? 'All seats are taken.' : `${event.quota} seats available` }}</p></AppCard></div></div>
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
  color: #16a34a;
  font-weight: 600;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .grid-asymmetric {
    grid-template-columns: 1fr;
  }
}
</style>

<style scoped>.meta-info{flex-wrap:wrap}.registration-closed{background:#d1d5db;color:#555;border:0;padding:12px 18px;border-radius:10px;cursor:not-allowed}.not-found-card{text-align:center;background:#fff;padding:55px 20px;border:1px solid var(--border-color);border-radius:12px}.not-found-card p{color:var(--text-muted);margin-bottom:25px}@media(max-width:750px){.grid-asymmetric{grid-template-columns:1fr}.detail-header h1{font-size:2rem}}.registered-message{color:#16a34a;font-size:.85rem;font-weight:700;text-align:center;line-height:1.5;margin:12px 0 18px}</style>
<style scoped>.receipt-link{display:block;border:0;background:transparent;color:var(--primary);font-weight:700;margin:12px auto;cursor:pointer}.registration-closed{width:100%}</style>

<style scoped>
.ticket-card{padding:28px 24px}.ticket-card h3{font-size:1.35rem;font-weight:700;margin-bottom:16px}.ticket-desc{font-size:.92rem;line-height:1.5;margin:10px 0 16px}.registered-message{color:#15803d;font-size:.88rem;font-weight:700;margin:12px 0 18px}.receipt-link{font-size:.9rem;color:#6545ff;margin:10px auto 0}.registration-closed{font-size:.95rem;font-weight:700}.spots{font-size:.85rem;margin-top:12px;color:#16a34a}.ticket-card :deep(.btn){width:100%}
</style>
