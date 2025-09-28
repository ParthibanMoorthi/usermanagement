import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import InputField from "../components/InputField";
import { FiLock, FiUser } from "react-icons/fi";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({ email: "eve.holt@reqres.in", password: "cityslicka", remember: false });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DEDEDE] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow w-full max-w-md"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <InputField
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          icon={<FiUser />}
        />

        <InputField
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          icon={<FiLock />}
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="h-4 w-4 text-[#1990FF] border-gray-100 rounded"
          />
          <label className="ml-2 block text-gray-900 text-sm sm:text-base">Remember Me</label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1990FF] cursor-pointer text-white py-2 sm:py-3 rounded mt-4 disabled:bg-blue-300 transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
