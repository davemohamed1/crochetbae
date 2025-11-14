// src/firebase.ts
// Firebase initialization module for the app.
// Reads config from Vite env vars (VITE_FIREBASE_*) so you can keep credentials out of source.
import { initializeApp, getApps, getApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { Analytics } from 'firebase/analytics';

// Use Vite environment variables. Create a .env file with VITE_FIREBASE_* keys.
// Example .env:
// VITE_FIREBASE_API_KEY=...
// VITE_FIREBASE_AUTH_DOMAIN=...
// VITE_FIREBASE_PROJECT_ID=...
// VITE_FIREBASE_STORAGE_BUCKET=...
// VITE_FIREBASE_MESSAGING_SENDER_ID=...
// VITE_FIREBASE_APP_ID=...
// VITE_FIREBASE_MEASUREMENT_ID=...

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
};

export let app: FirebaseApp | undefined;
export let analytics: Analytics | undefined;

/**
 * Initialize Firebase app if config is present. Safe to call multiple times.
 */
export async function initFirebase(): Promise<FirebaseApp | undefined> {
  // Avoid re-initializing when HMR or multiple imports occur
  if (getApps().length) {
    try {
      app = getApp();
      return app;
    } catch (e) {
      // fall through to initialize
    }
  }

  // Basic presence check — don't try to init if critical values are missing
  if (!firebaseConfig.apiKey || !firebaseConfig.appId || !firebaseConfig.projectId) {
    // Not configured; don't initialize automatically. Callers can still initialize manually.
    // This helps avoid build/runtime errors when env vars aren't set.
    // eslint-disable-next-line no-console
    console.warn('Firebase config incomplete; skipping automatic initialization.');
    return undefined;
  }

  app = initializeApp(firebaseConfig as Record<string, string>);

  // Initialize analytics only in browser and if supported
  if (typeof window !== 'undefined') {
    try {
      const supported = await isSupported();
      if (supported) {
        analytics = getAnalytics(app);
      }
    } catch (e) {
      // ignore analytics errors (e.g., when blocked by browser or missing measurementId)
      // eslint-disable-next-line no-console
      console.warn('Firebase analytics not available', e);
    }
  }

  return app;
}

// Optionally initialize immediately in the browser (non-blocking)
if (typeof window !== 'undefined') {
  // init but don't await — we don't want to block app startup
  void initFirebase();
}

export default initFirebase;
