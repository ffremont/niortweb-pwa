import { SseMiddleware } from './sse.middleware';

describe('SseMiddleware', () => {
  it('should be defined', () => {
    expect(new SseMiddleware()).toBeDefined();
  });
});
