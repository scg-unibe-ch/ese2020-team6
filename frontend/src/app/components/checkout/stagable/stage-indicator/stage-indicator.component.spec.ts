import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageIndicatorComponent } from './stage-indicator.component';

describe('StageIndicatorComponent', () => {
  let component: StageIndicatorComponent;
  let fixture: ComponentFixture<StageIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
