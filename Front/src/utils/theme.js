// color design tokens export
export const colorTokens = {
 grey: {
  0: '#FFFFFF',
  10: '#F6F6F6',
  50: '#F0F0F0',
  100: '#E0E0E0',
  200: '#C2C2C2',
  300: '#A3A3A3',
  400: '#858585',
  500: '#666666',
  600: '#4D4D4D',
  700: '#333333',
  800: '#1A1A1A',
  900: '#0A0A0A',
  1000: '#000000',
  1100: '#EFEFEF',
  1200: '#4B4B4B',
 },
 primary: {
  50: '#E6FBFF',
  100: '#CCF7FE',
  200: '#99EEFD',
  300: '#66E6FC',
  400: '#33DDFB',
  500: '#2e55a0',
  600: '#00A0BC',
  700: '#006B7D',
  800: '#00353F',
  900: '#001519',
  1000: '#727272',
  10000: '#393939',
 },
 others: {
  1: '#433F40', //ligth - NavBar
  2: '#68D7E0', // icon color
 },
};

// mui theme settings
export const themeSettings = (mode) => {
 return {
  palette: {
   mode: mode,
   ...(mode === 'dark'
    ? {
       // palette values for dark mode
       primary: {
        same: colorTokens.grey[100],
        dark: colorTokens.primary[200],
        main: colorTokens.primary[500],
        light: colorTokens.primary[100],
        loginFont: "green",
       },
       neutral: {
        dark: colorTokens.grey[100],
        main: colorTokens.grey[200],
        mediumMain: colorTokens.grey[300],
        medium: colorTokens.grey[400],
        light: colorTokens.grey[700],
       },
       others: {
        font: colorTokens.others[2],
        homeh6: colorTokens.grey[500],
       },
       background: {
        default: colorTokens.grey[700],
        alt: colorTokens.grey[1],
        login: colorTokens.grey[700],
        logininput: colorTokens.primary[10000],
       },
      }
    : {
       // palette values for light mode
       primary: {
        same: colorTokens.grey[100],
        dark: colorTokens.primary[700],
        main: colorTokens.primary[500],
        light: colorTokens.primary[600],
        loginFont: colorTokens.primary[10000],
       },
       neutral: {
        dark: colorTokens.grey[700],
        main: colorTokens.grey[500],
        mediumMain: colorTokens.grey[400],
        medium: colorTokens.grey[300],
        light: colorTokens.grey[50],
       },
       others: {
        font: "#FFA840",
        homeh6: colorTokens.grey[500],
       },
       background: {
        default: colorTokens.grey[50],
        alt: colorTokens.others[1],
        login: colorTokens.grey[1100],
        logininput: colorTokens.grey[0],
       },
      }),
  },
  typography: {
   fontFamily: ['Roboto'].join(','),
   fontSize: 12,
   h1: {
    fontFamily: ['Roboto'].join(','),
    fontSize: 40,
   },
   h2: {
    fontFamily: ['Roboto'].join(','),
    fontSize: 32,
   },
   h3: {
    fontFamily: ['Roboto'].join(','),
    fontSize: 24,
   },
   h4: {
    fontFamily: ['Roboto'].join(','),
    fontSize: 20,
   },
   h5: {
    fontFamily: ['Roboto'].join(','),
    fontSize: 16,
   },
   h6: {
    fontFamily: ['Roboto'].join(','),
    fontSize: 12,
   },
  },
  transitions: {
   duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    // most basic recommended timing
    standard: 300,
    // this is to be used in complex animations
    complex: 375,
    // recommended when something is entering screen
    enteringScreen: 225,
    // recommended when something is leaving screen
    leavingScreen: 195,
   },
  },
 };
};
