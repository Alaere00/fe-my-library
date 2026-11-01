import { useState } from 'react'
import type { JSXElement } from "@fluentui/react-components";
import { Button } from "@/untitled-components/base/buttons/button"
import { Input } from "@/untitled-components/base/input/input"
import { Label } from '@/untitled-components/base/input/label';
import { useLocation, useNavigate } from 'react-router-dom';
import "./UserLogin.css"
import { useAuth } from '@/contexts/AuthContext';
import { LoginResponse } from '../types/Auth';

export default function UserLogin(): JSXElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  async function handleUserLogin(){
    // e.preventDefault();
    // setError(undefined);
    // setLoading(true);

    const url = `http://localhost:8000/my-bookshelf/login`
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
      })

      if (!response.ok){
        throw new Error(`Login failed: ${response.statusText}`)
      }

      const data: LoginResponse = await response.json()
      login(data.session.access_token)
      navigate(from, { replace: true })
      
      } catch(error) {
        console.log('Error during login', error)
        return null;
    }

}

  return (

    <section className="min-h-screen bg-primary px-4 py-12 sm:bg-secondary md:px-8 md:pt-24 md:pb-[270px]">

    <div className="flex w-full flex-col gap-6 bg-primary sm:mx-auto sm:max-w-110 sm:rounded-2xl sm:px-10 sm:py-8 sm:shadow-sm">
        <div className="flex flex-col items gap-6 ">
        <h1 style={{ fontWeight: "bold", fontSize: 20 }}>MyLibrary</h1>
            <div className="flex flex-col gap-2">
                <h1 className="text-display-md font-semibold text-primary">Welcome Back!</h1>
                <p className="text-md text-tertiary">Login and pick up where you left off.</p>
            </div>
        </div>


<form noValidate autoComplete="off">
      <div className="form-row">
      <Label className="form-label" >Email: </Label>
        <Input 
        type="email" 
        isRequired 
        value={email} 
        placeholder="Enter email"
        onChange={(v) => setEmail(v)}/>

        <Label className="form-label">Password: </Label>
        <Input 
          type="password" 
          isRequired                     
          placeholder="Enter password"
          value={password} onChange={(password) => setPassword(password)}
          />

          { error && <p role="alert" className='mt-3 text-sm text-error-primary'>{error}</p>}
      </div>

      <Button className="login-btn" onClick={() => handleUserLogin()}>Submit</Button>
    </form>

        <div className="flex center gap-1 text-center ">
            <span className="text-sm text-tertiary">New here?</span>
            <Button href="#" color="link-color" size="md" onClick={() => navigate("/create-account")}>
                Create and Account
            </Button>
        </div>
    </div>
</section>


  );
};

