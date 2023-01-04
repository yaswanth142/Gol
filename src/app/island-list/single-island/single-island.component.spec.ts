import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleIslandComponent } from './single-island.component';

describe('SingleIslandComponent', () => {
  let component: SingleIslandComponent;
  let fixture: ComponentFixture<SingleIslandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleIslandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
