import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthelloPieceComponent } from './othello-piece.component';

describe('OthelloPieceComponent', () => {
  let component: OthelloPieceComponent;
  let fixture: ComponentFixture<OthelloPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthelloPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthelloPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
