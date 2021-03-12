import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { getFirebaseBackend } from '../../authUtils';
import { map } from 'rxjs/operators';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    isLogin = false;
    
      roleAs: string;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    user: User;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();  
    }

    /**
     * Returns the current user
     */
    public currentUserValue(): User {
        return this.currentUserSubject.value;
    }
       
    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
     login(username: string, password: string) {
        return this.http.post<any>(`http://127.0.0.1:8000/login/`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', user);
                localStorage.setItem('ROLE', user.Role);
                localStorage.setItem('STATE', 'true');
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    getUserRole() {
        const user = this.currentUserValue();
        return user.Role;
    }
    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        localStorage.setItem('STATE', 'false');
        localStorage.setItem('ROLE', '');
        getFirebaseBackend().logout();
        
    }
    // isLoggedIn() {
    //     const loggedIn = localStorage.getItem('STATE');
    //     if (loggedIn == 'true')
    //       this.isLogin = true;
    //     else
    //       this.isLogin = false;
    //     return this.isLogin;
    //   }
    
    //   getRole() {
    //     this.roleAs = localStorage.getItem('ROLE');
    //     return this.roleAs;
    //   }
}

