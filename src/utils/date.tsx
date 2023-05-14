function TimestampFormatter({ timestamp }: any) {
  const seconds = timestamp._seconds._seconds;
  if (typeof seconds !== "number") {
    console.error("Invalid timestamp:", timestamp);
    return <span>Invalid timestamp</span>;
  }

  const date = new Date(seconds * 1000);

  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();

  return (
    <span>
      {dateString} {timeString}
    </span>
  );
}

export default TimestampFormatter;
