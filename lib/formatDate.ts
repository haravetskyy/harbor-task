const formatDate = (input: Date | string): string => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${input}`);
  }

  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  const formatWithOptions = (options: Intl.DateTimeFormatOptions) =>
    date.toLocaleDateString("en-US", options);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  if (diffDays < 7) {
    return formatWithOptions({ weekday: "long" });
  }

  const isSameYear = date.getFullYear() === today.getFullYear();
  return isSameYear
    ? formatWithOptions({ month: "short", day: "numeric" })
    : formatWithOptions({ month: "short", day: "numeric", year: "numeric" });
};

export default formatDate;
