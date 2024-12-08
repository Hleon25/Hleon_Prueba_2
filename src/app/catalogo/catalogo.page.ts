import { Component, OnInit } from '@angular/core';
import {ApiCatalogoService} from './../Servicios/api-catalogo.service';
import {RespuestaApi} from './../Interfaces/RespuestaApi';
import {ViewWillEnter,ViewWillLeave} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit,ViewWillEnter,ViewWillLeave {
  private suscriptionProducto! : Subscription;
  public datos!: RespuestaApi;  

  constructor(
    private producto : ApiCatalogoService
  ) { 
   this.suscriptionProducto =  this.producto.productos.subscribe(losDatos => {

    if (losDatos){
      this.datos = losDatos;
    }
   })
 
    
   
    this.producto.obtenerProductos();
  }
  

  ionViewWillEnter(): void {};
  ionViewWillLeave(): void {};




  ngOnInit() {
  }

}
