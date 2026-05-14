import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

import { handleFirestoreError, OperationType } from "../utils/firebaseErrors";

// Ride Services
export const createRideRequest = async (rideData: any) => {
  try {
    const rideRef = await addDoc(collection(db, "rides"), {
      ...rideData,
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return rideRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, "rides");
  }
};

export const subscribeToRide = (rideId: string, callback: (data: any) => void) => {
  return onSnapshot(doc(db, "rides", rideId), (doc) => {
    callback({ id: doc.id, ...doc.data() });
  });
};

// Driver Services
export const updateDriverLocation = async (driverId: string, location: { lat: number, lng: number }) => {
  const driverRef = doc(db, "drivers", driverId);
  await setDoc(driverRef, {
    location,
    updatedAt: serverTimestamp(),
  }, { merge: true });
};

// Order Services
export const placeOrder = async (orderData: any) => {
  const orderRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  return orderRef.id;
};
