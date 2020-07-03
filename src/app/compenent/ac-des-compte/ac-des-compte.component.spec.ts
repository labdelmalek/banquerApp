import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDesCompteComponent } from './ac-des-compte.component';

describe('AcDesCompteComponent', () => {
  let component: AcDesCompteComponent;
  let fixture: ComponentFixture<AcDesCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcDesCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcDesCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
