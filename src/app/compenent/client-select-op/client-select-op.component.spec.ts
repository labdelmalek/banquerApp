import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectOpComponent } from './client-select-op.component';

describe('ClientSelectOpComponent', () => {
  let component: ClientSelectOpComponent;
  let fixture: ComponentFixture<ClientSelectOpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSelectOpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSelectOpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
