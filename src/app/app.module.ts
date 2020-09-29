import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegistroComponent } from './components/cliente/registro/registro.component';
import { ListaComponent } from './components/cliente/lista/lista.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { JumbotronComponent } from './components/shared/jumbotron/jumbotron.component';
import { RegistrarMesaComponent } from './components/mesa/registrar-mesa/registrar-mesa.component';
import { ListaMesaComponent } from './components/mesa/lista-mesa/lista-mesa.component';
import { RegistrarFacturaComponent } from './components/factura/registrar-factura/registrar-factura.component';
import { VerFacturaComponent } from './components/factura/ver-factura/ver-factura.component';
import { ListaFacturasComponent } from './components/factura/lista-facturas/lista-facturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { ClienteWsService } from './services/cliente-ws.service';
import { WebApiService } from './services/web-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule, NgbModule, NgbPaginationModule, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { FacturaWsService } from './services/factura-ws.service';
import { CamareroWsService } from './services/camarero-ws.service';
import { MesaWsService } from './services/mesa-ws.service';
import { CocineroWsService } from './services/cocinero-ws.service';
import { CurrencyPipe } from '@angular/common';
import { ToastGlobalComponent } from './components/shared/toast-global/toast-global.component';
import { ToastGlobaService } from './components/shared/toast-global/service/toast-globa.service';
import { ToastsContainer } from './components/shared/toast-global/container/toast-container';
import { RegistroCamareroComponent } from './components/camarero/registro/registro-camarero.component';
import { RegistroCocineroComponent } from './components/cocinero/registro/registro-cocinero.component';
import { ReporteVentasComponent } from './components/camarero/reporte-ventas/reporte-ventas.component';
import { ReporteComprasComponent } from './components/cliente/reporte-compras/reporte-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegistroComponent,
    ListaComponent,
    LoadingComponent,
    JumbotronComponent,
    RegistrarMesaComponent,
    ListaMesaComponent,
    RegistrarFacturaComponent,
    VerFacturaComponent,
    ListaFacturasComponent,
    ToastGlobalComponent,
    RegistroCamareroComponent,
    RegistroCocineroComponent,
    ReporteVentasComponent,
    ReporteComprasComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  providers: [WebApiService, 
    ClienteWsService, 
    FacturaWsService, 
    CocineroWsService, 
    MesaWsService, 
    CamareroWsService, 
    CurrencyPipe,
    ToastGlobaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
