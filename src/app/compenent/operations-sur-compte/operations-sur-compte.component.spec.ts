import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsSurCompteComponent } from './operations-sur-compte.component';

describe('OperationsSurCompteComponent', () => {
  let component: OperationsSurCompteComponent;
  let fixture: ComponentFixture<OperationsSurCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsSurCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsSurCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
