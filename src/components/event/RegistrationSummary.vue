<script setup>
import AppCard from '@/components/ui/AppCard.vue'
defineProps({ event: { type: Object, required: true } })
defineEmits(['back'])
</script>
<template><div class="registration-summary-wrapper"><button class="back-link" @click="$emit('back')">← Back to Event Detail</button><AppCard class="summary-card"><span class="category-pill">{{ event.cat }}</span><h2>{{ event.title }}</h2><div class="summary-item"><span>Date & Time</span><strong>{{ event.date }}</strong></div><div class="summary-item"><span>Location</span><strong>{{ event.loc }}</strong></div><div class="summary-item"><span>AVAILABLE SEATS</span><strong class="seats-remaining">{{ event.quota }} seats remaining</strong></div><p class="summary-desc">{{ event.desc }}</p></AppCard></div></template>
<style scoped>.registration-summary-wrapper{position:sticky;top:90px}.back-link{border:0;background:none;color:var(--text-muted);cursor:pointer;margin-bottom:20px}.summary-card{padding:24px}.category-pill{display:inline-block;background:#eee9ff;color:var(--primary);border-radius:6px;padding:5px 10px;text-transform:uppercase;font-size:.75rem;font-weight:700}.summary-card h2{font-size:1.35rem;line-height:1.35;margin:16px 0 20px}.summary-item{display:flex;flex-direction:column;gap:5px;border-bottom:1px solid var(--border-color);padding:12px 0}.summary-item span{color:var(--text-muted);font-size:.8rem}.summary-item strong{font-size:.94rem}.summary-desc{font-size:.9rem;color:var(--text-muted);line-height:1.7;white-space:pre-line;margin-top:20px}</style>

<style scoped>.summary-item .seats-remaining{color:#16a34a;font-weight:700}.summary-item span{text-transform:uppercase;font-size:.74rem;font-weight:600}.summary-card h2{font-size:1.25rem}.summary-desc{font-size:.83rem}</style>
