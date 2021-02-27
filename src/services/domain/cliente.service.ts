import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/Cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{
    constructor(public http: HttpClient, public storage: StorageService){}
    findByEmail(email: string) :Observable<ClienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer  ' + token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers': authHeader}
            );
    }  
    /* FUNCAO  PARA  ACESSAR AMAZON S3 E CAPTURAR IMAGEM
    getImageFromBucket(id: string) :Observable<any> {
        let url = `${API_CONFIG.bucketBaseURl}/cp${id}.jpg`
        return  this.http.get(url, {responseType :  'blob'});
    }
    */
}