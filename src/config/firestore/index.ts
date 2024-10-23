import { firestore } from 'firebase-admin';

class FirestoreService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async save(documentId: string, data: object) {
    await firestore().collection(this.collectionName).doc(documentId).set(data);
  }

  async get(documentId: string) {
    const doc = await firestore().collection(this.collectionName).doc(documentId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async delete(documentId: string) {
    await firestore().collection(this.collectionName).doc(documentId).delete();
  }

  async upload(filePath: string, data: object) {
    const fileRef = firestore().collection(this.collectionName).doc(filePath);
    await fileRef.set(data);
  }
}

export default FirestoreService;
