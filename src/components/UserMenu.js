import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function UserMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button sx={{position:"absolute", right:20, color:"white"}} id="basic-button" aria-controls="basic-menu" aria-haspopup="true" aria-expanded={open ? 'true' : undefined}onClick={handleClick}>
        Welcome {props.name}
      </Button>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
        <MenuItem onClick={()=>props.logout()}>Logout</MenuItem>
      </Menu>
    </>
  );
}