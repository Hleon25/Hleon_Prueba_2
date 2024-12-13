import { Injectable } from '@angular/core';
import {Catalogo } from './../Interfaces/Catalogo'
import {RespuestaApi} from './../Interfaces/RespuestaApi'
import {BehaviorSubject} from 'rxjs';
import {HttpClient } from '@angular/common/http'
import { AuthService} from './../Servicio/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly URL_CATALOGO = 'https://dummyjson.com/auth/products?skip=0'
  private inicicio = 0;
  private skip = 0;
  private cantidad = 30;
  private total = 0;
  private $productos = new BehaviorSubject<Catalogo[]>([]);
  public producto = this.$productos.asObservable();
  
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public listarProductos(){
    const url_nueva = `${this.URL_CATALOGO}?limit=${this.cantidad}&skip=0`;
    this.http.get<RespuestaApi>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accesTokken,
        'Content-Type': 'application/json'
      }
  })
  .subscribe(datos => {
    this.$productos.next(datos.products);
    this.total = datos.total;
  });
}
  
  public siguientesProductos(){
    this.skip = this.skip + this.cantidad;
    const url_nueva = `${this.URL_CATALOGO}?limit=${this.cantidad}&skip=${this.skip}`;
    this.http.get<RespuestaApi>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accesTokken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });
  }

  public productosAnteriores(){
    const resta = this.skip - this.cantidad;
    if(resta < 0){
      this.skip = 0;
    }
    else {
      this.skip = this.skip - this.cantidad;
    }
    const url_nueva = `${this.URL_CATALOGO}?limit=${this.cantidad}&skip=${this.skip}`;
    this.http.get<RespuestaApi>(url_nueva, {
      headers: {
        'Authorization': 'Bearer '+this.auth.accesTokken,
        'Content-Type': 'application/json'
      }
    })
    .subscribe(datos => {
      this.$productos.next(datos.products);
      this.total = datos.total;
    });
  }
}  