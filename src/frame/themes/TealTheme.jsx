import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';

const TealTheme = createTheme({
    name: "brown",
    palette: {
        mode: "light",
        primary: {
            main: teal[500],
            light: teal[200],
            dark: teal[900],
            contrastText: "#fff"
        },
        background: {
            paper: teal[100],
            default: teal[100],
            footer: teal[200],
            footerMenu: 'rgba(128,203,196,.2)',
            nav: teal[200],
            tableHead: teal[200]
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: teal[200],
                    // margin: 1
                    // color: teal[900], // text color
                }
            },
        },
    },
    menu: {
        main: {
            hover: teal[300],
            selected: teal[600]
        },
        level1: {
            hover: teal[200],
            selected: teal[400]
        },
        level2: {
            hover: teal[100],
            selected: teal[300]
        }
    },
    plc: {
        card: {
            backgroundColor: teal[300]
        },
        table: {
            header: {
                backgroundColor: teal[300]
            }
        },
        listItemText: {
            color: "black"
        }
    }
}); 

export default TealTheme;