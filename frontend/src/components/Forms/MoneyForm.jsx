import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '80%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const MoneyForm = () => {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState(false);

  const handleClose = () => setOpen(false);
  const handlePayment = () => {
    setFormType(true);setOpen(true);
  }
  const handleWithdraw = () => {
    setFormType(false);setOpen(true);
  }
  return (
    <div>
      <Button variant="contained" onClick={handlePayment}>入金</Button>
      <Button variant="contained" onClick={handleWithdraw}>出金</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {formType ? <Typography id="modal-modal-title" variant="h6" component="h2">入金</Typography> : <Typography id="modal-modal-title" variant="h6" component="h2">出金</Typography>}
          <TextField id="outlined-basic" label="金額" variant="outlined" />
        </Box>
      </Modal>
    </div>
  );
}