import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousNavbarComponent } from './sous-navbar.component';

describe('SousNavbarComponent', () => {
  let component: SousNavbarComponent;
  let fixture: ComponentFixture<SousNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
