function extractTime(milliseconds) {
  if (milliseconds > 3600000) {
    throw new Error('Milliseconds outside of bounds.');
  }
  const time = new Date(milliseconds);
  return {
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),
  };
}
export default extractTime;
