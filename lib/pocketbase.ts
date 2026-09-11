import 'react-native-url-polyfill/auto';
import 'whatwg-fetch';
import PocketBase, { AsyncAuthStore } from 'pocketbase';
import * as SecureStore from 'expo-secure-store';

// Custom storage adapter for PocketBase using Expo SecureStore
const store = new AsyncAuthStore({
  save: async (serialized) => SecureStore.setItemAsync('pb_auth', serialized),
  initial: SecureStore.getItemAsync('pb_auth').then(value => value || ''),
  clear: async () => SecureStore.deleteItemAsync('pb_auth'),
});

// Replace with your PocketBase server URL (Use local IP like 192.168.x.x for Expo physical devices)
const POCKETBASE_URL = 'http://10.227.208.211:8090';

export const pb = new PocketBase(POCKETBASE_URL, store);

// Test connection on initialization
pb.health.check()
  .then(() => console.log('✅ PocketBase connected:', POCKETBASE_URL))
  .catch((err) => console.error('❌ PocketBase connection failed:', err));
