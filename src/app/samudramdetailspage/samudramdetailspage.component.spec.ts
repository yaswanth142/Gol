import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamudramdetailspageComponent } from './samudramdetailspage.component';

describe('SamudramdetailspageComponent', () => {
  let component: SamudramdetailspageComponent;
  let fixture: ComponentFixture<SamudramdetailspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamudramdetailspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamudramdetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
