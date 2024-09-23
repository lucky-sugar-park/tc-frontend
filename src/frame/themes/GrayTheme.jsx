import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const GreyTheme = createTheme({
    palette: {
        mode: "dark",
        primary: grey,
        divider: grey[200],
        background: {
            default: grey[500],
            paper: grey[500],
            footer: grey[200],
            footerMenu: 'rgba(188,170,164,.2)',
            nav: grey[200],
            tableHead: grey[200]
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
    },
    menu: {
        main: {
            hover: grey[300],
            selected: grey[600]
        },
        level1: {
            hover: grey[200],
            selected: grey[400]
        },
        level2: {
            hover: grey[100],
            selected: grey[300]
        }
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    }
}); 

export default GreyTheme;