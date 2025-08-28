import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Todos from "../components/TodoList";

const router = createBrowserRouter([
    { path: "/", element: <AuthForm mode="register" /> }, 
    { path: "/login", element: <AuthForm mode="login" /> },
    { path: "/register", element: <AuthForm mode="register" /> },
    { path: "/todos", element: <Todos /> },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
