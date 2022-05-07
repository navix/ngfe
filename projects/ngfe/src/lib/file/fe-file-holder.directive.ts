import { Directive, HostBinding, HostListener } from '@angular/core';
import { FeFile } from './fe-file.component';

@Directive({
  selector: '[feFileHolder]',
})
export class FeFileHolder {
  file?: FeFile;

  @HostBinding('style.display') styleDisplay = 'inline-block';

  @HostBinding('style.overflow') styleOverflow = 'hidden';

  @HostBinding('style.position') stylePosition = 'relative';

  @HostListener('click', ['$event']) clickHandler(event: any) {
    if (this.file) {
      this.file.emitClick();
    }
  }
}
