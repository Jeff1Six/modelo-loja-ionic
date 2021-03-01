import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/Categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';



@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseURl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }



  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      }, error => {

      });
  }

  showProdutos(categoria_id : string) { 
    this.navCtrl.push('ProdutosPage' , {categoria_id: categoria_id}); //No Push {primeiro parametro nome da var, segundo parametro o que chega no metodo}
    
  }

}
