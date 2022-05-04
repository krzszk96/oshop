import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase ,AngularFireObject  } from '@angular/fire/compat/database';
import { AppUser } from './models/app.user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save (user: firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any>{
    return this.db.object('/users/' + uid).valueChanges();;
  }

}
