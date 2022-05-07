import { AfterViewInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FeModel } from '../../../../../ngfe/src/lib/model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, AfterViewInit {
  @Input() label?: string;

  // @todo use static
  @ContentChild(FeModel) model?: FeModel;

  constructor(
//    public model: FeModel<any>
  ) {
//    console.log('MODEL', this.model);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log('FE MODEL', this.model);
  }

  get required() {
    return !!this.model?.getValidator('required');
  }

  get invalid() {
    return !!this.model?.errors;
  }
}
