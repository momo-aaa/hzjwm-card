import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

let useMvuStore: ReturnType<typeof defineMvuDataStore> | undefined;

export function useDataStore() {
  useMvuStore ??= defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });
  return useMvuStore();
}
