<template>
  <div class="fame-panel">
    <section class="fame-channel" aria-labelledby="network-fame-heading">
      <div class="channel-heading">
        <div>
          <span class="channel-code">6SING / NET</span>
          <h2 id="network-fame-heading">网络知名度</h2>
        </div>
        <strong>{{ fame.网络知名度 }}</strong>
      </div>
      <StatMeter label="圈层传播" :value="fame.网络知名度" :caption="bandLabel(fame.网络知名度)" />
      <p>{{ fame.网络公众印象 }}</p>
    </section>

    <section class="fame-channel" aria-labelledby="campus-fame-heading">
      <div class="channel-heading">
        <div>
          <span class="channel-code">HLCU / CAMPUS</span>
          <h2 id="campus-fame-heading">校园知名度</h2>
        </div>
        <strong>{{ fame.校园知名度 }}</strong>
      </div>
      <StatMeter label="校园传播" :value="fame.校园知名度" :caption="bandLabel(fame.校园知名度)" />
      <p>{{ fame.校园公众印象 }}</p>
    </section>

    <p class="scope-note"><span>i</span>两条声名分别作用于网络音乐圈和华央校园，不代表现实身份已经被认出。</p>
  </div>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../../schema';
import StatMeter from './StatMeter.vue';

defineProps<{
  fame: StatusData['声名'];
}>();

function bandLabel(value: number) {
  if (value < 20) return '几乎无人知晓';
  if (value < 40) return '小圈子里略有名字';
  if (value < 60) return '稳定圈层知名度';
  if (value < 80) return '开始跨圈传播';
  return '高曝光与明显公众压力';
}
</script>

<style lang="scss" scoped>
.fame-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.fame-channel {
  padding: 13px;
  border: 1px solid var(--line-soft);
  background: var(--surface-raised);
}

.channel-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 7px;
  border-bottom: 1px dotted var(--line-soft);
}

.channel-heading h2 {
  margin: 1px 0 0;
  font-size: 0.95rem;
}

.channel-heading > strong {
  color: var(--accent-primary-strong);
  font-family: var(--font-data);
  font-size: 1.55rem;
  line-height: 1;
}

.channel-code {
  color: var(--accent-signal);
  font-family: var(--font-data);
  font-size: 0.66rem;
  letter-spacing: 0.06em;
}

.fame-channel p {
  margin: 12px 0 0;
  color: var(--ink-secondary);
  font-size: 0.82rem;
}

.scope-note {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 0;
  color: var(--ink-muted);
  font-size: 0.75rem;
}

.scope-note span {
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid var(--accent-signal);
  color: var(--accent-signal);
  font-family: var(--font-data);
}

@media (max-width: 560px) {
  .fame-panel {
    grid-template-columns: 1fr;
  }
}
</style>
