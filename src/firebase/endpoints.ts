import appApi, { DOCUMENT_NAME } from "./firebase";
import firebase from "firebase";
import { login, logout } from "../features/auth/authSlice";

export interface INews {
  date: number;
  img: string;
  link: string;
  title: string;
  id: string;
}

export interface IAuthValues {
  email: string;
  password: string
}

const db = appApi.firestore();
const storageRef = appApi.storage().ref();

export const loadNews = async (): Promise<INews[]> => {
  const collection = await db.collection(DOCUMENT_NAME).get();
  return collection.docs.map(doc => {
    return { ...(doc.data() as INews), id: doc.id };
  });
};

export const loadSingleNewsAndGetId = async (data: Omit<INews, 'id'>) => {
  const docRef = await db.collection(DOCUMENT_NAME).add(data);
  return docRef.id;
};

export const loadImageAndGetUrl = async (file: File): Promise<string> => {
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  return fileRef.getDownloadURL();
};

export const removeNewsFromServer = async (id: string) => {
  await db.collection(DOCUMENT_NAME).doc(id).delete();
};

export const updateDateOnServer = async (id: string, newDate: number) => {
  const ref = await db.collection(DOCUMENT_NAME).doc(id);

  return db.runTransaction(function (transaction) {
    return transaction.get(ref).then(function (sfDoc) {
      if (!sfDoc.exists) {
        throw "Document does not exist!";
      }
      transaction.update(ref, { date: newDate });
    });
  });
};

export const updateTitleOnServer = async (id: string, title: string) => {
  const ref = await db.collection(DOCUMENT_NAME).doc(id);

  return db.runTransaction(function (transaction) {
    return transaction.get(ref).then(function (sfDoc) {
      if (!sfDoc.exists) {
        throw "Document does not exist!";
      }
      transaction.update(ref, { title });
    });
  });
};

export const authorize = async ({ email, password }: IAuthValues) => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

type checkAuthCallback = (user: firebase.User) => void

export const checkAuthorize = (callback: checkAuthCallback) => {
  firebase.auth().onAuthStateChanged(callback);
};

export const clearUserData = async () => {
  await firebase.auth().signOut();
};