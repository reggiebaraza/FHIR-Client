export default (val) => {
  // Check for null values before formating date
  if (val == null) return "N/A";
  if (val.length < 1) return "N/A";

  const officialName = val.find((el) => el.use === "official");
  if (officialName)
    return officialName["family"] + " " + officialName["given"].join(" ");

  const usualName = val.find((el) => el.use === "usual");
  if (usualName) return usualName["text"];

  const otherName = val[0];

  return otherName["family"] + " " + otherName["given"].join(" ");
};
