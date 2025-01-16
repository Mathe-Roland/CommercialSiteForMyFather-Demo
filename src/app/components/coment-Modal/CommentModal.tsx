import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import "./Modal.css";
import { userRelatedCommentsPluginUpdate} from '../asyncOperations/fetchData';
import "CommentModal.css"


const CommentModal = (props) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
 

  const handleOpen = () => {
    setOpen(true);
    setComment(props.showComment);

  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSave= async ()=>{
    props.saveText(comment);
    userRelatedCommentsPluginUpdate(comment,props.id,props.panouId);

  }

 

  return (
    <div className='edit'>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box 
        className="centered-box"
        >
          <Typography
           className='bottom-border' 
           id="modal-title" variant="h6" component="h2">
            Change comment
          </Typography>
          <TextField
          label="text"
          rows={4}
          multiline
          fullWidth
          variant='outlined'
          type='text'
          margin='normal'
          className="custom-textfield"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}>

          </TextField>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentModal;