import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from '../components/cliente/registro/registro.component';
import { ListaComponent } from '../components/cliente/lista/lista.component';
import { RegistrarFacturaComponent } from '../components/factura/registrar-factura/registrar-factura.component';
import { RegistrarMesaComponent } from '../components/mesa/registrar-mesa/registrar-mesa.component';
import { RegistroCamareroComponent } from '../components/camarero/registro/registro-camarero.component';
import { RegistroCocineroComponent } from '../components/cocinero/registro/registro-cocinero.component';
import { ReporteVentasComponent } from '../components/camarero/reporte-ventas/reporte-ventas.component';
import { ReporteComprasComponent } from '../components/cliente/reporte-compras/reporte-compras.component';

export const ROUTES: Routes = [
  { path: 'home', component: RegistroComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'factura', component: RegistrarFacturaComponent },
  { path: 'registro-mesa', component: RegistrarMesaComponent },
  { path: 'registro-camarero', component: RegistroCamareroComponent },
  { path: 'registro-cocinero', component: RegistroCocineroComponent },
  { path: 'app-reporte-ventas', component: ReporteVentasComponent },
  { path: 'cliente-reporte-compras', component: ReporteComprasComponent },
  // { path: 'triki', component: TrikiComponent, canActivate: [AuthGuardService] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutesModule { }
