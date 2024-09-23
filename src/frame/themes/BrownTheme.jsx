import { createTheme } from '@mui/material';
import { brown } from '@mui/material/colors';

const BrownTheme = createTheme({
    name: "brown",
    palette: {
        // mode: "light",
        primary: {
            main: brown[500],
            light: brown[200],
            dark: brown[900],
            contrastText: "#fff"
        },
        background: {
            paper: brown[100],
            default: brown[100],
            footer: brown[200],
            footerMenu: 'rgba(188,170,164,.2)',
            nav: brown[200],
            tableHead: brown[200]
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: brown[200],
                    // color: brown[900],
                }
            },
        },
    },
    menu: {
        main: {
            hover: brown[300],
            selected: brown[600]
        },
        level1: {
            hover: brown[200],
            selected: brown[400]
        },
        level2: {
            hover: brown[100],
            selected: brown[300]
        }
    },
    plc: {
        card: {
            backgroundColor: brown[300]
        },
        table: {
            header: {
                backgroundColor: brown[300]
            }
        },
        listItemText: {
            color: "black"
        }
    }
}); 

export default BrownTheme;