import { Catalogo } from "./Catalogo";
export interface RespuestaApi {
    products : Catalogo[];
    total : number;
    skip : number;
    limit: number;

    
}