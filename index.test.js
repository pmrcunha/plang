import { t } from './index';

global.translations = {
  'path.to.a.string': 'Path to a string'
}

it('returns a translated string', () => {
  expect(t('path.to.a.string')).toBe('Path to a string');
});
