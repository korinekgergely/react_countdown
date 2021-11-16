const twoDigits = (num) => String(num).padStart(2, '0');
function seconds_to_days_hours_mins_secs_str(seconds) {
  let hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds.toFixed(1))}`
}

export { seconds_to_days_hours_mins_secs_str, twoDigits }