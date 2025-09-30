import { registerForm } from "../components/forms/registerForm";
import { registerUser } from "../api/apiClient";

const registerFormEl = document.getElementById("registerForm");

registerFormEl.innerHTML = registerForm();

registerFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries()) as {
    name: string;
    email: string;
    password: string;
    bio: string;
    avatarUrl: string;
  };

  debugger;
  try {
    const result = await registerUser(
      data.name,
      data.email,
      data.password,
      data.bio,
      data.avatarUrl
    );
    debugger;
    // 👉 Save token, redirect, etc.
  } catch (err) {
    console.error("Login error:", err);
  }
});
