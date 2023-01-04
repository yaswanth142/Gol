import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristAddComponent } from './tourist-add.component';

describe('TouristAddComponent', () => {
  let component: TouristAddComponent;
  let fixture: ComponentFixture<TouristAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouristAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouristAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
