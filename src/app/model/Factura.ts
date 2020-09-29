import { DetalleFacturaModel } from "./DetalleFactura";

export interface FacturaModel {
    Idfactura:number;
    IdCliente:number;
    IdMesa:string;
    IdCamarero:number;
    FFactura:Date;
    BActivo:boolean;
    TDetalleFactura:DetalleFacturaModel[];
}
