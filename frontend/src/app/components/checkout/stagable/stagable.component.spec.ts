import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagableComponent } from './stagable.component';

describe('StagableComponent', () => {
  let component: StagableComponent;
  let fixture: ComponentFixture<StagableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
