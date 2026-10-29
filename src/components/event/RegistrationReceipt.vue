<script setup>
defineProps({ record: { type: Object, required: true }, event: { type: Object, required: true } })
</script>
<template>
  <div class="receipt-preview">
    <p>Thank you, {{ record.fullName }}! Your registration for <strong>{{ event.title }}</strong> has been officially confirmed.</p>
    <div class="receipt-details">
      <div class="receipt-row"><span>Booking Reference</span><strong class="reference">{{ record.bookingCode }}</strong></div>
      <div class="receipt-row"><span>Attendee Email</span><strong>{{ record.email }}</strong></div>
      <div class="receipt-row"><span>Event Schedule</span><strong>{{ event.date }}</strong></div>
      <div class="receipt-row"><span>Venue / Location</span><strong>{{ event.loc.replace(/^📍\s*/, '') }}</strong></div>
    </div>
  </div>
</template>
<style scoped>
.receipt-preview{font-size:.91rem}.receipt-preview>p{line-height:1.65;margin:0 0 18px}.receipt-details{border:1px solid #e5e7eb;border-radius:9px;padding:14px 16px}.receipt-row{display:flex;justify-content:space-between;gap:16px;align-items:baseline;margin:9px 0}.receipt-row span{color:#666}.receipt-row strong{font-size:.88rem;text-align:right}.reference{font-family:monospace;color:#6544ff;background:#f5f3ff;border-radius:4px;padding:3px 7px}
</style>
