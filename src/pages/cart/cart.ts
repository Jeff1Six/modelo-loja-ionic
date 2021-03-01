import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/Produto.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  item: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public  produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {  
    let cart = this.cartService.getCart();
    this.item  = cart.itens;
    this.loadImageUrl();
  }

  loadImageUrl(){
    for (var i=0; i<this.item.length; i++){
    let item = this.item[i];
    this.produtoService.getSmallImageFromBucket(item.produto.id)
    .subscribe(response=> {
      item.produto.imageUrl = `${API_CONFIG.bucketBaseURl}/prod${item.produto.id}-small.jpg`;
    }, error => {});
  }
}

}
