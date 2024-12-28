import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import "./Modal.css";




const AddCommentModal = ({addComment}) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({
    panouId:"",
    message:"",
    commentId:"",
    name:"",
  });


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleAddComment=()=>{


    let obj={
    message:comment,
  };

    addComment(obj);
    setOpen(false);
  }

 
            
  return (
    <div>
      <Button onClick={handleOpen}>Add</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography sx={{borderBottom:"2px solid lightgray",paddingBottom:"8px"}} id="modal-title" variant="h6" component="h2">
            Add comment
          </Typography>
          <TextField
              sx={{ marginBottom: "0", height: "140px" }}
              label="text"
              rows={4}
              multiline
              fullWidth
              variant="outlined"
              type="text"
              margin="normal"
              value={comment.message}
              onChange={(e) => setComment({ ...comment, message: e.target.value })}
            />

          <Button onClick={handleAddComment}>Add</Button>
          <Button onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </div>
  );
};


export default AddCommentModal;