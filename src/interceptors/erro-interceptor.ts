import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alert: AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, caught) => {
                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;          
                }
                if (!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Error detectado");
                console.log(errorObj);

                switch(errorObj.status){
                    case 401:
                        this.handle401();
                        break;

                    case 403:
                        this.handle403();
                        break;
                    
                    default: 
                        this.handlerDefaultError(errorObj);
                   
                }

                return Observable.throw(errorObj);
            }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
    handle401(){
        let alert = this.alert.create({
            title: 'Erro de Credenciais',
            message: 'Email ou senha  incorretos',
            enableBackdropDismiss: false, //Somente sair apertando no botao do alerta
            buttons: [
                {
                    text: 'OK'
                }

            ]
        });
        alert.present()
    }

    handlerDefaultError(errorObj){
        let alert = this.alert.create({
            title: 'Erro  '+ errorObj.status + ': ' + errorObj.error ,
            message: errorObj.message,
            enableBackdropDismiss: false, //Somente sair apertando no botao do alerta
            buttons: [
                {
                    text: 'OK'
                }

            ]
        });
        alert.present()
    }
    
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};