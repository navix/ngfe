import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredErrComponent } from './required-err.component';

describe('RequiredErrComponent', () => {
  let component: RequiredErrComponent;
  let fixture: ComponentFixture<RequiredErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredErrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
