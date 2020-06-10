import React, {useState} from 'react';
import {Path, Card, Input, Button, Text, Container} from '../Components/Elements';
import userauth from '../Utils/userauth';
import styled from '@emotion/styled';

const Login = React.memo(function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const onSubmit = e => {
    e.preventDefault();
    userauth.userLogin({ email: email, password: password })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          userauth.populateLocalStorage(data);
          // might have to change this to a more React appropriate action
          window.location.replace('/dashboard');
        } else {
          setMessage(data.msg);
        }
      })
      .catch(err => setMessage(err));
  }

  return (
    <Container>
      <Card align="center">
        <Text variant="h2">Login</Text>
          { message.length > 0 ? <Text variant="p2">{message}</Text> : null }
          <form onSubmit={onSubmit}>
            <Text variant="label-block" htmlFor="email">Email</Text>
            <Input key="random1" name="email" type="text" placeholder="your email" onChange={e => setEmail(e.target.value)} value={email} />
            <Text variant="label-block" htmlFor="password">Password</Text>
            <Input key="random2" type="password" placeholder="your password" onChange={e => setPassword(e.target.value)} value={password} />
            <Button display="block">Login</Button>
          </form>
          <Text variant="p2">
            <Path to="/forgot-password">
              Forget your password? 
            </Path>
          </Text>
          <Text variant="p2">
            Don't have an account?<br/>
            <Path to="/signup">Make one!</Path>
          </Text>
      </Card>
    </Container>
  )
})

export default Login;