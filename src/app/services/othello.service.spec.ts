import { TestBed, inject } from '@angular/core/testing';

import { OthelloService } from './othello.service';

describe('OthelloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OthelloService]
    });
  });

  it('should be created', inject([OthelloService], (service: OthelloService) => {
    expect(service).toBeTruthy();
  }));
});
