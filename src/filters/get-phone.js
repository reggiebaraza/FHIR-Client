export default (val) => {
  // Check for null values before formating date
  if (val == null) return "N/A";
  if (val.length < 1) return "N/A";

  const phoneObject = val.find((el) => el.system === "phone");
  if (!phoneObject) return "N/A";
  if (!phoneObject["value"]) {
    console.log("phone has been declared but has no value", phoneObject);
    return "N/A";
  }

  return phoneObject["value"];
};
