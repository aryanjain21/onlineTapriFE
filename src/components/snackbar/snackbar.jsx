import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

const DirectionSnackbar = ({ directions, message }) => {

    const [open, setOpen] = useState(false);
    const [transition, setTransition] = useState(undefined);

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }
    
    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }
    
    function TransitionRight(props) {
        return <Slide {...props} direction="right" />;
    }
    
    function TransitionDown(props) {
        return <Slide {...props} direction="down" />;
    }

    // const handleClick = (Transition) => () => {
    //     setTransition(() => Transition);
    //     setOpen(true);
    // };

    const handleClick = (Transition) => {
        setTransition(() => Transition);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {directions === 'Left' && handleClick(TransitionLeft)}
            {directions === 'Right' && handleClick(TransitionRight)}
            {directions === 'Up' && handleClick(TransitionUp)}
            {directions === 'Down' && handleClick(TransitionDown)}
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={transition}
                message={message}
                key={transition ? transition.name : ''}
            />
        </div>
    );
}

export default DirectionSnackbar;
