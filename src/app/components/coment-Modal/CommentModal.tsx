import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import "./Modal.css";
import { userRelatedCommentsPluginUpdate} from '../asyncOperations/fetchData';


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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography sx={{borderBottom:"2px solid lightgray",paddingBottom:"8px"}} id="modal-modal-title" variant="h6" component="h2">
            Change comment
          </Typography>
          <TextField

          sx={{marginBottom:"0",height:"140px"}}
          label="text"
          rows={4}
          multiline
          fullWidth
          variant='outlined'
          type='text'
          margin='normal'
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