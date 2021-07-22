import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgfeComponent } from './ngfe.component';

describe('NgfeComponent', () => {
  let component: NgfeComponent;
  let fixture: ComponentFixture<NgfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgfeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
