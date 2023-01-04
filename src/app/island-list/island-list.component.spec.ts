import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandListComponent } from './island-list.component';

describe('IslandListComponent', () => {
  let component: IslandListComponent;
  let fixture: ComponentFixture<IslandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
