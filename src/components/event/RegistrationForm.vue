<script setup>
import { ref, reactive, computed } from 'vue'
import { useEvents } from '@/composables/useEvents'
import AppModal from '@/components/ui/AppModal.vue'
const props = defineProps({ event: { type: Object, required: true } })
const emit = defineEmits(['success', 'cancel'])
const { registerAttendee } = useEvents()
const form = reactive({ fullName: '', email: '', phone: '', dob: '', reason: '' })
const errors = reactive({ fullName: '', email: '', phone: '', dob: '', reason: '' })
const errorMessage = ref('')
const isDiscardModalOpen = ref(false)
const isFormDirty = computed(() => Object.values(form).some(v => v.trim()))
function validateField(field) {
  switch (field) {
    case 'fullName': errors.fullName = !form.fullName.trim() ? 'Full name is required.' : form.fullName.trim().length < 2 ? 'Full name must be at least 2 characters.' : ''; break
    case 'email': errors.email = !form.email.trim() ? 'Email address is required.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? 'Please enter a valid email address (e.g. name@example.com).' : ''; break
    case 'phone': errors.phone = !form.phone.trim() ? 'Phone number is required.' : !/^[0-9+\s-]{9,16}$/.test(form.phone.trim()) ? 'Please enter a valid phone number (minimum 9 digits).' : ''; break
    case 'dob': errors.dob = !form.dob ? 'Date of birth is required.' : new Date(form.dob) > new Date() ? 'Date of birth cannot be in the future.' : ''; break
    case 'reason': errors.reason = !form.reason.trim() ? 'Reason for attending is required.' : form.reason.trim().length < 10 ? 'Please write at least 10 characters explaining your reason.' : ''; break
  }
}
function handleSubmit() {
  Object.keys(errors).forEach(validateField)
  if (Object.values(errors).some(Boolean)) { errorMessage.value = 'Please correct the highlighted fields below before submitting.'; return }
  const record = registerAttendee(props.event.id, form)
  if (record) { errorMessage.value = ''; emit('success', record) }
  else errorMessage.value = 'Unable to complete registration. Please check remaining seats or existing registration.'
}
function handleCancelClick() { if (isFormDirty.value) isDiscardModalOpen.value = true; else emit('cancel') }
function handleConfirmDiscard() { isDiscardModalOpen.value = false; emit('cancel') }
</script>
<template><div class="registration-form-wrapper"><header class="form-header"><h2>Registration Form</h2><p>Fill out the attendee information below to confirm your participation.</p></header><div v-if="errorMessage" class="alert-error" role="alert">{{ errorMessage }}</div><form class="attendee-form" @submit.prevent="handleSubmit" novalidate><div class="form-group"><label for="fullName">Full Name <span class="required">*</span></label><input id="fullName" v-model="form.fullName" placeholder="e.g. John Doe" :class="{ 'input-error': errors.fullName }" @blur="validateField('fullName')"/><span v-if="errors.fullName" class="field-error">{{ errors.fullName }}</span></div><div class="form-group"><label for="email">Email Address <span class="required">*</span></label><input id="email" v-model="form.email" type="email" placeholder="e.g. name@example.com" :class="{ 'input-error': errors.email }" @blur="validateField('email')"/><span v-if="errors.email" class="field-error">{{ errors.email }}</span></div><div class="form-group"><label for="phone">Phone Number <span class="required">*</span></label><input id="phone" v-model="form.phone" type="tel" placeholder="e.g. 081234567890" :class="{ 'input-error': errors.phone }" @blur="validateField('phone')"/><span v-if="errors.phone" class="field-error">{{ errors.phone }}</span></div><div class="form-group"><label for="dob">Date of Birth <span class="required">*</span></label><input id="dob" v-model="form.dob" type="date" :max="new Date().toISOString().slice(0,10)" :class="{ 'input-error': errors.dob }" @blur="validateField('dob')"/><span v-if="errors.dob" class="field-error">{{ errors.dob }}</span></div><div class="form-group"><label for="reason">Reason for Attending <span class="required">*</span></label><textarea id="reason" v-model="form.reason" rows="4" placeholder="Tell us why you want to join this event..." :class="{ 'input-error': errors.reason }" @blur="validateField('reason')"></textarea><span v-if="errors.reason" class="field-error">{{ errors.reason }}</span></div><div class="form-actions"><button type="button" class="btn-cancel-form" @click="handleCancelClick">Cancel</button><button type="submit" class="btn-submit-form">Submit Registration</button></div></form><AppModal :is-open="isDiscardModalOpen" title="Discard Registration?" message="You have unsaved changes in this form. Are you sure you want to cancel and leave this page?" confirm-text="Yes, Discard" @close="isDiscardModalOpen=false" @confirm="handleConfirmDiscard" /></div></template>
<style scoped>.registration-form-wrapper{background:white;border:1px solid var(--border-color);border-radius:12px;padding:32px;box-shadow:0 4px 12px rgba(0,0,0,.03)}.form-header{margin-bottom:24px}.form-header h2{font-size:1.55rem;margin-bottom:8px}.form-header p{color:var(--text-muted);font-size:.88rem}.attendee-form{display:flex;flex-direction:column;gap:20px}.form-group{display:flex;flex-direction:column;gap:8px}.form-group label{font-size:.9rem;font-weight:600}.required{color:#dc3545}.form-group input,.form-group textarea{width:100%;border:1px solid var(--border-color);border-radius:8px;padding:12px 14px;font:inherit;outline:none;background:#fff}.form-group input:focus,.form-group textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(102,68,255,.1)}.form-group .input-error{border-color:#dc3545}.field-error,.alert-error{color:#b91c1c;font-size:.82rem}.alert-error{background:#fef2f2;border-radius:8px;padding:12px;margin-bottom:16px}.form-actions{display:flex;justify-content:flex-end;gap:12px;border-top:1px solid var(--border-color);padding-top:20px}.form-actions button{border-radius:8px;padding:12px 18px;font-weight:700;cursor:pointer}.btn-cancel-form{border:1px solid var(--border-color);background:white;color:var(--text-muted)}.btn-submit-form{border:0;background:var(--primary);color:white}@media(max-width:650px){.registration-form-wrapper{padding:20px}.form-actions{flex-direction:column}}</style>
