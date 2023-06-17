import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    Firestore,
    collectionData,
    collection,
    addDoc,
    deleteDoc,
    doc,
    DocumentData,
    updateDoc,
    getDoc,
} from '@angular/fire/firestore';
import { getDownloadURL, getMetadata, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {

    constructor(
        private firestore: Firestore,
        private storage: Storage) { }

    getUsers(): Observable<User[]> {
        const projectRef = collection(this.firestore, 'users');
        return collectionData(projectRef, { idField: 'id' }) as Observable<User[]>;
    }

    createUser(user: any) {
        const userRef = collection(this.firestore, 'users');
        return addDoc(userRef, user);
    }

    updateUser(user: any) {
        const userRef = collection(this.firestore, 'users');
        return updateDoc(doc(userRef, user.id), user);
    }

    uploadImage(image: any): Promise<any> {
        const imageRef = ref(this.storage, 'images/' + this.idGenerator());
        return uploadBytes(imageRef, image)
            .then(response => {
                // return the download url and the image name
                return Promise.all([getDownloadURL(imageRef), response.ref.name]);
            });
    }

    idGenerator(): string {
        // composed by letters and numbers
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

}
