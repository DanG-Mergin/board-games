import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthelloBoardComponent } from './othello-board.component';

describe('OthelloBoardComponent', () => {
  let component: OthelloBoardComponent;
  let fixture: ComponentFixture<OthelloBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthelloBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthelloBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
