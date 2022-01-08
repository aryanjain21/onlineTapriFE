import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomDrawer from '../../components/custom-drawer/custom-drawer';
import BottomBar from '../../components/bottom-bar/bottom-bar';

const Room = (props) => {

    const { askJoin, setAskJoin, allowUser, handleModalClose, handleAllowUser } = props;

    const [drawerOpen, setOpen] = useState(false);
    const [list, setList] = useState(false);

    return (
        <Box sx={{ position: "relative", minHeight: "95.6vh" }}>
            <Box>
                <CustomDrawer drawerOpen={drawerOpen} setOpen={setOpen} list={list} setList={setList} askJoin={askJoin} setAskJoin={setAskJoin} allowUser={allowUser} handleModalClose={handleModalClose} handleAllowUser={handleAllowUser} />
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
                <BottomBar drawerOpen={drawerOpen} setOpen={setOpen} list={list} setList={setList} />
            </Box>
        </Box>
    );
}

export default Room;