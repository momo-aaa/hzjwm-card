<template>
  <main class="status-card">
    <StatusHeader
      :world="data.世界"
      :relation="data.关系"
      :profile-status="profileData._玩家设定.状态"
      @edit-profile="showProfileEditor = !showProfileEditor"
    />

    <section v-if="showProfileEditor" class="profile-drawer" aria-label="玩家档案编辑器">
      <ProfileForm
        :profile="profileData._玩家设定.档案"
        :status="profileData._玩家设定.状态"
        :allow-skip="false"
        compact
        @save="saveProfile"
        @cancel="showProfileEditor = false"
      />
    </section>

    <TabNav v-model="activeTab" />

    <section
      :id="`status-panel-${activeTab}`"
      :key="activeTab"
      class="panel-shell"
      role="tabpanel"
      :aria-labelledby="`status-tab-${activeTab}`"
      tabindex="0"
    >
      <RelationPanel v-if="activeTab === 'relation'" :relation="data.关系" :identity="data.身份认知" />
      <MusicPanel v-else-if="activeTab === 'music'" :music="data.音乐" />
      <FamePanel v-else-if="activeTab === 'fame'" :fame="data.声名" />
      <MemoryPanel v-else :memory="data.记忆" />
    </section>

    <footer class="status-footer">
      <span>《何止几万梦》状态记录</span>
      <span>{{ data.世界.学期 }}</span>
    </footer>
  </main>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../schema';
import FamePanel from './components/FamePanel.vue';
import MemoryPanel from './components/MemoryPanel.vue';
import MusicPanel from './components/MusicPanel.vue';
import RelationPanel from './components/RelationPanel.vue';
import StatusHeader from './components/StatusHeader.vue';
import TabNav from './components/TabNav.vue';
import ProfileForm from '../玩家档案/ProfileForm.vue';
import { useLatestDataStore } from '../玩家档案/store';
import { useDataStore } from './store';

const props = defineProps<{
  previewData?: StatusData;
}>();

const store = props.previewData ? undefined : useDataStore();
const latestStore = props.previewData ? undefined : useLatestDataStore();
const previewState = props.previewData ? ref(_.cloneDeep(props.previewData)) : undefined;
const data = computed(() => previewState?.value ?? store!.data);
const profileData = computed(() => previewState?.value ?? latestStore!.data);
const activeTab = useLocalStorage('hezhi-wanmeng:status-tab', 'relation');
const showProfileEditor = ref(false);

function saveProfile(archive: Record<string, string>) {
  profileData.value._玩家设定 = { 状态: '已填写', 档案: archive };
  showProfileEditor.value = false;
}
</script>

<style lang="scss" scoped>
.status-card {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  border: 1px solid var(--line-strong);
  background: var(--surface-paper);
  box-shadow: 3px 3px 0 var(--shadow-frame);
}

.panel-shell {
  padding: 15px;
  outline: none;
  animation: lcdPageIn 230ms ease-out both;
}

.profile-drawer {
  padding: 10px;
  border-bottom: 1px solid var(--line-strong);
  background: var(--accent-primary-soft);
}

.profile-drawer :deep(.profile-form) {
  box-shadow: none;
}

.panel-shell:focus-visible {
  box-shadow: inset 0 0 0 2px var(--accent-signal);
}

.status-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 5px 9px;
  border-top: 1px solid var(--line-soft);
  background: var(--surface-muted);
  color: var(--ink-muted);
  font-family: var(--font-data);
  font-size: 0.62rem;
}

@keyframes lcdPageIn {
  0% {
    opacity: 0.58;
    transform: translateX(4px);
    box-shadow: inset 12px 0 0 var(--accent-primary-soft);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
    box-shadow: inset 0 0 0 transparent;
  }
}

@media (max-width: 520px) {
  .status-card {
    box-shadow: 1px 1px 0 var(--shadow-frame);
  }

  .panel-shell {
    padding: 12px 10px;
  }

  .profile-drawer {
    padding: 7px;
  }

  .status-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-shell {
    animation: none;
  }
}
</style>
