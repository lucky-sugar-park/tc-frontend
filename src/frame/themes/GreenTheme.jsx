import { createTheme } from '@mui/material';
import { green } from '@mui/material/colors';

const GreenTheme = createTheme({
    name: "green",
    palette: {
        mode: "light",
        primary: {
            main: green[500],
            light: green[200],
            dark: green[900],
            contrastText: "#fff"
        },
        background: {
            paper: green[100],
            default: green[100],
            footer: green[200],
            footerMenu: 'rgba(165,214,167,.2)',
            nav: green[200],
            tableHead: green[200]
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: green[200],
                    // color: brown[900],
                }
            },
        },
    },
    menu: {
        main: {
            hover: green[300],
            selected: green[600]
        },
        level1: {
            hover: green[200],
            selected: green[400]
        },
        level2: {
            hover: green[100],
            selected: green[300]
        }
    },
    plc: {
        card: {
            backgroundColor: green[300]
        },
        table: {
            header: {
                backgroundColor: green[300]
            }
        },
        listItemText: {
            color: "black"
        }
    }
}); 

export default GreenTheme;