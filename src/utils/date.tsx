function TimestampFormatter({ timestamp }: any) {
  const seconds = timestamp._seconds;
  const nanoseconds = timestamp._nanoseconds;

  const date = new Date(seconds * 1000 + nanoseconds / 1e6);

  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  return (
    <span>
      {dateString} {timeString}
    </span>
  );
}

export default TimestampFormatter;
