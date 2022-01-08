import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const MeetLinkModal = ({ open, setOpen, meetLink }) => {

    const handleClose = () => setOpen(false);
    const [copy, setCopy] = useState({value: '', copied: false});

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h6">
                    Here's the link to your meeting
                </Typography>
                <Typography id="modal-modal-description" sx={{ fontSize: "14px", mt: 2 }}>
                    Copy this link and send it to people you want to meet with. Be sure to save it so you can use it later, too.
                </Typography>
                <Box sx={{ position: "relative", backgroundColor: "#f1f3f4", borderRadius: "10px", padding: "16px", margin: "12px 0 0" }}>
                    {meetLink}
                    <CopyToClipboard text={copy.value}
                        onCopy={() => setCopy({ value: meetLink, copied: true })}>
                        <ContentCopyIcon sx={{ position: "absolute", cursor: "pointer", right: "12px" }} />
                    </CopyToClipboard>
                    {/* {copy.copied ? <DirectionSnackbar message={'Copied to clipboard!'} directions='Up' /> : null} */}
                </Box>
            </Box>
        </Modal>
    )
}

export default MeetLinkModal;