import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredencialsDTO } from "../models/credencials.dto";
import { LocalUser } from "../models/localUser";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{
    
    constructor(public http: HttpClient, public storage: StorageService){

    }

    authenticate(creds: CredencialsDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    successfulLogin(authorizationValue : String){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok
        };

        this.storage.setLocalUser(user);
    }
    
    logout(){
        this.storage.setLocalUser(null);
    }
}