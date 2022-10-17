import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export const RegisterForm = ({ register, onSubmit, handleSubmit }) => {
  
    return (
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>新規登録</h1>
        <TextField id="newUsername" label="ニックーネーム" variant="outlined" name="name" {...register('name')} />
        <br/><br/>
        <TextField id="newEmail" label="メールアドレス" variant="outlined" name="email" {...register('email')} />
        <br/><br/>
        <TextField id="newPassword" label="パスワード" variant="outlined" name="password" {...register('password')} />
        <br/><br/>
        <TextField id="confirmPassword" label="パスワードの再入力" variant="outlined" name="password_confirmation" {...register('password_confirmation')} />
        <br/><br/>
        <Button variant="contained" type="submit" >新規登録</Button>
        </form>
      </Box>
    );
  };
