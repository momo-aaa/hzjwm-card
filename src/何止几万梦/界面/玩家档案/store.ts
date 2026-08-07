import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

let useLatestMvuStore: ReturnType<typeof defineMvuDataStore> | undefined;

export function useLatestDataStore() {
  useLatestMvuStore ??= defineMvuDataStore(Schema, { type: 'message', message_id: 'latest' });
  return useLatestMvuStore();
}
