import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import '../状态栏/global.css';
import { previewData } from '../状态栏/preview-data';

let app: ReturnType<typeof createApp> | undefined;

$(async () => {
  const isPreview = new URLSearchParams(window.location.search).has('preview');

  if (!isPreview) {
    await waitGlobalInitialized('Mvu');
    await waitUntil(() => _.has(getVariables({ type: 'message', message_id: 'latest' }), 'stat_data'));
  }

  app = createApp(App, isPreview ? { previewData } : undefined).use(createPinia());
  app.mount('#app');

  $(window).on('pagehide', () => {
    app?.unmount();
    app = undefined;
  });
});
