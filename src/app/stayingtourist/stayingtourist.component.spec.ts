import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayingtouristComponent } from './stayingtourist.component';

describe('StayingtouristComponent', () => {
  let component: StayingtouristComponent;
  let fixture: ComponentFixture<StayingtouristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayingtouristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayingtouristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
