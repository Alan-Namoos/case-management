import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyDpi-VCUfwroMyNRAjkveH3LxTjzDgUnFQ',
	authDomain: 'dev-case-management.firebaseapp.com',
	databaseURL: 'https://dev-case-management.firebaseio.com',
	projectId: 'dev-case-management',
	storageBucket: 'dev-case-management.appspot.com',
	messagingSenderId: '1059908058661',
	appId: '1:1059908058661:web:aaa8af5d76ae376f31c9cc',
	measurementId: 'G-YWYXLNMQ75',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
