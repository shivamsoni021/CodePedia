import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

interface IUserCredentials {
    username: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    /** @ignore */
    constructor(private ionicStorage: Storage) { }

    /**
     * This method is used for setting user details in ionic storage for autologin
     * @param userData contains user credentials
     *
     */
    async setUserdetailsToStorage(userData: IUserCredentials) {
        try {
            await this.ionicStorage.set('userCredentials', userData);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * This method is used for getting user details form the ionic storage
     *
     * @returns return promise of IUserCredentials type
     */
    getUserDetailsFromStorage(): Promise<IUserCredentials> {
        return this.ionicStorage.get('userCredentials');
    }

}
