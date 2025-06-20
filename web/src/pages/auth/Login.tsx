import { useAppDispatch } from "@/store/hooks";
import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { UserLogin } from "@/features/auth/authThunks";
import { GoogleBtnLogin } from "@/features/auth/authThunks";
import { Icon } from "@/components/Icon";

const Login: React.FC = () => {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(UserLogin({ email, password }))
    console.log({ email, password });
  };

  return (
    <div className="my-20 flex items-center flex-col gap-y-8">
      <Icon name="Logo" className="w-[44] h-auto cursor-pointer" onClick={() => navigate('/')}/>
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-sm rounded border bg-white p-8 shadow"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Log in</h2>

      <label className="block">
        <span className="text-sm">Email</span>
        <input
          type="email"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm">Password</span>
        <input
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-500"
      >
        Log in
      </button>

      <div className="py-4 my-4">
        <span>Don't have an account? <b className="cursor-pointer" onClick={()=>{navigate('/auth/register')}}>Sign up</b></span>
      </div>

      <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log('credentialResponse', credentialResponse)
            const token = credentialResponse.credential;
            dispatch(GoogleBtnLogin(token as string));
            window.location.href = '/app/dashboard';
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>;
    </form>
    </div>
  );
};

export default Login;
