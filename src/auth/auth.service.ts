import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { Observable } from 'rxjs';

interface AuthResponseData{
    idToken: string;
    email:string;
    refreshToken :string;
    localId:string;
    expiresIn:string;
    registered? : boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private _userAuthenticated = false;
    private _userId=null;

    get userIsAuthenticated(){
        return this._userAuthenticated;
    }

    get userId(){
        return this._userId;
    }
    constructor(private http : HttpClient){}

    signup(email:string , password:string){
       return this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
            {email : email, password: password , returnSecureToken : true, token: environment.firebaseApiKey});
    }
}