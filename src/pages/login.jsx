import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "../utils/auth";

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/invoice", { replace: true });
        }
    }, []);

    const formik = useFormik({
        initialValues: { username: "", password: "" },
        validate: (values) => {
            const errors = {};
            if (!values.username) errors.username = "Username is required";
            if (!values.password) errors.password = "Password is required";
            return errors;
        },
        onSubmit: (values, { setSubmitting, setErrors }) => {
            if (values.username === "adminReact" && values.password === "adminReact") {
                login();
                navigate("/invoice");
            } else {
                setErrors({ password: "Invalid username or password" });
            }
            setSubmitting(false);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className={`mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${formik.touched.username && formik.errors.username
                                ? "border-red-500"
                                : ""
                                }`}
                            placeholder="Your username"
                            autoComplete="username"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.username}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${formik.touched.password && formik.errors.password
                                ? "border-red-500"
                                : ""
                                }`}
                            placeholder="Your password"
                            autoComplete="current-password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
