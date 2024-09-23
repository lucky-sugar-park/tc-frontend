import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const StandardDarkTheme = createTheme({
    name: "dark-standard",
    palette: {
        mode: "dark",
        background: {
            footer: grey[700],
            footerMenu: 'rgba(97,97,97,.2)',
            nav: grey[700],
            tableHead: grey[700]
        }
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
            backgroundColor: "#212121"
        },
        table: {
            header: {
                backgroundColor: "#000"
            }
        },
        listItemText: {
            color: "white"
        }
    }
}); 

export default StandardDarkTheme;