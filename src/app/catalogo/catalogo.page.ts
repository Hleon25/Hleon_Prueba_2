import { Component} from '@angular/core';
import {ApiCatalogoService} from './../Servicios/api-catalogo.service';
import {ProductoService} from './../servicioProducto/producto.service' ;
import {ViewWillEnter,ViewWillLeave} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import { Catalogo } from '../Interfaces/Catalogo';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements ViewWillEnter,ViewWillLeave {
  public productos: Catalogo[] = [];
  private subProucto!: Subscription; 
  
  constructor(
    public productoService : ProductoService
  ) { 
  
  }
  

  ionViewWillEnter(): void {
    this.subProucto = this.productoService.producto.subscribe(productos => {
      this.productos = productos;
    });
    this.productoService.listarProductos();
  }

  ionViewWillLeave(): void {
    if(this.subProucto){
      this.subProucto.unsubscribe();
    }
  }

  public siguiente(){
    this.productoService.siguientesProductos();
  }

  public anterior(){
    this.productoService.productosAnteriores();
  }


  
}
