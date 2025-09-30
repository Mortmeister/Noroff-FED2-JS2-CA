import { loginForm } from "../components/forms/loginForm";
import { loginUserFromForm } from "../api/apiClient";
import { saveAuth } from "../storage/authStorage";
import { createHeader } from "../components/header/header";

const headerEl = document.getElementById("headerEl");
headerEl.innerHTML = createHeader();

const loginFormEl = document.getElementById("loginForm");

loginFormEl.innerHTML = loginForm();

loginFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries()) as {
    email: string;
    password: string;
  };
  try {
    const result = await loginUserFromForm(data.email, data.password);
    saveAuth(result.data.accessToken, "accessToken");
    localStorage.setItem("username", result.data.name);

    window.location.href = "./feed.html";
  } catch (err) {
    console.error("Login error:", err);
  }
});
