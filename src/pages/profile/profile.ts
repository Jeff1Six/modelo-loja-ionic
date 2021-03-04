import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/Cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera
    ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if( localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          // this.getImageifExists();
          //buscar imagem -  Quando  resolver problema  do  Amazon S3
        },  error => {
          if(error.status == 403 ){
            this.navCtrl.setRoot('HomePage');
          }
        });
    }else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  /*  Para quando conectar  com AMAZON S3
  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response=> {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseURl}/cp${this.cliente.id}.jpg`;
    }, error => {});
  }

  */

  getCameraPicture(){

    this.cameraOn = true;

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {

  this.picture  = 'data:image/png;base64,' + imageData;
  this.cameraOn = false;

  }, (err) => {
  // Handle error
  });

    }

}
