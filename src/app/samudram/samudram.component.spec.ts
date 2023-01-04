import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamudramComponent } from './samudram.component';

describe('SamudramComponent', () => {
  let component: SamudramComponent;
  let fixture: ComponentFixture<SamudramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamudramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamudramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
