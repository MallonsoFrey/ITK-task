import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setTokens } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import api from "../src/api/axiosInstance";
import type { AxiosError } from "axios";

type Props = { mode: "login" | "register" };

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export default function AuthForm({ mode }: Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    if (mode === "register") {
      try {
        await api.post("/auth/register", { username, password });
        alert("Пользователь зарегистрирован!");
        navigate("/login");
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        setErrorMsg(error.response?.data?.message ?? "Ошибка регистрации");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await api.post<LoginResponse>("/auth/login", {
          username,
          password,
        });

        dispatch(
          setTokens({
            username,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );

        navigate("/todos");
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        setErrorMsg(error.response?.data?.message ?? "Ошибка входа");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white text-black rounded shadow-md w-full max-w-sm"
    >
      <input
        className="border-2 pl-2 rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="border-2 pl-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <button
        className="border-2 rounded text-white bg-blue-500 disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <div className="flex gap-4">
            <ArrowPathIcon className="w-5 h-5 animate-spin" /> Загрузка...
          </div>
        ) : mode === "login" ? (
          "Войти"
        ) : (
          "Зарегистрироваться"
        )}
      </button>
    </form>
  );
}
