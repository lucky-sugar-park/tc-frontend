// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://sds.samsung.com" target="_blank" underline="hover">
      sds.samsung.com
    </Typography>
    <Typography variant="subtitle2" component={Link} href="http://localhost.com" target="_blank" underline="hover">
      &copy; localhost.com
    </Typography>
  </Stack>
);

export default AuthFooter;
