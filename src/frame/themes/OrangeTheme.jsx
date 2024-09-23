import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const OrangeTheme = createTheme({
    name: "orange",
    palette: {
        mode: "light",
        primary: {
            main: orange[500],
            light: orange[200],
            dark: orange[900],
            contrastText: "#fff"
        },
        background: {
            paper: orange[100],
            default: orange[100],
            footer: orange[200],
            footerMenu: 'rgba(255,204,128,.2)',
            nav: orange[200],
            tableHead: orange[200]
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: orange[200],
                    // color: brown[900],
                }
            },
        },
    },
    menu: {
        main: {
            hover: orange[300],
            selected: orange[600]
        },
        level1: {
            hover: orange[200],
            selected: orange[400]
        },
        level2: {
            hover: orange[100],
            selected: orange[300]
        }
    },
    plc: {
        card: {
            backgroundColor: orange[300]
        },
        table: {
            header: {
                backgroundColor: orange[300]
            }
        },
        listItemText: {
            color: "black"
        }
    }
}); 

export default OrangeTheme;