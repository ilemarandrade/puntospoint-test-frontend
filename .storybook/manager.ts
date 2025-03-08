import { addons } from '@storybook/manager-api';
import themeStorybook from './theme-storybook';

addons.setConfig({
  theme: themeStorybook,
});
