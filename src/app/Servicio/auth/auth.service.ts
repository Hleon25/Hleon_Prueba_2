import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {usuarioLogeado} from './../../Interfaces/usuarioLogeado'
import {formatoLogin} from './../../Interfaces/formatoLogin'
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL_LOGIN: string = 'https://dummyjson.com/auth/login';
  public usuarioLogeado: usuarioLogeado | null = null;
  public accesTokken: string | null = null;
  private $cargando = new BehaviorSubject<boolean>(false);
  public cargando = this.$cargando.asObservable();
  constructor(
    private http : HttpClient,
    private router : Router
  ) { }



  public iniciarSesion(nombreUsuario:string, contrasenia:string){
    const cuerpo:formatoLogin = {
        username:nombreUsuario,
        password:contrasenia 
    }
    this.http.post<usuarioLogeado>(this.URL_LOGIN,JSON.stringify(cuerpo), {
      headers: {
        'Content=Type': 'application/json'
      }
    })
    .subscribe(resultado =>{
      this.usuarioLogeado = resultado; 
      this.accesTokken = resultado.acessToken;
      this.$cargando.next(false);
      console.log(resultado);
      this.router.navigate(['/','catalogo']);


    })
  }
  public cerrarSesion (){
    if(this.usuarioLogeado){
      this.usuarioLogeado = null;
      this.accesTokken = null;
    }
  }
}

