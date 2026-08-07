import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';
import { previewData } from './preview-data';

let app: ReturnType<typeof createApp> | undefined;

$(async () => {
  const isPreview = new URLSearchParams(window.location.search).has('preview');

  if (!isPreview) {
    await waitGlobalInitialized('Mvu');
    await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
  }

  app = createApp(App, isPreview ? { previewData } : undefined).use(createPinia());
  app.mount('#app');

  $(window).on('pagehide', () => {
    app?.unmount();
    app = undefined;
  });
});
