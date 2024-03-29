import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../auth/auth.user';
import { map ,tap } from 'rxjs/operators';
export interface AuthResponseData{
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
    
    currentuserId : string ;
    responseData : Observable<AuthResponseData>;

    private _user = new BehaviorSubject<User>(null);
 
    get userIsAuthenticated(){
        return this._user.asObservable().pipe(map (user =>{
           if(user){    
            return !!user.token;
        }
        else{
            return false;
        }
    }
        ));
    }

    get userId(){
        return this._user.asObservable().pipe(map(user => {
            if(user){
            return user.id;
        }
        else{
            return null;
        }
    }));
    }
    constructor(private http : HttpClient){}

    signup(email:string , password:string){
     
        this.responseData = this.http.post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
            {email : email, password: password , returnSecureToken : true, token: environment.firebaseApiKey})
            .pipe(tap(this.setUserData.bind(this)));
        
        return this.responseData;    
        }

    login(email:string , password:string){
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
        {email: email , password : password , returnSecureToken : true })
        .pipe(tap(this.setUserData.bind(this)));
   
    }

    logOut(){
        this._user.next(null);
    }

    private setUserData(userData : AuthResponseData){
        
            const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
            this._user.next(new User(userData.localId , userData.email , userData.idToken , expirationTime));
    
    }

    pushData(email:string , uid: string){
         
        return this.http.put(`https://codeshala-6dd34.firebaseio.com/users/${uid}.json`,{
            email:email , name:"", xp:"" ,badges : "" , coursesCompleted : "" , courseStudying:"" ,imageUrl:""});
    }

    getUserData(userId:string){
        return this.http.get(`https://codeshala-6dd34.firebaseio.com/users/${userId}.json`);
    }

    getData(userId : string){
       return this.http.get('https://codeshala-6dd34.firebaseio.com/trial.json');
    }

    setUserId(userId:string){
        this.currentuserId = userId;
    }
    
    getUserId(){

        return this.currentuserId;
    }
}