<template>
  <button :class="['app-button', `btn-${variant}`]" :disabled="loading || disabled" :aria-busy="loading" @click="$emit('click')">
    <span v-if="loading" class="button-spinner" aria-hidden="true"></span>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  variant: {
    type: String,
    default: 'primary',
  },
})
defineEmits(['click'])
</script>

<style scoped>
.app-button {
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  padding: var(--space-3) var(--space-8);
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  transition:
    transform 0.2s,
    background-color 0.2s;
}

.app-button:disabled { opacity: .65; cursor: not-allowed; }
.button-spinner { display: inline-block; width: 14px; height: 14px; margin-right: 8px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .7s linear infinite; vertical-align: middle; }
@keyframes spin { to { transform: rotate(360deg); } }
.app-button:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}
.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: #f0f0f0;
  color: var(--text-main);
}
.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-outline {
  background-color: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}
.btn-outline:hover {
  background-color: rgba(102, 68, 255, 0.1);
}
</style>
