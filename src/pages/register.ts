import { registerForm } from "../components/forms/registerForm";
import { registerUser } from "../api/apiClient";
import { createHeaderFromLogin } from "../components/header/header";

const headerEl = document.getElementById("headerEl");
if (headerEl) {
  headerEl.innerHTML = createHeaderFromLogin();
}

const loginLink = document.getElementById("loginLink");

if (loginLink) {
  loginLink.addEventListener("click", (event) => {
    event.preventDefault();

    const updateLinkText = () => {
      const token = localStorage.getItem("authToken");
      loginLink.innerText = token ? "Log out" : "Log in";
    };

    updateLinkText();

    const token = localStorage.getItem("authToken");

    if (token) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      updateLinkText();
      alert("You have been logged out.");
      window.location.href = "./login.html";
    } else {
      window.location.href = "../login.html";
    }
  });
}
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

  try {
    await registerUser(
      data.name,
      data.email,
      data.password,
      data.bio,
      data.avatarUrl
    );
  } catch (err) {
    console.error("Login error:", err);
  }
});
