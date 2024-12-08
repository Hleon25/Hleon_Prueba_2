import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaApi } from '../Interfaces/RespuestaApi';
import { Observable, BehaviorSubject,delay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCatalogoService {
  private $productos = new BehaviorSubject<RespuestaApi | null>(null);
  public productos = this.$productos.asObservable();
  constructor(
    private http: HttpClient
  ) { }

  obtenerProductos(){
    this.http.get<RespuestaApi>('https://dummyjson.com/auth/products?skip=0')
    .pipe(delay(2000))
    .subscribe(losDatos => {
      this.$productos.next(losDatos);
      console.log("Los datos de la Api son");
      console.log(losDatos);
    });
    
  }
}
