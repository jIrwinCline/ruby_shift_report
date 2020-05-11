export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes;
  const spaces = strTime.length > 4 ? "\t\t\t" : "\t\t\t\t"; // these just turn into one character spaces
  const endSpaces = strTime.length > 4 ? "\t\t\t\t\t\t" : "\t\t\t\t\t\t\t";
  const formattedTimeStr = strTime + spaces + ampm + endSpaces;
  return formattedTimeStr;
};
