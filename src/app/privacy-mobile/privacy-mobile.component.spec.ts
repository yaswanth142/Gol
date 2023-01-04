import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyMobileComponent } from './privacy-mobile.component';

describe('PrivacyMobileComponent', () => {
  let component: PrivacyMobileComponent;
  let fixture: ComponentFixture<PrivacyMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
