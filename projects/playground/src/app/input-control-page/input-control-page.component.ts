import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { compileFileList, FeLoadedFile, readFiles } from 'ngfe';

@Component({
  selector: 'app-input-control-page',
  templateUrl: './input-control-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputControlPageComponent {
  value1 = '';
  value2 = '123';
  value3?: string;
  value4 = 111;
  value5 = 111;
  value6 = 666;
  value7 = false;
  value8 = true;
  value9?: boolean;
  value10 = '1';
  value11 = '1';
  value12?: string;
  value13 = 1;
  value14 = '2022-02-24';
  value15 = new Date('2022-03-03');
  value16 = '2022-02-24T05:00';
  value17 = new Date('2022-08-24T18:00');
  value18?: any;
  files1?: FileList;
  files2?: FileList;
  files2loaded?: FeLoadedFile[];
  files3?: FileList = compileFileList([
    {
      file: new File(['123'], 'test2.txt', {
        lastModified: 2222222,
        type: "text/plain"
      }),
      data: 'data:text/plain;base64,RklMRSBURVNU',
    }
  ]);
  value21?: string;
  value22?: string;
  value23?: string;
  value24 = 33;
  value25 = 'jkl';

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  loadFiles2(files?: FileList) {
    this.files2 = files;
    readFiles(files || []).subscribe(loadedFiles => {
      this.files2loaded = loadedFiles;
      this.cdr.markForCheck();
    });
  }
}
