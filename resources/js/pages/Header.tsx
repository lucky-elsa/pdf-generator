import React, { useState } from "react";
import { Link } from 'react-router-dom'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";

export default function Header() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('avatar');
    window.location.href = "/";
  }

  return (
    <div className='flex pt-[27px] w-full'>
      <img src="/image/Logo.png" />
      <div className='flex justify-end w-[71%]'>
        <div className='flex justify-between w-[635px]'>
          <Link className='text-[18px] pt-[20px] font-[400] text-[#374151] link' to="/about_project">About Project</Link>
          <Link className='text-[18px] pt-[20px] font-[400] text-[#374151] link' to="/">Crewings Board</Link>
          <Link className='text-[18px] pt-[20px] font-[400] text-[#374151] link' to="/cv">CV Creator</Link>
          <Link className='text-[18px] pt-[20px] font-[400] text-[#374151] link' to="/term">Terms and Conditions</Link>
        </div>
        <Tooltip title="Account settings" className="h-[40px] w-[40px]">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              marginTop: "13px"
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img src="/image/user.png" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Link to="/profile">Your Profile</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/add_crewing">Add Crewing Board(Admin Only)</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            LOG OUT
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
