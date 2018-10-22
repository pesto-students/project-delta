import * as firebase from 'firebase/app';
import 'firebase/storage';

import { FIREBASE as fbConf } from '../config';

firebase.initializeApp(fbConf);
const storage = firebase.storage();

// uploads file to firebase, makes it public, and returns public url
export function uploadFile(file, userId) {
  const storageRef = storage.ref();
  const ref = storageRef.child(`${userId}/${file.name}`);

  return ref.put(file).then(() => ref.getDownloadURL());
}
