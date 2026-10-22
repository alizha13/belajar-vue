import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'gatherly_events'
function loadEvents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}
// Singleton: dibagikan ke seluruh view.
const events = ref(loadEvents())
watch(events, value => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) } catch (error) { console.warn('Cannot save events', error) }
}, { deep: true })

export function useEvents() {
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter(e => !e.done))
  const completedEvents = computed(() => events.value.filter(e => e.done))
  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date,
      loc: eventData.loc.startsWith('📍') ? eventData.loc : `📍 ${eventData.loc}`,
      cat: eventData.cat,
      quota: Number(eventData.quota || 100),
      price: eventData.price || 'Free',
      desc: eventData.desc,
      done: false,
    }
    events.value.unshift(newEvent)
    return newEvent
  }
  const completeEvent = (id) => {
    const target = events.value.find(e => e.id === Number(id))
    if (target) target.done = true
  }
  const deleteEvent = (id) => {
    const index = events.value.findIndex(e => e.id === Number(id))
    if (index !== -1) events.value.splice(index, 1)
  }
  const getEventById = (id) => events.value.find(e => e.id === Number(id))
  const clearAllEvents = () => { events.value = [] }
  return { events, totalEvents, activeEvents, completedEvents, createEvent, completeEvent, deleteEvent, getEventById, clearAllEvents }
}
