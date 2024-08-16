import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            100: '#F0F5FF', // bg
            700: '#2F6FED',
            800: '#1D5BD6', // hover
            900: '#1E4EAE', // pressed
        },
        line: {
            300: '#E1E6EF',
            700: '#3F444D',
        },
        primaryAccent: {
            50: '#e7f6e7',
            100: '#cfe8cf',
            200: '#b8dcb8',
            300: '#a5d6a7', // Mint Green
            400: '#94c994',
            500: '#83bb83',
            600: '#72ae72',
            700: '#609f60',
            800: '#4d8f4d',
            900: '#3b7f3b',
        },
        secondaryAccent: {
            50: '#fff7de',
            100: '#ffedb8',
            200: '#ffe290',
            300: '#ffd54f', // Pastel Yellow
            400: '#ffc93b',
            500: '#ffbd26',
            600: '#ffb011',
            700: '#ffa300',
            800: '#e68d00',
            900: '#cc7800',
        },
        danger: {
            50: '#ffecec',
            100: '#ffcdcd',
            200: '#ffaaaa',
            300: '#ef9a9a', // Pastel Red
            400: '#e68a8a',
            500: '#d87979',
            600: '#c96868',
            700: '#ba5757',
            800: '#aa4646',
            900: '#993535',
        },
        success: {
            50: '#e8f7e8',
            100: '#ccefd4',
            200: '#b1e6bf',
            300: '#81c784', // Light Mint Green
            400: '#70b373',
            500: '#5e9f61',
            600: '#4d8b50',
            700: '#3b773f',
            800: '#29632e',
            900: '#174f1d',
        },
        info: {
            50: '#e7f5fc',
            100: '#cdeaf9',
            200: '#b3def6',
            300: '#4fc3f7', // Light Blue
            400: '#45b4e7',
            500: '#3ca5d7',
            600: '#3396c7',
            700: '#2a87b7',
            800: '#2178a7',
            900: '#186897',
        },
        warning: {
            50: '#fff4e6',
            100: '#ffe4c2',
            200: '#ffd49c',
            300: '#ffcc80', // Soft Orange
            400: '#ffc16e',
            500: '#ffb65b',
            600: '#ffaa49',
            700: '#ff9e36',
            800: '#ff9223',
            900: '#ff8610',
        },
        text: {
            100: '#A2A6AD', // disabled
            400: '#4A505C', // secondary
            700: '#1D2433', // main
        },
        background: {
            0: '#FFFFFF',
            100: '#F8F9FC',
            200: '#F1F3F9',
            800: '#23272F',
            900: '#1B1F27',
            1000: '#0A0D14'
        },
    },
    styles: {
        global: {
            body: {
                bg: 'background.100',
                color: 'text.700',
            },
        },
    },
});

export default theme;
