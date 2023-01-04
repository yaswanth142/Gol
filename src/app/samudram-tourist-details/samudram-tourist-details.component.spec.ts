import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamudramTouristDetailsComponent } from './samudram-tourist-details.component';

describe('SamudramTouristDetailsComponent', () => {
  let component: SamudramTouristDetailsComponent;
  let fixture: ComponentFixture<SamudramTouristDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamudramTouristDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamudramTouristDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
