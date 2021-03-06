import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/Produto.dto';
import { ProdutoService } from '../../services/domain/Produto.service';
@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO [] = [];
  page : number = 0;
  linesPerPage : number = 24;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)

      .subscribe(response=>{
        this.items = this.items.concat(response['content']);
        loader.dismiss();
        this.loadImageUrl();
      }, error => {
        loader.dismiss();
      })
  }
  
  loadImageUrl(){
    for (var i=0; i<this.items.length; i++){
    let item = this.items[i];
    this.produtoService.getSmallImageFromBucket(item.id)
    .subscribe(response=> {
      item.imageUrl = `${API_CONFIG.bucketBaseURl}/prod${item.id}-small.jpg`;
    }, error => {});
  }
}

presentLoading(){
  let loader = this.loadingController.create({
    content: "Aguarde..."
  });
  loader.present();
  return loader;
}

showDetail(produto_id : string){
  this.navCtrl.push('ProdutoDetailPage' , {produto_id: produto_id})
}

doRefresh(refresher) {
  this.page = 0;
  this.items = [];
  this.loadData();
  setTimeout(() => {
    refresher.complete();
  }, 1000);
}
doInfinite(infiniteScroll) {
  this.page++;
  this.loadData();
  setTimeout(() => {
   infiniteScroll.complete();
    }, 1000);
  }

}


