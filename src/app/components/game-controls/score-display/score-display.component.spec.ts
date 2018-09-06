import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreControlComponent } from './score-control.component';

describe('ScoreControlComponent', () => {
  let component: ScoreControlComponent;
  let fixture: ComponentFixture<ScoreControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
