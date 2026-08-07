<template>
  <div class="memory-panel">
    <section aria-labelledby="recent-heading">
      <div class="section-heading">
        <h2 id="recent-heading">近期事件</h2>
        <span>RECENT / {{ memory.近期事件.length.toString().padStart(2, '0') }}</span>
      </div>
      <ol v-if="memory.近期事件.length" class="event-list">
        <li v-for="(event, index) in memory.近期事件" :key="`${index}-${event}`">
          <span>{{ (index + 1).toString().padStart(2, '0') }}</span
          >{{ event }}
        </li>
      </ol>
      <p v-else class="empty-record">还没有写入近期事件。故事刚刚翻到第一页。</p>
    </section>

    <section aria-labelledby="milestone-heading">
      <div class="section-heading">
        <h2 id="milestone-heading">关键里程碑</h2>
        <span>MILESTONE / {{ memory.关键里程碑.length.toString().padStart(2, '0') }}</span>
      </div>
      <ul v-if="memory.关键里程碑.length" class="milestone-list">
        <li v-for="milestone in memory.关键里程碑" :key="milestone">{{ milestone }}</li>
      </ul>
      <p v-else class="empty-record">那些真正改变彼此的时刻，还在未来等着发生。</p>
    </section>

    <section v-if="summaries.length" aria-labelledby="summary-heading">
      <div class="section-heading">
        <h2 id="summary-heading">阶段摘要</h2>
        <span>ARCHIVE</span>
      </div>
      <dl class="summary-list">
        <template v-for="summary in summaries" :key="`${summary.group}-${summary.key}`">
          <dt>{{ summary.group }} · {{ summary.key }}</dt>
          <dd>{{ summary.value }}</dd>
        </template>
      </dl>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../../schema';

const props = defineProps<{
  memory: StatusData['记忆'];
}>();

const summaries = computed(() => [
  ...Object.entries(props.memory.关系阶段摘要).map(([key, value]) => ({ group: '关系', key, value })),
  ...Object.entries(props.memory.学期摘要).map(([key, value]) => ({ group: '学期', key, value })),
]);
</script>

<style lang="scss" scoped>
.memory-panel {
  display: grid;
  gap: 17px;
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 7px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--line-soft);
}

.section-heading h2 {
  margin: 0;
  font-size: 0.92rem;
}

.section-heading span {
  color: var(--ink-muted);
  font-family: var(--font-data);
  font-size: 0.66rem;
  letter-spacing: 0.05em;
}

.event-list,
.milestone-list {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.event-list li {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 7px;
  padding: 6px 8px;
  border-bottom: 1px dotted var(--line-soft);
  color: var(--ink-secondary);
}

.event-list li span {
  color: var(--accent-primary);
  font-family: var(--font-data);
  font-size: 0.7rem;
}

.milestone-list li {
  padding: 7px 9px 7px 13px;
  border-left: 3px solid var(--accent-warm);
  background: var(--surface-raised);
}

.empty-record {
  margin: 0;
  padding: 10px;
  border: 1px dashed var(--line-soft);
  color: var(--ink-muted);
  font-style: italic;
  text-align: center;
}

.summary-list {
  display: grid;
  grid-template-columns: minmax(100px, 0.4fr) 1.6fr;
  margin: 0;
  border-top: 1px solid var(--line-soft);
  border-left: 1px solid var(--line-soft);
}

.summary-list dt,
.summary-list dd {
  margin: 0;
  padding: 7px 9px;
  border-right: 1px solid var(--line-soft);
  border-bottom: 1px solid var(--line-soft);
}

.summary-list dt {
  color: var(--accent-primary-strong);
  font-size: 0.76rem;
  font-weight: 700;
}

.summary-list dd {
  color: var(--ink-secondary);
}

@media (max-width: 520px) {
  .summary-list {
    grid-template-columns: 1fr;
  }

  .summary-list dt {
    border-bottom: 0;
    background: var(--surface-muted);
  }
}
</style>
