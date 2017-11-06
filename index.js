const plang = {};

const getLocale = () => {
  const locale = 'en-US';
  return locale;
};

const getTranslations = ({
  locale = 'en-US',
  pathToTranslations = '/localization',
}) => new Promise((resolve, reject) => {
  const path = `${pathToTranslations}/${locale}/strings.json`;
  console.log(path);
  const ajax = new XMLHttpRequest();
  ajax.open('GET', path, true);
  ajax.responseType = 'json';
  ajax.onload = () => {
    resolve(ajax.response);
  };
  ajax.onerror = () => {
    reject(ajax.statusText);
  };
  ajax.send();
});

const setTranslations = (translations) => {
  console.log(translations);
  plang.translations = translations;
};

const t = key => plang.translations[key]; // eslint-disable-line no-undef

export default Object.assign(plang, {
  getLocale,
  getTranslations,
  setTranslations,
  t,
});
