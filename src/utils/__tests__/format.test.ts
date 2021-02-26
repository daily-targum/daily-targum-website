import dayjs from 'dayjs';
import { 
  formatDate, 
  formatDateAbriviated, 
  capitalizeWords, 
  camelCaseToCapitalized, 
  camelCaseToHyphenated,
   hyphenatedToCamelCase, 
   hyphenatedToCapitalized, 
   capitalizedToHypenated, 
   secondsToTimeCode 
} from '../format';

describe('format', () => {

  it('capitalizeWords', () => {
    expect(capitalizeWords('this is a test')).toBe('This Is A Test');
  });

  it('camelCaseToCapitalized', () => {
    expect(camelCaseToCapitalized('thisIsATest')).toBe('This Is A Test');
  });

  it('camelCaseToHyphenated', () => {
    expect(camelCaseToHyphenated('thisIsATest')).toBe('this-is-a-test');
  });

  it('hyphenatedToCapitalized', () => {
    expect(hyphenatedToCapitalized('this-is-a-test')).toBe('This Is A Test');
  });

  it('hyphenatedToCamelCase', () => {
    expect(hyphenatedToCamelCase('this-is-a-test')).toBe('thisIsATest');
  });

  it('capitalizedToHypenated', () => {
    expect(capitalizedToHypenated('This Is A Test')).toBe('this-is-a-test');
  });

  it('secondsToTimeCode', () => {
    expect(secondsToTimeCode(20)).toBe('0:20');
    expect(secondsToTimeCode(60)).toBe('1:00');
    expect(secondsToTimeCode(60 * 1.5)).toBe('1:30');
    expect(secondsToTimeCode(60 * 3)).toBe('3:00');
    expect(secondsToTimeCode(60 * 10)).toBe('10:00');
    expect(secondsToTimeCode(60 * 60)).toBe('1:00:00');
  });


  describe('formatDateAbriviated', () => {

    it('now', () => {
      const date = dayjs();
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('Now');
    });
  
    it('one minute ago', () => {
      const date = dayjs().subtract(1, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('1 minute ago');
    });
  
    it('ten minutes ago', () => {
      const date = dayjs().subtract(10, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('10 minutes ago');
    });
  
    it('thirty minutes ago', () => {
      const date = dayjs().subtract(30, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('30 minutes ago');
    });
  
    it('fifty minutes ago', () => {
      const date = dayjs().subtract(50, 'minute');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('50 minutes ago');
    });
  
    it('one hour ago', () => {
      const date = dayjs().subtract(1, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('1 hour ago');
    });
  
    it('two hours ago', () => {
      const date = dayjs().subtract(2, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('2 hours ago');
    });
  
    it('twelve hours ago', () => {
      const date = dayjs().subtract(12, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('12 hours ago');
    });
  
    it('twenty-three hours ago', () => {
      const date = dayjs().subtract(23, 'hour');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe('23 hours ago');
    });
  
    it('one week ago', () => {
      const date = dayjs().subtract(1, 'week');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D'));
    });
  
    it('two week ago', () => {
      const date = dayjs().subtract(2, 'week');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D'));
    });
  
    it('one year ago', () => {
      const date = dayjs().subtract(1, 'year');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D YYYY'));
    });
  
    it('two years ago', () => {
      const date = dayjs().subtract(2, 'year');
      expect(formatDateAbriviated(date.toDate().valueOf()/1000)).toBe(date.format('MMM D YYYY'));
    });
  
  });
  
  
  const DATE_FORMAT = 'MMM D, YYYY, h:mm A';
  describe('formatDate', () => {
  
    it('now', () => {
      const date = dayjs();
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one minute ago', () => {
      const date = dayjs().subtract(1, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('ten minutes ago', () => {
      const date = dayjs().subtract(10, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('thirty minutes ago', () => {
      const date = dayjs().subtract(30, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('fifty minutes ago', () => {
      const date = dayjs().subtract(50, 'minute');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one hour ago', () => {
      const date = dayjs().subtract(1, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('two hours ago', () => {
      const date = dayjs().subtract(2, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('twelve hours ago', () => {
      const date = dayjs().subtract(12, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('twenty-three hours ago', () => {
      const date = dayjs().subtract(23, 'hour');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one week ago', () => {
      const date = dayjs().subtract(1, 'week');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('two week ago', () => {
      const date = dayjs().subtract(2, 'week');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('one year ago', () => {
      const date = dayjs().subtract(1, 'year');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
    it('two years ago', () => {
      const date = dayjs().subtract(2, 'year');
      expect(formatDate(date.toDate().valueOf()/1000)).toBe(date.format(DATE_FORMAT));
    });
  
  });

});