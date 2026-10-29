<script setup>
defineProps({
  isOpen: { type: Boolean, default: false },
  title: { type: String, default: 'Action Confirmation' },
  message: { type: String, default: 'Are you sure you want to proceed with this action?' },
  confirmText: { type: String, default: 'Yes, Proceed' },
  cancelText: { type: String, default: 'Cancel' },
  showCancel: { type: Boolean, default: true },
  variant: { type: String, default: 'danger' },
})
defineEmits(['confirm', 'close'])
</script>
<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card" role="dialog" aria-modal="true" :aria-label="title">
        <div class="modal-header"><span v-if="variant === 'success'" class="success-label">SUCCESS</span><span v-else class="modal-icon">!</span><h3>{{ title }}</h3></div>
        <div class="modal-body"><slot><p>{{ message }}</p></slot></div>
        <div class="modal-footer">
          <slot name="footer">
            <button v-if="showCancel" class="btn-cancel" @click="$emit('close')">{{ cancelText }}</button>
            <button class="btn-confirm" :class="'btn-confirm-' + variant" @click="$emit('confirm')">{{ confirmText }}</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.modal-overlay{position:fixed;inset:0;z-index:9999;width:100%;height:100vh;background:rgba(15,23,42,.45);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px}
.modal-card{background:white;width:min(100%,480px);border-radius:16px;padding:28px;box-shadow:0 20px 60px rgba(0,0,0,.3);animation:scaleIn .25s cubic-bezier(.16,1,.3,1)}
@keyframes scaleIn{from{opacity:0;transform:scale(.95) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
.modal-header{display:flex;align-items:flex-start;flex-direction:column;gap:10px;margin-bottom:16px}.modal-header h3{font-size:1.35rem;margin:0}.modal-icon{font-size:1.1rem;color:#b45309}.success-label{font-size:.72rem;font-weight:800;letter-spacing:.02em;color:#15803d;background:#dcfce7;border:1px solid #bbf7d0;padding:5px 9px;border-radius:4px}
.modal-body p{color:var(--text-muted);line-height:1.6;margin:0}.modal-footer{display:flex;justify-content:flex-end;gap:12px;margin-top:28px}
.modal-footer button{border-radius:8px;padding:11px 17px;border:0;cursor:pointer;font-weight:650}.btn-cancel{background:var(--bg-gray);color:var(--text-main)}.btn-confirm{background:#dc3545;color:white}.btn-confirm:hover{background:#bd2130}.modal-fade-enter-active,.modal-fade-leave-active{transition:opacity .25s}.modal-fade-enter-from,.modal-fade-leave-to{opacity:0}
</style>

<style scoped>.btn-confirm-success{background:#16a34a!important}.modal-body{line-height:1.6}</style>
