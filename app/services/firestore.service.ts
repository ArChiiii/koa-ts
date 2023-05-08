import type { firestore } from 'firebase-admin'
import * as admin from 'firebase-admin'
import moment from 'moment'
import { Service } from 'typedi'

@Service()
export class FirestoreService {
  firestore: firestore.Firestore

  constructor() {
    this.firestore = admin.firestore()
  }

  docRef(path: string) {
    return this.firestore.doc(path)
  }

  collectionRef(path: string) {
    return this.firestore.collection(path)
  }

  async getFcmToken(user_id) {
    const userRef = this.docRef(`users/${user_id}`)
    const user = (await userRef.get()).data()
    return user.fcm_token
  }

  async fetchUserbyPostID(post_id) {
    const userCollectionRef = this.collectionRef(`users`)
    const users = await userCollectionRef
      .where('liked', 'array-contains', post_id)
      .select('uid')
      .get()
    return users.docs.map(doc => doc.data().uid)
  }
}
