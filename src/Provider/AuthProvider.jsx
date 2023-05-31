import { createContext, useEffect, useState } from 'react';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile
} from 'firebase/auth';
import { app } from '../Firebase/firebase.config';
import { FaAmericanSignLanguageInterpreting } from 'react-icons/fa';
import axios from 'axios';

const auth = getAuth(app);
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// create user
	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	// sign in  user
	const signInUser = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// sign in with google
	const signInWithGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	// logout user
	const logoutUser = () => {
		setLoading(true);
		return signOut(auth);
	};

	// update user profile
	const updateUserProfile = (displayName, photoURL) => {
		return updateProfile(auth.currentUser, { displayName, photoURL });
	};

	// observing user state
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				axios.post('http://localhost:5000/jwt', { email: currentUser.email }).then((data) => {
					// console.log(data);
					localStorage.setItem('access-token', data.data.token);
					setLoading(false);
				});
			} else {
				localStorage.removeItem('access-token');
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo = {
		user,
		loading,
		createUser,
		signInUser,
		signInWithGoogle,
		updateUserProfile,
		logoutUser
	};
	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
