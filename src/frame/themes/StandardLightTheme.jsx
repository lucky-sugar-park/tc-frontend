import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const StandardLightTheme = createTheme({
    name: "light-standard",
    palette: {
        mode: "light",
        background: {
            footer: grey[200],
            footerMenu: 'rgba(188,170,164,.2)',
            nav: grey[200],
            tableHead: grey[200]
        }
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'black',
            },
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
    plc: {
        card: {
            backgroundColor: "#f5f5f5"
        },
        table: {
            header: {
                backgroundColor: "#fafafa"
            }
        },
        listItemText: {
            color: "black"
        }
    }
}); 

export default StandardLightTheme;