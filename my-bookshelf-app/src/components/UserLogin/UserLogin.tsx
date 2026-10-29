import { useState } from 'react'
import type { JSXElement } from "@fluentui/react-components";
import { Button, Input, Label } from "@fluentui/react-components";


interface LoginCredentials {
  email: string;
  password: string
}

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  }
}
export default function UserLogin(): JSXElement {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function login(credentials: LoginCredentials){
    const url = `http://127.0.0.1:8000/my-bookshelf/login`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok){
        throw new Error(`Login failed: ${response.statusText}`)
      }

      const data: LoginResponse = await response.json()
      localStorage.setItem('accessToken', data.access_token)
      return data
      

      } catch(error) {
        console.log('Error during login', error)
        return null;
      }

  }



  return (
    <form noValidate autoComplete="off">
      <div className="form-row">
        <Label className="form-label" >Email: </Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="form-row">
        <Label className="form-label">Password: </Label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <Button onClick={() => login({email, password})}>Submit</Button>
    </form>
  );
};
