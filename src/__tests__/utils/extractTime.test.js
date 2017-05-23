import extractTime from '../../utils/extractTime';

describe('extractTime', () => {
  it('should extract zero values', () => {
    expect(extractTime(0)).toEqual({
      minutes: 0,
      seconds: 0,
    });
  });
  it('should extract low seconds', () => {
    expect(extractTime(25000)).toEqual({
      minutes: 0,
      seconds: 25,
    });
  });
  it('should extract 1 minute', () => {
    expect(extractTime(60000)).toEqual({
      minutes: 1,
      seconds: 0,
    });
  });
  it('should extract 1 minute 1 second', () => {
    expect(extractTime(61000)).toEqual({
      minutes: 1,
      seconds: 1,
    });
  });
  it('should extract 59 seconds @ 59501', () => {
    expect(extractTime(59501)).toEqual({
      minutes: 0,
      seconds: 59,
    });
  });
  it('should extract maximum minutes and seconds', () => {
    expect(extractTime(3599000)).toEqual({
      minutes: 59,
      seconds: 59,
    });
  });
  it('should not extract hours', () => {
    expect(() => {
      extractTime(3600000);
    }).toThrow();
  });
});
