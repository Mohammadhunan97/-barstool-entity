const matchRegexToConfig = (regex, string) => {
  if (!regex) {
    return true;
  } else if (RegExp(regex).test(string)) {
    return true;
  } else {
    return false;
  }
};

export default matchRegexToConfig;
