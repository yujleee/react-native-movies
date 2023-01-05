import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyDSxGWYNH76cWywSA0U83hMCZPVkPuPK2E',
  authDomain: 'movieappwithrn.firebaseapp.com',
  projectId: 'movieappwithrn',
  storageBucket: 'movieappwithrn.appspot.com',
  messagingSenderId: '583425501678',
  appId: '1:583425501678:web:2870172699753ec10186ff',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
