import { ref, computed, watch } from 'vue'
const EVENTS_STORAGE_KEY = 'gatherly_events'
const REGISTRATIONS_STORAGE_KEY = 'gatherly_user_registrations'
const readStorage = (key) => { try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] } }
const events = ref(readStorage(EVENTS_STORAGE_KEY))
const userRegistrations = ref(readStorage(REGISTRATIONS_STORAGE_KEY))
watch(events, value => localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(value)), { deep: true })
watch(userRegistrations, value => localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(value)), { deep: true })
export function useEvents() {
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter(e => !e.done))
  const completedEvents = computed(() => events.value.filter(e => e.done))
  const createEvent = eventData => {
    const newEvent = { id: Date.now(), title: eventData.title, cat: eventData.cat, date: eventData.date, loc: eventData.loc.startsWith('📍') ? eventData.loc : `📍 ${eventData.loc}`, quota: Math.max(1, Number(eventData.quota) || 100), price: eventData.price || 'Free', desc: eventData.desc, done: false }
    events.value.unshift(newEvent)
    return newEvent
  }
  const completeEvent = id => { const event = events.value.find(e => e.id === Number(id)); if (event) event.done = true }
  const deleteEvent = id => { const numId = Number(id); events.value = events.value.filter(e => e.id !== numId); userRegistrations.value = userRegistrations.value.filter(r => r.eventId !== numId) }
  const getEventById = id => events.value.find(e => e.id === Number(id))
  const registerAttendee = (eventId, participantData) => {
    const event = events.value.find(e => e.id === Number(eventId))
    if (!event || event.done || Number(event.quota) <= 0 || userRegistrations.value.some(r => r.eventId === Number(eventId))) return null
    const bookingCode = 'GTH-' + Date.now().toString().slice(-4) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase()
    const record = { id: Date.now(), eventId: Number(eventId), bookingCode, registeredAt: new Date().toISOString(), fullName: participantData.fullName.trim(), email: participantData.email.trim(), phone: participantData.phone.trim(), dob: participantData.dob, reason: participantData.reason.trim() }
    event.quota = Math.max(0, Number(event.quota) - 1)
    userRegistrations.value.unshift(record)
    return record
  }
  const getEventByRegistration = id => events.value.find(e => e.id === Number(id))
  const isUserRegistered = eventId => userRegistrations.value.some(r => r.eventId === Number(eventId))
  const cancelRegistration = eventId => {
    const index = userRegistrations.value.findIndex(r => r.eventId === Number(eventId))
    if (index < 0) return false
    userRegistrations.value.splice(index, 1)
    const event = events.value.find(e => e.id === Number(eventId))
    if (event) event.quota = Number(event.quota) + 1
    return true
  }
  const clearAllEvents = () => { events.value = []; userRegistrations.value = [] }
  return { events, userRegistrations, totalEvents, activeEvents, completedEvents, createEvent, completeEvent, deleteEvent, getEventById, getEventByRegistration, registerAttendee, isUserRegistered, cancelRegistration, clearAllEvents }
}
