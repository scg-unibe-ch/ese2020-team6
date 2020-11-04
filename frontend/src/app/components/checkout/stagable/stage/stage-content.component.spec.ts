import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageContentComponent } from './stage-content.component';

describe('StageContentComponent', () => {
  let component: StageContentComponent;
  let fixture: ComponentFixture<StageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
