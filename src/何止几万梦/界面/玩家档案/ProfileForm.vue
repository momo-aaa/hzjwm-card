<template>
  <form class="profile-form" @submit.prevent="saveProfile">
    <header class="profile-form__header">
      <div>
        <p class="eyebrow">USER PROFILE / 可选</p>
        <h2>{{ compact ? '修改玩家档案' : '先写下你想让故事知道的事' }}</h2>
        <p class="intro">笑脸里已有的设定不用重复填写。空着的项目不会发送给 AI，也不会被故事自行补全。</p>
      </div>
      <button v-if="compact" class="close-button" type="button" aria-label="关闭玩家档案" @click="$emit('cancel')">
        ×
      </button>
    </header>

    <section class="fixed-strip" aria-label="开场固定信息">
      <span><b>2010级</b> 大一新生</span>
      <span><b>18—19岁</b></span>
      <span><b>鹤林校区</b></span>
      <span><b>向艺</b> 尚未正式认识</span>
    </section>

    <nav class="section-tabs" aria-label="玩家档案栏目" role="tablist">
      <button
        v-for="section in profileSections"
        :id="`profile-tab-${section.id}`"
        :key="section.id"
        type="button"
        role="tab"
        :aria-selected="activeSection === section.id"
        :aria-controls="`profile-panel-${section.id}`"
        :class="{ active: activeSection === section.id }"
        @click="activeSection = section.id"
      >
        <span>{{ section.shortLabel }}</span>
        <small>{{ section.fields.filter(field => draft[field.key]?.trim()).length }}/{{ section.fields.length }}</small>
      </button>
    </nav>

    <section
      :id="`profile-panel-${currentSection.id}`"
      class="field-panel"
      role="tabpanel"
      :aria-labelledby="`profile-tab-${currentSection.id}`"
    >
      <p class="section-note">{{ currentSection.note }}</p>

      <div class="field-grid">
        <label v-for="field in currentSection.fields" :key="field.key" :class="{ wide: field.multiline }">
          <span>{{ field.label }}</span>
          <textarea
            v-if="field.multiline"
            v-model="draft[field.key]"
            :placeholder="field.placeholder"
            rows="2"
          ></textarea>
          <input v-else v-model="draft[field.key]" type="text" :placeholder="field.placeholder" autocomplete="off" />
        </label>
      </div>
    </section>

    <footer class="form-actions">
      <div class="fill-count" aria-live="polite">
        <strong>{{ filledCount }}</strong>
        <span>项会写入档案</span>
      </div>
      <div class="action-cluster">
        <button v-if="allowSkip" class="skip-button" type="button" @click="$emit('skip')">暂时跳过</button>
        <button class="save-button" type="submit" :disabled="filledCount === 0">
          {{ status === '已填写' ? '保存修改' : '保存并开始' }}
        </button>
      </div>
    </footer>
  </form>
</template>

<script setup lang="ts">
import { cleanProfileDraft, createProfileDraft, profileSections, type ProfileStatus } from './profile';

const props = withDefaults(
  defineProps<{
    profile: Record<string, string>;
    status: ProfileStatus;
    allowSkip?: boolean;
    compact?: boolean;
  }>(),
  {
    allowSkip: true,
    compact: false,
  },
);

const emit = defineEmits<{
  save: [profile: Record<string, string>];
  skip: [];
  cancel: [];
}>();

const activeSection = ref<(typeof profileSections)[number]['id']>('basic');
const draft = reactive(createProfileDraft(props.profile));

watch(
  () => props.profile,
  profile => Object.assign(draft, createProfileDraft(profile)),
  { deep: true },
);

const currentSection = computed(() => profileSections.find(section => section.id === activeSection.value)!);
const filledCount = computed(() => Object.keys(cleanProfileDraft(draft)).length);

function saveProfile() {
  const cleaned = cleanProfileDraft(draft);
  if (Object.keys(cleaned).length === 0) return;
  emit('save', cleaned);
}
</script>

<style lang="scss" scoped>
.profile-form {
  border: 1px solid var(--line-strong);
  background: var(--surface-paper);
  box-shadow: 3px 3px 0 var(--shadow-frame);
  color: var(--ink-primary);
}

.profile-form__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 15px 16px 13px;
  border-bottom: 1px solid var(--line-soft);
  background: linear-gradient(90deg, var(--accent-primary-soft) 0 5px, transparent 5px), var(--surface-paper);
}

.eyebrow {
  margin: 0 0 3px;
  color: var(--accent-signal);
  font-family: var(--font-data);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
}

h2 {
  margin: 0;
  color: var(--accent-primary-strong);
  font-size: 1.05rem;
  line-height: 1.35;
}

.intro {
  max-width: 62ch;
  margin: 5px 0 0;
  color: var(--ink-secondary);
  font-size: 0.78rem;
}

.close-button {
  flex: none;
  width: 36px;
  height: 36px;
  border: 1px solid var(--line-soft);
  background: var(--surface-muted);
  color: var(--ink-secondary);
  cursor: pointer;
  font-family: var(--font-data);
  font-size: 1.2rem;
}

.fixed-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line-soft);
  background: var(--surface-screen);
}

.fixed-strip span {
  padding: 2px 6px;
  border: 1px solid rgba(78, 64, 90, 0.24);
  background: rgba(255, 255, 255, 0.34);
  color: var(--ink-secondary);
  font-size: 0.7rem;
}

.fixed-strip b {
  color: var(--accent-primary-strong);
}

.section-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--line-strong);
}

.section-tabs button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 42px;
  border: 0;
  border-right: 1px solid var(--line-soft);
  background: var(--surface-muted);
  color: var(--ink-secondary);
  cursor: pointer;
}

.section-tabs button:last-child {
  border-right: 0;
}

.section-tabs button.active {
  background: var(--accent-primary-strong);
  color: var(--surface-paper);
}

.section-tabs small {
  color: inherit;
  font-family: var(--font-data);
  font-size: 0.6rem;
  opacity: 0.72;
}

.field-panel {
  padding: 13px 14px 15px;
  animation: profilePageIn 220ms ease-out both;
}

.section-note {
  margin: 0 0 11px;
  padding-left: 8px;
  border-left: 3px solid var(--accent-signal);
  color: var(--ink-secondary);
  font-size: 0.75rem;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 12px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

label.wide {
  grid-column: 1 / -1;
}

label > span {
  color: var(--accent-primary-strong);
  font-size: 0.75rem;
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--line-soft);
  border-radius: 0;
  outline: none;
  background: var(--surface-raised);
  color: var(--ink-primary);
  font: inherit;
  font-size: 0.8rem;
  line-height: 1.5;
}

input {
  height: 38px;
  padding: 7px 9px;
}

textarea {
  min-height: 62px;
  padding: 8px 9px;
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: var(--ink-muted);
  opacity: 0.78;
}

input:focus-visible,
textarea:focus-visible,
button:focus-visible {
  box-shadow: 0 0 0 2px var(--accent-signal);
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 13px;
  border-top: 1px solid var(--line-soft);
  background: var(--surface-muted);
}

.fill-count {
  display: flex;
  align-items: baseline;
  gap: 5px;
  color: var(--ink-muted);
  font-size: 0.68rem;
}

.fill-count strong {
  color: var(--accent-primary-strong);
  font-family: var(--font-data);
  font-size: 1rem;
}

.action-cluster {
  display: flex;
  align-items: center;
  gap: 10px;
}

.skip-button,
.save-button {
  min-height: 40px;
  cursor: pointer;
}

.skip-button {
  border: 0;
  background: transparent;
  color: var(--ink-secondary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.save-button {
  padding: 8px 16px;
  border: 1px solid var(--accent-primary-strong);
  background: var(--accent-primary-strong);
  color: var(--surface-paper);
  font-weight: 700;
}

.save-button:disabled {
  border-color: var(--line-soft);
  background: var(--surface-screen-strong);
  color: var(--ink-muted);
  cursor: not-allowed;
}

@keyframes profilePageIn {
  from {
    opacity: 0.55;
    transform: translateX(4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 560px) {
  .profile-form {
    box-shadow: 1px 1px 0 var(--shadow-frame);
  }

  .profile-form__header {
    padding: 13px 12px 11px;
  }

  .section-tabs button {
    flex-direction: column;
    gap: 0;
    min-height: 46px;
  }

  .field-panel {
    padding: 12px 10px 13px;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  label.wide {
    grid-column: auto;
  }

  .form-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .action-cluster {
    justify-content: flex-end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .field-panel {
    animation: none;
  }
}
</style>
