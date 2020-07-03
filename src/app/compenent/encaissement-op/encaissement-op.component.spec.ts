import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncaissementOpComponent } from './encaissement-op.component';

describe('EncaissementOpComponent', () => {
  let component: EncaissementOpComponent;
  let fixture: ComponentFixture<EncaissementOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncaissementOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncaissementOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
