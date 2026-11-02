import { useState, type FormEvent } from 'react'
import type { JSXElement } from "@fluentui/react-components";
import { Button } from "@/untitled-components/base/buttons/button"
import { Input } from "@/untitled-components/base/input/input"
import { Label } from '@/untitled-components/base/input/label';
import { useLocation, useNavigate } from 'react-router-dom';
import "./UserLogin.css"
import { useAuth } from '@/contexts/AuthContext';
import type { LoginResponse } from '../types/Auth';

export default function UserLogin(): JSXElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { from?: string; message?: string } | null;
  const from = locationState?.from ?? "/";

  async function handleUserLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/my-bookshelf/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password})
      })

      if (!response.ok){
        throw new Error(response.statusText || `Login failed (${response.status}).`)
      }

      const data: LoginResponse = await response.json()
      login(data.session.access_token)
      navigate(from, { replace: true })
      
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to log in. Please try again.');
    } finally {
      setIsSubmitting(false);
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

          {locationState?.message && <p role="status" className="text-sm text-success-primary">{locationState.message}</p>}

<form noValidate autoComplete="off" onSubmit={handleUserLogin}>
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

      <Button className="login-btn" type="submit" isDisabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </Button>
      {isSubmitting && <p role="status" aria-live="polite" className="mt-2 text-sm text-tertiary">Signing in, please wait...</p>}
    </form>

        <div className="flex center gap-1 text-center ">
            <span className="text-sm text-tertiary">New here?</span>
            <Button href="/create-account" color="link-color" size="md">
              Create an account
            </Button>
        </div>
    </div>
</section>


  );
};

