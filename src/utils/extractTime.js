function extractTime(milliseconds) {
  if (milliseconds > 3600000) {
    throw new Error('Milliseconds outside of bounds.');
  }
  const seconds = milliseconds / 1000;
  return {
    minutes: Math.floor(seconds / 60),
    seconds: Math.floor(seconds % 60),
  };
}
export default extractTime;
