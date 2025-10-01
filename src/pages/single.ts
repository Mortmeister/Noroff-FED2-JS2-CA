import { createCard } from "../components/cards/postUi";
import { getPostById } from "../api/apiClient";
import { createHeader } from "../components/header/header";

const headerEl = document.getElementById("headerEl");
if (headerEl) {
  headerEl.innerHTML = createHeader();
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
      localStorage.removeItem("username"); // if storing username
      updateLinkText();
      alert("You have been logged out.");
      window.location.href = "./login.html"; // optional redirect
    } else {
      // Redirect to login
      window.location.href = "../login.html";
    }
  });
}
const singlePageEl = document.getElementById("singlePageEl");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

async function renderFeed() {
  const token = localStorage.getItem("authToken"); // 👈 stored at login
  if (!token) {
    return;
  }

  try {
    const posts = await getPostById(postId, token);

    singlePageEl!.innerHTML = createCard(
      posts.title,
      posts.body,
      posts.created,
      posts.updated,
      posts.media,
      posts.reactions,
      posts.comments,
      posts.id
    );
  } catch (err) {
    singlePageEl!.innerHTML = `<p class="text-red-500">Failed to load posts.</p>`;
    console.log(err);
  }
}

renderFeed();
console.log(postId);
