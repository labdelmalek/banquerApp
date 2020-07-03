import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeChequeCarteComponent } from './demande-cheque-carte.component';

describe('DemandeChequeCarteComponent', () => {
  let component: DemandeChequeCarteComponent;
  let fixture: ComponentFixture<DemandeChequeCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeChequeCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeChequeCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
