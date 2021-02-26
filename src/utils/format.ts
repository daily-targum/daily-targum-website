import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const formatDateAbriviated = (date: number | string): string => {
  const utcOffset = dayjs().utcOffset();
  const now = dayjs().utc();
  const articleDate = dayjs((+date) * 1000, {utc: true}).utcOffset(utcOffset);
  const minDiff = now.diff(articleDate, 'minute');
  const hourDiff = now.diff(articleDate, 'hour');
  const dayDiff = now.diff(articleDate, 'day');
  const yearDiff = now.diff(articleDate, 'year');

  if(minDiff < 1) {
    return 'Now';
  } else if(minDiff === 1) {
    return `${minDiff} minute ago`;
  } else if(minDiff < 60) {
    return `${minDiff} minutes ago`;
  } else if(hourDiff === 1) {
    return `${hourDiff} hour ago`;
  } else if(hourDiff < 24) {
    return `${hourDiff} hours ago`;
  } else if(dayDiff === 1) {
    return `${dayDiff} day ago`;
  } else if(dayDiff < 7) {
    return `${dayDiff} days ago`;
  } else if(yearDiff < 1) {
    return articleDate.format('MMM D');
  } else {
    return articleDate.format('MMM D YYYY');
  }
}

export const formatDate = (date: number | string) => {
  const utcOffset = dayjs().utcOffset();
  return dayjs((+date) * 1000, {utc: true}).utcOffset(utcOffset).format('MMM D, YYYY, h:mm A');
}

export function capitalizeWords(str: string){
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
 }
 
export function camelCaseToCapitalized(str: string) {
  return capitalizeWords(str.replace(/([A-Z])/g, ' $1'));
}

export function camelCaseToHyphenated(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function hyphenatedToCapitalized(str: string) {
  return capitalizeWords(str.replace(/-/g, ' '));
}

export function hyphenatedToCamelCase(str: string) {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase())
}

export function capitalizedToHypenated(str: string) {
  return str.replace(/\s([A-Z])/g, '-$1').toLowerCase();
}

export function secondsToTimeCode(seconds: number) {   
  // Hours, minutes and seconds
  let hrs = ~~(seconds / 3600);
  let mins = ~~((seconds % 3600) / 60);
  let secs = ~~seconds % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

export function extractTextFromHTML(str: string) {
  return str.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
}