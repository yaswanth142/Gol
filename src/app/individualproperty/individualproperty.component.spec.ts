import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualpropertyComponent } from './individualproperty.component';

describe('IndividualpropertyComponent', () => {
  let component: IndividualpropertyComponent;
  let fixture: ComponentFixture<IndividualpropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualpropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
