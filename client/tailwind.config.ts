import type { Config } from 'tailwindcss';

import tokens from './src/tokens/tokens';

const { colors, boxShadow } = tokens;

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors,
    extend: { boxShadow },
  },
  plugins: [],
};
export default config;
