import { AbstractControl } from '@angular/forms';

export function ValidationDetalleFactura(control: AbstractControl) {
    if (!control.value.startsWith('https') || !control.value.includes('.io')) {
        return { validUrl: true };
      }
      return null;
}