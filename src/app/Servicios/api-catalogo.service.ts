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
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  obtenerProductos(){
    this.$cargando.next(true);
    this.http.get<RespuestaApi>('https://dummyjson.com/auth/products?skip=0')
    .pipe(delay(2000))
    .subscribe(losDatos => {
      this.$productos.next(losDatos);
      this.$cargando.next(false);
      console.log("Los datos de la Api son");
      console.log(losDatos);
    });
    
  }
}
