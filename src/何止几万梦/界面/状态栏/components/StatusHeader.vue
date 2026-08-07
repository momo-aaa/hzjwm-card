<template>
  <header class="status-header">
    <div class="title-bar">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true">◇</span>
        <span>小鸢尾校园网络</span>
        <span class="brand-path">/ HLCU · 鹤林</span>
      </div>
      <div class="title-actions">
        <button type="button" class="profile-button" @click="$emit('edit-profile')">
          <span class="profile-dot" :class="{ ready: profileStatus === '已填写' }" aria-hidden="true"></span>
          玩家档案
        </button>
        <div class="connection"><span class="connection-dot" aria-hidden="true"></span>在线</div>
      </div>
    </div>

    <div class="summary-grid">
      <div class="date-block">
        <span class="data-label">DATE.LOG</span>
        <strong>{{ world.日期 }}</strong>
        <span>{{ world.时间段 }}</span>
      </div>
      <div class="location-block">
        <span class="data-label">CURRENT LOCATION</span>
        <strong>{{ locationTitle }}</strong>
        <span>{{ world.当前地点.detail }}</span>
      </div>
      <div class="relation-block">
        <span class="data-label">RELATION</span>
        <strong>{{ relation.阶段 }}</strong>
        <span>{{ relation.当前关系 }}</span>
      </div>
    </div>

    <p class="observable"><span>NOW</span>{{ relation.可观察状态 }}</p>
  </header>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../../schema';

const props = defineProps<{
  world: StatusData['世界'];
  relation: StatusData['关系'];
  profileStatus: StatusData['_玩家设定']['状态'];
}>();

defineEmits<{
  'edit-profile': [];
}>();

const locationTitle = computed(() => {
  const { city, campus, area } = props.world.当前地点;
  return [city, campus, area].filter(Boolean).join(' · ');
});
</script>

<style lang="scss" scoped>
.status-header {
  background: var(--surface-paper);
}

.title-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 10px;
  background: var(--accent-primary-strong);
  color: var(--surface-paper);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
}

.brand,
.connection,
.title-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.title-actions {
  flex: none;
  gap: 9px;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 30px;
  padding: 2px 7px;
  border: 1px solid rgba(248, 247, 242, 0.4);
  background: rgba(248, 247, 242, 0.08);
  color: var(--surface-paper);
  cursor: pointer;
  font: inherit;
  font-size: 0.7rem;
}

.profile-button:focus-visible {
  outline: 2px solid #bce0d8;
  outline-offset: 2px;
}

.profile-dot {
  width: 6px;
  height: 6px;
  border: 1px solid #d8cadf;
  background: transparent;
}

.profile-dot.ready {
  border-color: #bce0d8;
  background: var(--accent-signal);
}

.brand-mark {
  color: #d9e7e2;
  font-size: 1rem;
}

.brand-path {
  color: #c7bdcd;
  font-family: var(--font-data);
  font-size: 0.72rem;
}

.connection {
  flex: none;
  font-family: var(--font-data);
}

.connection-dot {
  width: 6px;
  height: 6px;
  border: 1px solid #bce0d8;
  border-radius: 50%;
  background: var(--accent-signal);
  box-shadow: 0 0 0 2px rgba(188, 224, 216, 0.16);
}

.summary-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.8fr 0.9fr;
  border-bottom: 1px solid var(--line-soft);
}

.summary-grid > div {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 11px 12px;
  border-right: 1px solid var(--line-soft);
  min-width: 0;
}

.summary-grid > div:last-child {
  border-right: 0;
}

.summary-grid strong,
.summary-grid span:last-child {
  overflow-wrap: anywhere;
}

.summary-grid strong {
  color: var(--accent-primary-strong);
  font-size: 0.94rem;
}

.summary-grid span:last-child {
  color: var(--ink-secondary);
  font-size: 0.78rem;
}

.data-label {
  color: var(--ink-muted);
  font-family: var(--font-data);
  font-size: 0.64rem;
  letter-spacing: 0.07em;
}

.observable {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin: 0;
  padding: 8px 12px;
  color: var(--ink-secondary);
  font-size: 0.82rem;
}

.observable span {
  flex: none;
  margin-top: 1px;
  padding: 0 4px;
  border: 1px solid var(--accent-primary);
  color: var(--accent-primary-strong);
  font-family: var(--font-data);
  font-size: 0.64rem;
}

@media (max-width: 620px) {
  .summary-grid {
    grid-template-columns: 1fr 1fr;
  }

  .location-block {
    grid-column: 1 / -1;
    grid-row: 2;
    border-top: 1px solid var(--line-soft);
    border-right: 0 !important;
  }

  .brand-path {
    display: none;
  }

  .connection {
    display: none;
  }
}
</style>
