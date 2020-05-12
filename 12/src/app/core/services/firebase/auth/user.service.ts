import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { SignInService } from './sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private ngFireAuth: AngularFireAuth,
    private ngFireFunctions: AngularFireFunctions,
    private signInService: SignInService
  ) {}

  currentUser(): Observable<firebase.User> {
    return this.ngFireAuth.user;
  }

  /**
   * @description
   * write user data to firestore
   */
  async updateUserData() {
    const currentUser = await this.ngFireAuth.currentUser;
    const jsonUser = JSON.parse(JSON.stringify(currentUser));
    return this.ngFireFunctions.httpsCallable('updateUserData')({
      displayName: jsonUser.displayName,
      email: jsonUser.email,
      phoneNumber: jsonUser.phoneNumber,
      photoURL: jsonUser.photoURL,
      uid: jsonUser.uid
    });
  }

  async sendEmailVerification() {
    const currentUser = await this.ngFireAuth.currentUser;
    return currentUser.sendEmailVerification();
  }

  async signInMethods() {
    const currentUser = await this.ngFireAuth.currentUser;
    return this.ngFireAuth.fetchSignInMethodsForEmail(currentUser.email);
  }

  /**
   *
   * For user who use facebook provider only
   */
  async setPassword(newPassword: string) {
    await this.signInService.signInWithFacebook().toPromise();
    const currentUser = await this.ngFireAuth.currentUser;
    currentUser.updatePassword(newPassword);
  }

  /**
   *
   * For user who use email and password
   */
  async updatePassword(currentPassword: string, newPassword: string) {
    const currentUser = await this.ngFireAuth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
    await currentUser.reauthenticateWithCredential(credential);
    await currentUser.updatePassword(newPassword);
  }
}
