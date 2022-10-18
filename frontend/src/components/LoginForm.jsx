import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const LoginForm = ({ register, onSubmit, handleSubmit }) => {
  
    return (
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1>ログイン</h1>
        <TextField id="email" label="メールアドレス" variant="outlined" name="email" {...register('email')} />
        <br/><br/>
        <TextField id="password" label="パスワード" variant="outlined" name="password"  {...register('password')} />
        <br/><br/>
        <Button variant="contained" type="submit" >ログイン</Button>
        </form>
      </Box>
    );
  };