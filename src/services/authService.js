import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  reload,
} from 'firebase/auth'
import { auth } from '../firebase.js'

export async function signupWithEmail(email, password) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  await sendEmailVerification(credential.user)
  await signOut(auth)
  return credential.user
}

export async function loginWithEmail(email, password) {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  await reload(credential.user)

  if (!credential.user.emailVerified) {
    await signOut(auth)
    throw new Error('Email not verified. Please verify your email before logging in.')
  }

  return credential.user
}

export async function resendVerificationEmail(user) {
  await sendEmailVerification(user)
}

export async function logoutUser() {
  await signOut(auth)
}
