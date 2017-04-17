import toPad from '../../utils/toPad';

describe('toPad', () => {
  it('should pad numbers less than 10', () => {
    expect(toPad(9)).toBe('09');
  });
  it('should not pad numbers greater than 10', () => {
    expect(toPad(11)).toBe('11');
  });
});
