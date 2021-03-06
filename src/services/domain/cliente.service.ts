import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/Cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{
    constructor(public http: HttpClient, public storage: StorageService){}


    findById(id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }  


    insert(obj : ClienteDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`, obj, {
                observe: 'response' , 
                responseType: 'text'
            })
    }

    
    /* FUNCAO  PARA  ACESSAR AMAZON S3 E CAPTURAR IMAGEM
    getImageFromBucket(id: string) :Observable<any> {
        let url = `${API_CONFIG.bucketBaseURl}/cp${id}.jpg`
        return  this.http.get(url, {responseType :  'blob'});
    }
    */
}