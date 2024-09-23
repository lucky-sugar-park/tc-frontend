import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField 
} from '@mui/material';

const BookmarkAdd = (props) => {

    const [dialogValue, setDialogValue] = React.useState({
        name: '',
        description: ''
    });

    const updateParentStateClose = props.updateDialogStateClose;

    const handleClose = () => {
        updateParentStateClose();
    }

    const handleSubmit = () => {
        alert('Bookmark submitted.');
        updateParentStateClose();
    }

    return (
        <Dialog open={ props.open } onClose={ handleClose }>
            <form onSubmit={ handleSubmit }>
                <DialogTitle>Add a new bookmark</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Type bookmark name and description for current page. add it!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={ dialogValue.name }
                        onChange={ (event) => 
                            setDialogValue({
                                ...dialogValue,
                                name: event.target.value,
                            })
                        }
                        label="Name"
                        type="text"
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        value={ dialogValue.description }
                        onChange={ (event) => 
                            setDialogValue({
                                ...dialogValue,
                                description: event.target.value,
                            })
                        }
                        label="Description"
                        type="text"
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default BookmarkAdd;