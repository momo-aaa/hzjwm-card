<template>
  <div class="music-panel">
    <section class="player-screen" aria-labelledby="focus-project-heading">
      <div class="player-topline">
        <span>LINLIN AUDIO WORKSTATION</span>
        <span>PLAYLIST {{ projects.length.toString().padStart(2, '0') }}</span>
      </div>
      <div class="player-main">
        <div class="transport" aria-hidden="true">▶</div>
        <div>
          <span id="focus-project-heading" class="screen-label">CURRENT PROJECT</span>
          <strong>{{ music.当前焦点项目 }}</strong>
          <span class="screen-subtitle">{{ focusProject?.阶段 ?? '等待新的创作记录' }}</span>
        </div>
        <div class="screen-progress">{{ focusProject?.进度 ?? 0 }}%</div>
      </div>
    </section>

    <section aria-labelledby="project-heading">
      <div class="section-title">
        <span id="project-heading">活动项目</span>
        <small>ACTIVE TRACKS</small>
      </div>
      <div v-if="projects.length" class="project-list">
        <article v-for="([name, project], index) in projects" :key="name" class="project-row">
          <div class="track-number">{{ (index + 1).toString().padStart(2, '0') }}</div>
          <div class="project-copy">
            <div class="project-heading">
              <strong>{{ name }}</strong>
              <span>{{ project.类别 }} · {{ project.状态 }}</span>
            </div>
            <p>{{ project.阶段 }}</p>
            <div class="project-track" :aria-label="`${name}进度${project.进度}%`">
              <span :style="{ width: `${project.进度}%` }"></span>
            </div>
          </div>
          <div class="project-value">{{ project.进度 }}%</div>
        </article>
      </div>
      <p v-else class="empty-copy">播放列表还是空的，新的旋律还没被命名。</p>
    </section>

    <section class="inspiration" aria-labelledby="inspiration-heading">
      <div class="section-title">
        <span id="inspiration-heading">灵感碎片</span>
        <small>MEMO REC.</small>
      </div>
      <ul v-if="music.灵感碎片.length">
        <li v-for="fragment in music.灵感碎片" :key="`${fragment.名称}-${fragment.描述}`">
          <strong>{{ fragment.名称 }}</strong>
          <span>{{ fragment.描述 }}</span>
        </li>
      </ul>
      <p v-else class="empty-copy">今天还没有留下新的灵感录音。</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Schema as StatusData } from '../../../schema';

const props = defineProps<{
  music: StatusData['音乐'];
}>();

const projects = computed(() => Object.entries(props.music.活动项目));
const focusProject = computed(() => props.music.活动项目[props.music.当前焦点项目]);
</script>

<style lang="scss" scoped>
.music-panel {
  display: grid;
  gap: 16px;
}

.player-screen {
  padding: 9px;
  border: 1px solid var(--line-strong);
  background: var(--surface-screen);
  color: #29342b;
  font-family: var(--font-data);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.4);
}

.player-topline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #7a8979;
  color: #536052;
  font-size: 0.62rem;
  letter-spacing: 0.05em;
}

.player-main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 11px;
  padding-top: 9px;
}

.transport {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid #657363;
  background: var(--surface-screen-strong);
  font-size: 0.72rem;
}

.player-main strong,
.player-main span {
  display: block;
}

.player-main strong {
  margin: 1px 0;
  font-size: 1rem;
}

.screen-label,
.screen-subtitle {
  color: #596657;
  font-size: 0.66rem;
}

.screen-progress {
  color: #3f4c3e;
  font-size: 1.3rem;
  font-weight: 700;
}

.section-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 7px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--line-soft);
}

.section-title span {
  font-weight: 700;
}

.section-title small {
  color: var(--ink-muted);
  font-family: var(--font-data);
  letter-spacing: 0.06em;
}

.project-list {
  display: grid;
}

.project-row {
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 9px;
  align-items: center;
  padding: 9px 2px;
  border-bottom: 1px dotted var(--line-soft);
}

.project-row:last-child {
  border-bottom: 0;
}

.track-number,
.project-value {
  color: var(--ink-muted);
  font-family: var(--font-data);
  font-size: 0.72rem;
}

.project-copy {
  min-width: 0;
}

.project-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.project-heading span,
.project-copy p {
  color: var(--ink-secondary);
  font-size: 0.74rem;
}

.project-copy p {
  margin: 2px 0 5px;
}

.project-track {
  height: 4px;
  background: var(--surface-muted);
}

.project-track span {
  display: block;
  height: 100%;
  background: var(--accent-primary);
}

.inspiration ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.inspiration li {
  display: grid;
  grid-template-columns: minmax(110px, 0.55fr) 1.45fr;
  gap: 10px;
  padding: 7px 9px;
  border-left: 3px solid var(--accent-signal);
  background: var(--surface-raised);
}

.inspiration li span {
  color: var(--ink-secondary);
}

.empty-copy {
  margin: 0;
  color: var(--ink-muted);
  font-style: italic;
}

@media (max-width: 520px) {
  .player-main {
    grid-template-columns: auto 1fr;
  }

  .screen-progress {
    grid-column: 2;
    font-size: 0.9rem;
  }

  .project-heading,
  .inspiration li {
    align-items: flex-start;
    grid-template-columns: 1fr;
  }

  .project-heading {
    display: grid;
    gap: 0;
  }
}
</style>
