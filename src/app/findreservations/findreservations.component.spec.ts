import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindreservationsComponent } from './findreservations.component';

describe('FindreservationsComponent', () => {
  let component: FindreservationsComponent;
  let fixture: ComponentFixture<FindreservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindreservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindreservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
