import { forkJoin, Observable } from 'rxjs';

export interface FeLoadedFile {
  file: File;
  data: any;
}

/**
 * Read file data from File[] or FileList (usually received from file inputs).
 */
export function readFiles(
  files: File[] | FileList,
  readAs: 'DataURL' | 'Text' | 'ArrayBuffer' | 'BinaryString' = 'DataURL',
) {
  return forkJoin(Array.from(files).map(f => loadFile(f, readAs)));
}

function loadFile(
  file: File,
  readAs: 'DataURL' | 'Text' | 'ArrayBuffer' | 'BinaryString',
): Observable<FeLoadedFile> {
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
    switch (readAs) {
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

/**
 * FileList factory.
 */
export function compileFileList(files: FeLoadedFile[]) {
  const dataTransfer = new DataTransfer();
  if (dataTransfer.items) {
    files.filter(f => !!f.file).forEach(f => dataTransfer.items.add(f.file));
    return dataTransfer.files;
  }
  return undefined;
}
