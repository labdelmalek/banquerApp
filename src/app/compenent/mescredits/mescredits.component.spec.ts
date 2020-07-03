import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MescreditsComponent } from './mescredits.component';

describe('MescreditsComponent', () => {
  let component: MescreditsComponent;
  let fixture: ComponentFixture<MescreditsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MescreditsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MescreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
