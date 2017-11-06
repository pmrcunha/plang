

// 01 location of the strings /localization/en-US/strings.json
// should be possible to pass a path as an argument

// 02 get the right strings
// receive a locale as argument and get the strings
const main = (locale, filePath) => {
  filePath = filePath || '/localization';
  const location = `${filePath}/${locale}/strings.json`
  // import translations from location;
  return theRightTable; // so i can call this in my app init and get the right table
}

// Flatten translations table
function flattenObject(obj) {
  const flatObj = {};
  return flatObj;
}

// 03 en-US as fallback
function getFallbackTable(locale) {
  if(testLocation(`/localization/${locale}/strings.json`)) {
    return theRightTable;
  } else {
    return usTranslationsTable;
  }
}

function getTableWithFallbackStrings(table, locale) {
  if (locale === 'en-US') {
    return table;
  } else {
    // import usTranslations from '/localization/en-US/strings.json';
    return Object.assign(usTranslations, table)
  }
}

// 05 translate
function t(stringID) {
  if (!translations) {
    throw 'You dont have a translations object in your app scope. Make sure to call plang getTranslations in your app init';
  } else {
    return translations[stringID];
  }
}

const plang = {};
plang.getTranslations = getTranslations; // takes the locale and path to localization folder, returns the translations table
palng.t = t;

export default plang;
