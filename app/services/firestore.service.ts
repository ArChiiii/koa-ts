import type { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import moment from 'moment'
import { Service } from 'typedi'

@Service()
export default class FirestoreService {
  firestore: firestore.Firestore

  constructor() {
    this.firestore = admin.firestore()
  }

  docRef(path: string) {
    return this.firestore.doc(path)
  }

  async getFcmToken(user_id) {
    const userRef = this.docRef(`users/${user_id}`)
    const user = (await userRef.get()).data()
    return user.fcm_token
  }
}
