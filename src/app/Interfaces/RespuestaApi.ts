import { Catalogo } from "./Catalogo";
export interface RespuestaApi {
    products : Catalogo[];
    total : Number;
    skip : Number | null;
    limit: number;

    
}