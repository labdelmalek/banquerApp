import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocageCompteComponent } from './blocage-compte.component';

describe('BlocageCompteComponent', () => {
  let component: BlocageCompteComponent;
  let fixture: ComponentFixture<BlocageCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocageCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocageCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
