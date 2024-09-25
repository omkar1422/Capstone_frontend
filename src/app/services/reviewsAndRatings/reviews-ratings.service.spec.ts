import { TestBed } from '@angular/core/testing';

import { ReviewsRatingsService } from './reviews-ratings.service';

describe('ReviewsRatingsService', () => {
  let service: ReviewsRatingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewsRatingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
