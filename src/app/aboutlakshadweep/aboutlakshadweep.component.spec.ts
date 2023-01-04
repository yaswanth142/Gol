import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutlakshadweepComponent } from './aboutlakshadweep.component';

describe('AboutlakshadweepComponent', () => {
  let component: AboutlakshadweepComponent;
  let fixture: ComponentFixture<AboutlakshadweepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutlakshadweepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutlakshadweepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
