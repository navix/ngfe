import { Directive, HostBinding, HostListener } from '@angular/core';
import { FeFileComponent } from './fe-file.component';

@Directive({
  selector: '[feFileHolder]',
})
export class FeFileHolderDirective {
  file?: FeFileComponent;

  @HostBinding('style.display') styleDisplay = 'inline-block';

  @HostBinding('style.overflow') styleOverflow = 'hidden';

  @HostBinding('style.position') stylePosition = 'relative';

  @HostListener('click', ['$event']) clickHandler(event: any) {
    if (this.file) {
      this.file.emitClick();
    }
  }
}
