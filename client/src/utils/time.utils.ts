import { format, getDaysInMonth } from "date-fns";

export function timeElapsed(date: number) {
  const today = Date.now();

  const seconds = Math.floor((today - date) / 1000);
  // check for seconds
  if (seconds < 60) return seconds + " seconds ago";
  // check for minuted
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + " minutes ago";
  // check for hours
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + " hours ago";
  // check for days ( less than a week )
  const days = Math.floor(hours / 24);
  if (days < 7) return days + " days ago";
  // check for weeks ( less than a month )
  const daysInMonth = getDaysInMonth(date);
  const weeks = days / 7;
  const extraDays = Math.floor(days % 7);
  if (days < daysInMonth) {
    if (extraDays > 0)
      return Math.floor(weeks) + " weeks and " + extraDays + " days ago";
    return Math.floor(weeks) + " weeks ago";
  }

  return format(date, "EEEE, MMM d, y");
}
