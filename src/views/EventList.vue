<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'
import EventCard from '@/components/event/EventCard.vue'
import SearchBar from '@/components/event/SearchBar.vue'
import CategoryFilter from '@/components/event/CategoryFilter.vue'
const router = useRouter()
const { activeEvents, isUserRegistered } = useEvents()
const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ['All','Workshop','Meetup','Competition','Seminar','Conference']
const filteredEvents = computed(() => activeEvents.value.filter(e => {
  const q = searchQuery.value.toLowerCase()
  const matchesSearch = e.title.toLowerCase().includes(q) || e.loc.toLowerCase().includes(q)
  return matchesSearch && (selectedCategory.value === 'All' || e.cat === selectedCategory.value)
}))
const handleViewDetail = id => router.push(`/browse/events/${id}`)
</script>

<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-desc">
        Discover workshops, seminars, tech meetups, and competitions near you.
      </p>
    </div>

    <div class="filters-section">
      <SearchBar v-model="searchQuery" />
      <CategoryFilter :categories="categories" v-model="selectedCategory" />
    </div>

    <div v-if="filteredEvents.length > 0" class="event-grid">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        :is-registered="isUserRegistered(event.id)"
        @view-detail="handleViewDetail"
      />
    </div>

    <div v-else class="empty-state friendly-empty">
      <div class="empty-icon">🏬</div>
      <h3>No Events Available Yet</h3>
      <p>There are currently no active events scheduled. Are you an organizer? Publish and manage your first event today through the Dashboard!</p>
      <button class="empty-action" @click="router.push('/dashboard/events')">Go to Organizer Dashboard →</button>
    </div>
  </div>
</template>

<style scoped>
.header-section {
  margin-bottom: var(--space-8);
}
.section-title {
  font-size: 2.2rem;
  margin-bottom: var(--space-2);
}
.section-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.filters-section {
  margin-bottom: var(--space-6);
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.empty-state {
  text-align: center;
  padding: var(--space-12);
  color: var(--text-muted);
  background: var(--bg-light);
  border-radius: var(--space-4);
}
</style>

<style scoped>
.friendly-empty{text-align:center;border:1px solid var(--border-color);border-radius:12px;padding:40px 20px;background:#fff;max-width:650px;margin:20px auto}.friendly-empty .empty-icon{font-size:2.5rem}.friendly-empty h3{margin:12px 0}.friendly-empty p{max-width:470px;margin:0 auto 20px;color:var(--text-muted);line-height:1.6}.empty-action{background:var(--primary);color:white;border:0;border-radius:8px;padding:12px 20px;font-weight:700;cursor:pointer}
</style>
