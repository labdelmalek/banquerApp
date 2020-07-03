import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocageCarteComponent } from './blocage-carte.component';

describe('BlocageCarteComponent', () => {
  let component: BlocageCarteComponent;
  let fixture: ComponentFixture<BlocageCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocageCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocageCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
