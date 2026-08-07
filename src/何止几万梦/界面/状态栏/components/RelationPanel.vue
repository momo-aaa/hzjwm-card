<template>
  <div class="relation-panel">
    <div class="meter-grid">
      <StatMeter label="好感度" :value="relation.好感度" caption="亲近与欣赏的积累" />
      <StatMeter label="信任度" :value="relation.信任度" caption="坦诚、守诺与陪伴" />
    </div>

    <section class="info-section" aria-labelledby="relation-state-heading">
      <div class="section-heading">
        <span id="relation-state-heading">RELATION NOTE</span>
        <strong>{{ relation.阶段 }} · {{ relation.当前关系 }}</strong>
      </div>
      <p>{{ relation.可观察状态 }}</p>
    </section>

    <section class="info-section" aria-labelledby="clue-heading">
      <div class="section-heading">
        <span id="clue-heading">IDENTITY CLUES</span>
        <strong>玩家认知：{{ identity.玩家对向艺 }}</strong>
      </div>
      <ul v-if="identity.玩家可见线索.length" class="plain-list">
        <li v-for="clue in identity.玩家可见线索" :key="clue">{{ clue }}</li>
      </ul>
      <p v-else class="empty-copy">暂时还没有足以联系网络身份的线索。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../../schema';
import StatMeter from './StatMeter.vue';

defineProps<{
  relation: StatusData['关系'];
  identity: StatusData['身份认知'];
}>();
</script>

<style lang="scss" scoped>
.relation-panel {
  display: grid;
  gap: 14px;
}

.meter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  padding: 12px;
  border: 1px solid var(--line-soft);
  background: var(--surface-raised);
}

.info-section {
  border-top: 1px solid var(--line-soft);
  padding-top: 10px;
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.section-heading span {
  color: var(--accent-primary);
  font-family: var(--font-data);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
}

.section-heading strong {
  font-size: 0.82rem;
}

.info-section p {
  margin: 6px 0 0;
  color: var(--ink-secondary);
}

.plain-list {
  display: grid;
  gap: 6px;
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.plain-list li {
  padding-left: 14px;
  color: var(--ink-secondary);
}

.plain-list li::before {
  content: '›';
  margin-left: -14px;
  margin-right: 7px;
  color: var(--accent-signal);
}

.empty-copy {
  color: var(--ink-muted) !important;
  font-style: italic;
}

@media (max-width: 520px) {
  .meter-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
  }
}
</style>
