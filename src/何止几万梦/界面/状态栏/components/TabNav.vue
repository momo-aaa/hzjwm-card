<template>
  <nav ref="tablist" class="tab-list" role="tablist" aria-label="状态栏目">
    <button
      v-for="(tab, index) in tabs"
      :id="`status-tab-${tab.id}`"
      :key="tab.id"
      class="tab-button"
      :class="{ 'is-active': model === tab.id }"
      type="button"
      role="tab"
      :aria-selected="model === tab.id"
      :aria-controls="`status-panel-${tab.id}`"
      :tabindex="model === tab.id ? 0 : -1"
      @click="model = tab.id"
      @keydown="onKeydown($event, index)"
    >
      <span class="tab-code">{{ tab.code }}</span>
      <span>{{ tab.label }}</span>
      <span class="tab-indicator" aria-hidden="true"></span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const tabs = [
  { id: 'relation', label: '关系', code: '01' },
  { id: 'music', label: '音乐', code: '02' },
  { id: 'fame', label: '声名', code: '03' },
  { id: 'memory', label: '记忆', code: '04' },
] as const;

const model = defineModel<string>({ required: true });
const tablist = useTemplateRef<HTMLElement>('tablist');

function selectAt(index: number) {
  const normalized = (index + tabs.length) % tabs.length;
  model.value = tabs[normalized].id;
  nextTick(() => {
    const buttons = tablist.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[normalized]?.focus();
  });
}

function onKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    selectAt(index + 1);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    selectAt(index - 1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    selectAt(0);
  } else if (event.key === 'End') {
    event.preventDefault();
    selectAt(tabs.length - 1);
  }
}
</script>

<style lang="scss" scoped>
.tab-list {
  display: flex;
  width: 100%;
  overflow-x: auto;
  background: var(--surface-muted);
  border-block: 1px solid var(--line-strong);
  scrollbar-width: thin;
  scrollbar-color: var(--accent-primary) var(--surface-muted);
}

.tab-button {
  position: relative;
  flex: 1 0 86px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 8px 12px 9px;
  border: 0;
  border-right: 1px solid var(--line-soft);
  background: var(--surface-muted);
  color: var(--ink-secondary);
  cursor: pointer;
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.tab-button:last-child {
  border-right: 0;
}

.tab-button:hover {
  background: var(--accent-primary-soft);
  color: var(--accent-primary-strong);
}

.tab-button:focus-visible {
  z-index: 1;
  outline: 2px solid var(--accent-signal);
  outline-offset: -3px;
}

.tab-button.is-active {
  background: var(--surface-paper);
  color: var(--accent-primary-strong);
  font-weight: 700;
}

.tab-code {
  color: var(--ink-muted);
  font-family: var(--font-data);
  font-size: 0.72rem;
  font-weight: 400;
}

.tab-indicator {
  width: 5px;
  height: 5px;
  border: 1px solid var(--ink-muted);
  border-radius: 50%;
  background: transparent;
}

.is-active .tab-indicator {
  border-color: var(--accent-signal);
  background: var(--accent-signal);
}

@media (prefers-reduced-motion: reduce) {
  .tab-button {
    transition: none;
  }
}
</style>
