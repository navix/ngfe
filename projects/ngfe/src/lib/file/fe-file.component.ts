import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { FeFileHolderDirective } from './fe-file-holder.directive';
import { FeFileSelect } from './meta';

@Component({
  selector: 'input[type="file"][feFile]',
  template: '',
  styleUrls: ['./fe-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'uiFile',
})
export class FeFileComponent {
  @Input() readAs: 'DataURL' | 'Text' | 'ArrayBuffer' | 'BinaryString' = 'DataURL';

  @Output() fileSelect = new EventEmitter<FeFileSelect[]>();

  @Output() fileError = new EventEmitter<string>();

  constructor(
    private holder: FeFileHolderDirective,
    private elementRef: ElementRef,
  ) {
    this.holder.file = this;
  }

  @HostListener('change', ['$event']) changeHandler(event: any) {
    if (event && event.target) {
      forkJoin(Array.from(event.target.files as FileList).map(f => this.loadFile(f)))
        .subscribe(files => {
          this.fileSelect.emit(files);
        }, error => {
          this.fileError.next(error);
        });
    }
  }

  emitClick() {
    this.elementRef.nativeElement.click();
  }

  reset() {
    this.elementRef.nativeElement.value = '';
  }

  private loadFile(file: File): Observable<FeFileSelect> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        observer.next({
          file,
          data: e.target.result,
        });
        observer.complete();
      };
      reader.onerror = () => {
        observer.error('Read data error');
      };
      switch (this.readAs) {
        case 'DataURL':
          reader.readAsDataURL(file);
          break;
        case 'Text':
          reader.readAsText(file);
          break;
        case 'ArrayBuffer':
          reader.readAsArrayBuffer(file);
          break;
        case 'BinaryString':
          reader.readAsBinaryString(file);
      }
    });
  }
}
