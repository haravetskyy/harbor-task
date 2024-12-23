const formatDate = (date: string): string => {
  const userDate = new Date(date);
  const year: number = userDate.getFullYear();
  const currentDate: Date = new Date();
  const currentYear: number = currentDate.getFullYear();
  let options;

  if (year !== currentYear) {
    options = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
  } else {
    options = {
      month: "long",
      day: "numeric",
    };
  }

  const formattedDate: string = userDate.toLocaleDateString("en-US", options);

  return formattedDate;
};

export default formatDate;
