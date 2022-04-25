import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeDestroyDirective } from './fe-destroy.directive';

describe('FeDestroyDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestHostComponent, FeDestroyDirective],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  it('should call destroy', () => {
    expect(hostComponent.destroyCalls).toBe(0);
    hostComponent.show = true;
    fixture.detectChanges();
    hostComponent.show = false;
    fixture.detectChanges();
    expect(hostComponent.destroyCalls).toBe(1);
  });
});

@Component({
  template: `
    <ng-container *ngIf="show">
      <div (destroy)="destroyCalls = destroyCalls + 1"></div>
    </ng-container>
  `,
})
class TestHostComponent {
  show = false;
  initCalls = 0;
  destroyCalls = 0;
}
