import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgfeNgAdapterComponent } from './ngfe-ng-adapter.component';

describe('NgfeNgAdapterComponent', () => {
  let component: NgfeNgAdapterComponent;
  let fixture: ComponentFixture<NgfeNgAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgfeNgAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgfeNgAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
