import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousNavbarOpComponent } from './sous-navbar-op.component';

describe('SousNavbarOpComponent', () => {
  let component: SousNavbarOpComponent;
  let fixture: ComponentFixture<SousNavbarOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousNavbarOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousNavbarOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
