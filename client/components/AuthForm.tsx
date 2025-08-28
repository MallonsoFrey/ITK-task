import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setTokens } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../src/api/axiosInstance";

type Props = { mode: "login" | "register" };

export default function AuthForm({ mode }: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (mode === "register") {
        await api.post("/auth/register", { username, password });
        alert("User registered! Now login.");
        navigate("/login");
      } else {
      const res = await api.post("/auth/login", { username, password });
      dispatch(
        setTokens({
        username,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      })
    );
    navigate("/todos");
  }
};

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white text-black rounded shadow-md w-full max-w-sm">
            <input className="border-2 rounded text-pl-2 placeholder:pl-2" type="text" placeholder="Username" value={username}
        onChange={(e) => setUsername(e.target.value)} required/>
            <input className="border-2 rounded text-pl-2 placeholder:pl-2" type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} required />
            <button className="border-2 rounded text-white" type="submit">{mode === "login" ? "Войти" : "Зарегистрироваться"}</button>
        </form>
    );
}
