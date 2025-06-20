import { useAppDispatch } from "@/store/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GoogleBtnLogin } from "@/features/auth/authThunks";
import { UserRegister } from "@/features/auth/authThunks";
import { Icon } from "@/components/Icon";

const Register: React.FC = () => {
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }
    dispatch(UserRegister(form))
  };

  return (<div className="my-20 flex items-center flex-col gap-y-8">
    <Icon name="Logo" className="w-[44] h-auto cursor-pointer" onClick={() => navigate('/', {replace: true})}/>
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-sm rounded border bg-white p-8 shadow"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Sign up</h2>

      <label className="block">
        <span className="text-sm">Name</span>
        <input
          name="name"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.name}
          onChange={handleChange}
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm">Email</span>
        <input
          type="email"
          name="email"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.email}
          onChange={handleChange}
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm">Password</span>
        <input
          type="password"
          name="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.password}
          onChange={handleChange}
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm">Confirm Password</span>
        <input
          type="password"
          name="confirm"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={form.confirm}
          onChange={handleChange}
        />
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-500"
      >
        Create Account
      </button>

      <div className="py-4 my-4">
        <span>Already have an account? <b className="cursor-pointer" onClick={()=>{navigate('/auth/login', {replace: true})}}>Sign In</b></span>
      </div>

      <GoogleOAuthProvider clientId={`${GOOGLE_CLIENT_ID}`}>
        <GoogleLogin
          text="signup_with"
          onSuccess={credentialResponse => {
            console.log('credentialResponse', credentialResponse)
            const token = credentialResponse.credential;
            dispatch(GoogleBtnLogin(token as string));
            window.location.href = '/app/resumes';
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>;
    </form>
  </div>);
};

export default Register;
