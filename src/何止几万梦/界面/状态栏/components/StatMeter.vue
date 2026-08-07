<template>
  <div class="meter">
    <div class="meter-heading">
      <span>{{ label }}</span>
      <strong>{{ value }}<small>/100</small></strong>
    </div>
    <div
      class="meter-track"
      role="meter"
      :aria-label="label"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="value"
    >
      <span class="meter-fill" :style="{ width: `${value}%` }"></span>
    </div>
    <span v-if="caption" class="meter-caption">{{ caption }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: number;
  caption?: string;
}>();
</script>

<style lang="scss" scoped>
.meter {
  display: grid;
  gap: 5px;
}

.meter-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.82rem;
}

.meter-heading strong {
  color: var(--accent-primary-strong);
  font-family: var(--font-data);
  font-size: 1rem;
}

.meter-heading small {
  color: var(--ink-muted);
  font-size: 0.66rem;
  font-weight: 400;
}

.meter-track {
  height: 9px;
  padding: 1px;
  border: 1px solid var(--line-strong);
  background: var(--surface-raised);
}

.meter-fill {
  display: block;
  height: 100%;
  background: var(--accent-primary);
  transition: width 240ms ease;
}

.meter-caption {
  color: var(--ink-muted);
  font-size: 0.72rem;
}

@media (prefers-reduced-motion: reduce) {
  .meter-fill {
    transition: none;
  }
}
</style>
