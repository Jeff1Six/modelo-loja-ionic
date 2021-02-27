import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CredencialsDTO } from '../../models/credencials.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredencialsDTO = {
    
    email: "",
    senha:""
  };

  constructor(public navCtrl: NavController) {

  }
  login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

}
