import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatepropertyComponent } from './privateproperty.component';

describe('PrivatepropertyComponent', () => {
  let component: PrivatepropertyComponent;
  let fixture: ComponentFixture<PrivatepropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatepropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatepropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
