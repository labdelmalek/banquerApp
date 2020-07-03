import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeCreditComponent } from './demande-credit.component';

describe('DemandeCreditComponent', () => {
  let component: DemandeCreditComponent;
  let fixture: ComponentFixture<DemandeCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
