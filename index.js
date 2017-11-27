import React from 'react';

let supportedLocales = [
  'en-US',
];

const setSupportedLocales = (locales) => {
  supportedLocales = locales;
};

const setLocale = (locale) => {
  let localeToSet = locale || navigator.language || 'en-US';
  localeToSet = supportedLocales.indexOf(localeToSet) >= 0 ? localeToSet : 'en-US';
  document.cookie = `locale=${localeToSet}`;
};

const getLocale = () => {
  // eslint-disable-next-line
  const locale = document.cookie.replace(/(?:(?:^|.*;\s*)locale\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  return locale;
};

const getTranslations = ({
  locale = 'en-US',
  pathToTranslations = 'localization',
}) => new Promise((resolve, reject) => {
  const path = `${pathToTranslations}/${locale}/strings.json`;
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

const withTranslations = (WrappedComponent, _locale) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translations: {},
    };
    this.getTrans();
  }

  getTrans() {
    getTranslations({ locale: _locale }).then((t) => {
      this.setState({
        translations: t,
      });
    });
  }

  render() {
    return React.createElement(
      WrappedComponent,
      Object.assign({}, this.props, { t: this.state.translations }),
      null,
    );
  }
};

export default {
  setSupportedLocales,
  setLocale,
  getLocale,
  withTranslations,
};
