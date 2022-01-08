import { Box, Button, Grid } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { useAudioVideo } from '../../context/audioVideoContext';
import { useUser } from '../../context/userContext';

const JoiningMeet = ({ userVideoRef, meetingInfo, joinMeet }) => {

    const { user } = useUser();
    const { audioVideoState, audioVideoDispatch } = useAudioVideo();

    return (
        <Box sx={{ display: "flex", alignItems: "center", padding: "54px 0" }}>
            <Grid container justifyContent="center" alignItems="center" flex={1} spacing={{ xs: 0, md: 2 }}>
                <Grid item xs={12} sm={7} md={8} sx={{ position: "relative" }}>
                    <Box>
                        <video styles={{display: "block"}} heigth="300" id="localVideo" autoPlay playsInline ref={userVideoRef} />
                    </Box>
                    <Box sx={{ position: "absolute", left: "250px", bottom: "20px", display: "flex", justifyContent: "center" }}>
                        <Box sx={{ marginRight: "12px", padding: "12px 16px", borderRadius: "50%", backgroundColor: "gray" }} onClick={() => { audioVideoDispatch({ type: "AUDIO_STATE" }) }}>
                            {audioVideoState.userVideoAudio.audio ? <MicNoneIcon /> : <MicOffIcon />}
                        </Box>
                        <Box sx={{ padding: "12px 16px", borderRadius: "50%", backgroundColor: "gray" }} onClick={() => { audioVideoDispatch({ type: "VIDEO_STATE" }) }}>
                            {audioVideoState.userVideoAudio.video ? <VideocamIcon /> : <VideocamOffIcon />}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 32px", marginBottom: { xs: "24px", sm: "0" } }}>
                        <Box sx={{ marginBottom: "24px", fontSize: "32px", fontWeight: "700" }}>Ready to join?</Box>
                        <Button onClick={joinMeet} variant='contained'>{meetingInfo.data.user_id._id === user.userId ? 'Join' : 'Ask to Join'}</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default JoiningMeet;