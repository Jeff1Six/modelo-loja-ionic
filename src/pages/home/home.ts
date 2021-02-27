import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredencialsDTO } from '../../models/credencials.dto';
import { AuthService } from '../../services/Auth.service';

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

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }
  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('ProfilePage');
    },
    error => {})
}

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menu.swipeEnable(false);
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('ProfilePage');
      },
      error => {})
  }
  signup(){
    this.navCtrl.push('SignupPage')
  }

}
