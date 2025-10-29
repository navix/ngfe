import {Component, signal} from '@angular/core';
import {
  compileFileList,
  FeLoadedFile,
  FeModule,
  readFiles,
} from '../../../../../ngfe/src/public-api';
import {ValueView} from '../../components/value-view/value-view';

@Component({
  selector: 'app-input-control-page',
  imports: [FeModule, ValueView],
  templateUrl: './input-control-page.html',
})
export class InputControlPage {
  value1 = signal('');
  value2 = signal('123');
  value3 = signal<string | undefined>(undefined);
  value4 = signal(111);
  value5 = signal('111');
  value6 = signal(666);
  value7 = signal(false);
  value8 = signal(true);
  value9 = signal<boolean | undefined>(undefined);
  value10 = signal('1');
  value11 = signal('1');
  value12 = signal<string | undefined>(undefined);
  value13 = signal(1);
  value14 = signal('2022-02-24');
  value15 = signal(new Date('2022-03-03'));
  value16 = signal('2022-02-24T05:00');
  value17 = signal(new Date('2022-08-24T18:00:00.000Z'));
  value18 = signal<any>(undefined);

  files1 = signal<FileList | undefined>(undefined);
  files2 = signal<FileList | undefined>(undefined);
  files2loaded = signal<FeLoadedFile[] | undefined>(undefined);
  files3 = signal<FileList | undefined>(
    compileFileList([
      {
        file: new File(['123'], 'test2.txt', {
          lastModified: 2222222,
          type: 'text/plain',
        }),
        data: 'data:text/plain;base64,RklMRSBURVNU',
      },
    ]),
  );

  value21 = signal<string | undefined>(undefined);
  value22 = signal<string | undefined>(undefined);
  value23 = signal<string | undefined>(undefined);
  value24 = signal(33);
  value25 = signal('jkl');
  value26 = signal('');

  loadFiles2(files?: FileList) {
    this.files2.set(files);
    readFiles(files || []).subscribe(loadedFiles => {
      this.files2loaded.set(loadedFiles);
    });
  }
}
