import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// CARGAMOS LOS DATOS DEL FICHERO .env
process.loadEnvFile();

const {
  API_KEY: API_KEY,
  AUTH_DOMAIN: AUTH_DOMAIN,
  PROJECT_ID: PROJECT_ID,
  STORAGE_BUCKET: STORAGE_BUCKET,
  MESSAGIN_SENDER_ID: MESSAGIN_SENDER_ID,
  APP_ID: APP_ID,
  MEASUREMENT_ID: MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGIN_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
