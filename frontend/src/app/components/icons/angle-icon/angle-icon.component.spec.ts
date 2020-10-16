import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngleIconComponent } from './angle-icon.component';

describe('AngleIconComponent', () => {
  let component: AngleIconComponent;
  let fixture: ComponentFixture<AngleIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngleIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
