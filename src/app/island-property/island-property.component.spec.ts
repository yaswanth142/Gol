import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandPropertyComponent } from './island-property.component';

describe('IslandPropertyComponent', () => {
  let component: IslandPropertyComponent;
  let fixture: ComponentFixture<IslandPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
