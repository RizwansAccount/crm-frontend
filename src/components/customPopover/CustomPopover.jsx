import { Box, Chip, List, ListItem, ListItemText, Popover } from '@mui/material';
import React, { useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const CustomPopover = ({ list }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    if (!list?.length) {
        return <span className='text-center pl-[4px]' >Unassigned</span>
    }

    return (
        <Box>
            {list?.length && <Chip
                icon={<PeopleAltIcon />}
                label={`${list?.length} Assignee${list?.length > 1 ? 's' : ''}`}
                onClick={handleClick}
                variant="outlined"
                size="small"
            />}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <List sx={{ width: 200, maxHeight: 300, overflow: 'auto' }}>
                    {list?.map((assignee, index) => (
                        <ListItem key={assignee?._id || index} dense>
                            <ListItemText primary={assignee?.name} />
                        </ListItem>
                    ))}
                </List>
            </Popover>
        </Box>
    );
};

export default CustomPopover