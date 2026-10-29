<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import AppModal from '@/components/ui/AppModal.vue'
import RegistrationSummary from '@/components/event/RegistrationSummary.vue'
import RegistrationForm from '@/components/event/RegistrationForm.vue'
import RegistrationReceipt from '@/components/event/RegistrationReceipt.vue'
const route = useRoute(), router = useRouter()
const { getEventById, isUserRegistered } = useEvents()
const event = computed(() => getEventById(route.params.id))
const alreadyRegistered = computed(() => isUserRegistered(route.params.id))
const isSuccessModalOpen = ref(false), confirmedData = ref(null)
function handleRegistrationSuccess(record) { confirmedData.value = record; isSuccessModalOpen.value = true }
function handleGoToCatalog() { isSuccessModalOpen.value = false; router.push('/browse/events') }
function handleGoToYourEvents() { isSuccessModalOpen.value = false; router.push('/browse/your-events') }
function handleGoBack() { router.push(`/browse/events/${route.params.id}`) }
</script>
<template><div class="registration-page"><div v-if="!event" class="notice-card"><h2>Event Not Found</h2><p>The event you are looking for is unavailable or has been removed.</p><button class="btn-primary" @click="router.push('/browse/events')">Back to Event Catalog</button></div><div v-else-if="alreadyRegistered" class="notice-card"><span class="notice-badge">ALREADY REGISTERED</span><h2>You're already registered!</h2><p>Your registration is confirmed. You can view your ticket anytime.</p><button class="btn-primary" @click="router.push('/browse/your-events')">View Your Events</button></div><div v-else-if="event.done || Number(event.quota) <= 0" class="notice-card"><h2>Registration Closed</h2><p>This event is currently unavailable for registration.</p><button class="btn-primary" @click="handleGoBack">Back to Event Detail</button></div><div v-else class="registration-grid"><RegistrationSummary :event="event" @back="handleGoBack"/><RegistrationForm :event="event" @success="handleRegistrationSuccess" @cancel="handleGoBack"/></div><AppModal :is-open="isSuccessModalOpen" title="Registration Confirmed" variant="success" :show-cancel="false" @close="handleGoToYourEvents"><RegistrationReceipt v-if="confirmedData && event" :record="confirmedData" :event="event"/><template #footer><div class="success-actions"><button class="btn-outline" @click="handleGoToCatalog">Back to Event Catalog</button><button class="btn-primary" @click="handleGoToYourEvents">Go to Your Events</button></div></template></AppModal></div></template>
<style scoped>.registration-page{padding:32px 0;max-width:1160px;margin:auto}.registration-grid{display:grid;grid-template-columns:360px 1fr;gap:32px;align-items:start}.notice-card{max-width:640px;margin:40px auto;text-align:center;background:#fff;border:1px solid var(--border-color);border-radius:12px;padding:40px}.notice-card p{color:var(--text-muted);margin:18px 0}.notice-badge{background:#dcfce7;color:#15803d;padding:6px 10px;font-weight:700;font-size:.75rem}.success-actions{display:flex;gap:12px;justify-content:flex-end;flex-wrap:wrap}.btn-primary,.btn-outline{padding:12px 18px;border-radius:8px;font-weight:700;cursor:pointer}.btn-primary{background:var(--primary);border:0;color:white}.btn-outline{background:white;border:1px solid var(--border-color);color:var(--text-main)}@media(max-width:900px){.registration-grid{grid-template-columns:1fr}}</style>
