import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastGlobaService } from './service/toast-globa.service';

@Component({
  selector: 'app-toast-global',
  templateUrl: './toast-global.component.html'
})
export class ToastGlobalComponent implements OnInit {
  private _renderer2: Renderer2;

  constructor(public toastService: ToastGlobaService, private vc: ViewContainerRef, private cfr: ComponentFactoryResolver) { }

  pMensajeDanger = "";

  private _mensajeStantard = new BehaviorSubject<string>("");
  public get mensajeStantard() {
    return this._mensajeStantard.getValue();
  }
  @Input()
  public set mensajeStantard(value: string) {
    if (value != undefined && value != " ") {
      this._mensajeStantard.next(value);
    }

  }


  private _mensajeSuccess = new BehaviorSubject<string>("");
  public get mensajeSuccess() {
    return this._mensajeSuccess.getValue();
  }
  @Input()
  public set mensajeSuccess(value) {
    if (value != undefined && value != " ") {
      this._mensajeSuccess.next(value);
    }
  }


  private _mensajeDanger = new BehaviorSubject<string>("");
  public get mensajeDanger() {
    return this._mensajeDanger.getValue();
  }
  @Input()
  public set mensajeDanger(value: string) {
    if (value != undefined && value != " ") {
      this._mensajeDanger.next(value);
    }
  }

  @ViewChild('dangerTpl') public templateref: TemplateRef<any>;



  ngOnInit() {

  let prueba = ('<div #dangerTpl>' +
  '<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24"><path d="M10.872 6.831l1.695 3.904 3.654-1.561-1.79 3.426 3.333.954-3.417 1.338 2.231 4.196-4.773-2.582-2.869 2.287.413-3.004-3.792-.726 2.93-1.74-1.885-2.512 3.427.646.843-4.626zm-.786-6.831l-1.665 9.119-6.512-1.228 3.639 4.851-5.548 3.294 7.108 1.361-.834 6.076 5.742-4.577 9.438 5.104-4.288-8.064 6.834-2.677-6.661-1.907 3.25-6.22-6.98 2.982-3.523-8.114z"/></svg>'+
  this.pMensajeDanger +'</div>');
    this._mensajeStantard.subscribe(texto => {
      if (texto != undefined && texto != "") {
        this.toastService.show(texto)
      }
    });
    this._mensajeSuccess.subscribe(texto => {
      if (texto != undefined && texto != "") {
        this.toastService.show(texto, { classname: 'bg-success text-light', delay: 10000 });
      }
    });
    this._mensajeDanger.subscribe(texto => {

      if (texto != undefined && texto != "") {
        //this.templateref = this._renderer2.(prueba);
        //let html = document.createElement(prueba);
        // console.log("danger", texto);
        // console.log("template", this.templateref, prueba);
        //this.pMensajeDanger = texto;

        //const element = this._renderer2.createText("Dynamic ng-content");

    // const factory = this.cfr.resolveComponentFactory(ToastGlobalComponent);
    // const cr: ComponentRef<ToastGlobalComponent> = this.vc.createComponent(factory, 0, null, null);
    //this.templateref = this._renderer2.createElement(cr); 
        this.toastService.show(texto, { classname: 'bg-danger text-light', delay: 15000 });
      }
    });

  }

}
