import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { 
  IconButton,
  InputBase,
  Tooltip 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(5),
    width: 'auto',
  },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '330px',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
    fontSize: "13px"
  },
}));

const RightmostIcon = ({ children, onClick }) => {
  return (
    <Tooltip title="검색실행">
      <IconButton onClick={ onClick }>
        {children}
      </IconButton>
    </Tooltip>
  )
}

const StyledSearchBar = (props) =>{

  const { label, actionIcon } = props;
  const doSearch  = props.doSearchCallback;

  const [value, setValue] = React.useState(undefined);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      if(value===undefined) return;
      console.log('value', value);
      doSearch(value);
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
        {/* <SearchIcon sx={{ color: "#757575" }}/> */}
      </SearchIconWrapper>
      <StyledInputBase 
        placeholder={ label }
        inputProps={{
          'aria-label': 'search'
        }}
        onChange={ handleChange }
        onKeyDown={ handleKeyDown }
      />
      
      <RightmostIcon onClick={ doSearch }>
        { actionIcon }
      </RightmostIcon>
    </Search>
  )
}

export default StyledSearchBar;