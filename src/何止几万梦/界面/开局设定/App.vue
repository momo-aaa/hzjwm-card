<template>
  <main class="setup-shell">
    <ProfileForm
      v-if="editing"
      :profile="profile.档案"
      :status="profile.状态"
      :allow-skip="profile.状态 !== '已填写'"
      :compact="profile.状态 !== '未填写'"
      @save="saveProfile"
      @skip="skipProfile"
      @cancel="editing = false"
    />

    <section v-else class="saved-ticket" aria-live="polite">
      <div class="ticket-status" aria-hidden="true">✓</div>
      <div class="ticket-copy">
        <p class="ticket-label">PLAYER PROFILE</p>
        <strong>{{ profile.状态 === '已填写' ? '玩家档案已保存' : '沿用笑脸设定与留白' }}</strong>
        <p v-if="profile.状态 === '已填写'">{{ profileSummary }}</p>
        <p v-else>没有额外写入内容，故事会以 Persona 和你之后明确说出的信息为准。</p>
      </div>
      <button type="button" @click="editing = true">修改</button>
    </section>

    <p v-if="notice" class="save-notice">{{ notice }}</p>
  </main>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../schema';
import ProfileForm from '../玩家档案/ProfileForm.vue';
import { useLatestDataStore } from '../玩家档案/store';

const props = defineProps<{
  previewData?: StatusData;
}>();

const store = props.previewData ? undefined : useLatestDataStore();
const previewState = props.previewData ? ref(_.cloneDeep(props.previewData)) : undefined;
const data = computed(() => previewState?.value ?? store!.data);
const profile = computed(() => data.value._玩家设定);
const editing = ref(profile.value.状态 === '未填写');
const notice = ref('');

const profileSummary = computed(() => {
  const entries = Object.entries(profile.value.档案);
  if (entries.length === 0) return '没有额外写入内容';
  const shown = entries.slice(0, 4).map(([key, value]) => `${key}：${value}`);
  return `${shown.join(' · ')}${entries.length > shown.length ? ` · 另有${entries.length - shown.length}项` : ''}`;
});

function showNotice(message: string) {
  notice.value = message;
  window.setTimeout(() => {
    if (notice.value === message) notice.value = '';
  }, 3200);
}

function saveProfile(archive: Record<string, string>) {
  data.value._玩家设定 = { 状态: '已填写', 档案: archive };
  editing.value = false;
  showNotice('已经写进本次聊天的玩家档案啦，下面的开场可以照常继续。');
}

function skipProfile() {
  data.value._玩家设定 = { 状态: '已跳过', 档案: {} };
  editing.value = false;
  showNotice('已跳过。笑脸设定和之后的明确陈述仍会正常生效。');
}
</script>

<style lang="scss" scoped>
.setup-shell {
  width: 100%;
  max-width: 760px;
  margin: 0 auto 13px;
}

.saved-ticket {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border: 1px solid var(--line-strong);
  background:
    repeating-linear-gradient(90deg, transparent 0 18px, rgba(98, 80, 113, 0.035) 18px 19px), var(--surface-paper);
  box-shadow: 3px 3px 0 var(--shadow-frame);
  animation: foldTicket 260ms ease-out both;
}

.ticket-status {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 1px solid var(--accent-signal);
  background: var(--accent-signal-soft);
  color: var(--accent-signal);
  font-family: var(--font-data);
  font-weight: 700;
}

.ticket-copy {
  min-width: 0;
}

.ticket-label {
  margin: 0;
  color: var(--ink-muted);
  font-family: var(--font-data);
  font-size: 0.59rem;
  letter-spacing: 0.07em;
}

.ticket-copy strong {
  color: var(--accent-primary-strong);
  font-size: 0.84rem;
}

.ticket-copy p:last-child {
  overflow: hidden;
  margin: 2px 0 0;
  color: var(--ink-secondary);
  font-size: 0.7rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.saved-ticket button {
  min-width: 48px;
  min-height: 38px;
  border: 1px solid var(--line-soft);
  background: var(--surface-muted);
  color: var(--accent-primary-strong);
  cursor: pointer;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
}

.saved-ticket button:focus-visible {
  outline: 2px solid var(--accent-signal);
  outline-offset: 2px;
}

.save-notice {
  margin: 6px 0 0;
  padding: 5px 8px;
  border-left: 3px solid var(--accent-signal);
  background: var(--accent-signal-soft);
  color: var(--ink-secondary);
  font-size: 0.7rem;
}

@keyframes foldTicket {
  from {
    opacity: 0.52;
    transform: scaleY(0.94);
    transform-origin: top;
  }
  to {
    opacity: 1;
    transform: scaleY(1);
    transform-origin: top;
  }
}

@media (max-width: 520px) {
  .saved-ticket {
    grid-template-columns: auto minmax(0, 1fr);
    box-shadow: 1px 1px 0 var(--shadow-frame);
  }

  .saved-ticket button {
    grid-column: 2;
    justify-self: end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .saved-ticket {
    animation: none;
  }
}
</style>
