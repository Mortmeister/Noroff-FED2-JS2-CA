import { getAllPosts, commentOnPost, searchForPost } from "../api/apiClient";
import { createCard } from "../components/cards/postUi";
import { createHeader } from "../components/header/header";

const feedEl = document.getElementById("feedPage");
const searchForPostEl = document.getElementById("searchForPostForm");
const headerEl = document.getElementById("headerEl");

headerEl.innerHTML = createHeader();

const loginLink = document.getElementById("loginLink");

loginLink.addEventListener("click", (event) => {
  event.preventDefault();

  const updateLinkText = () => {
    const token = localStorage.getItem("authToken");
    loginLink.innerText = token ? "Log out" : "Log in";
  };

  updateLinkText();

  const token = localStorage.getItem("authToken");

  if (token) {
    // Log out
    debugger;
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

searchForPostEl?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const query = formData.get("searchPost");
  try {
    const result = await searchForPost(query);
    feedEl!.innerHTML = "";

    if (!result || result.length === 0) {
      feedEl!.innerHTML = `<p class="text-gray-500">No posts found.</p>`;
      return;
    }

    feedEl!.innerHTML = result
      .map((post) =>
        createCard(
          post.title,
          post.body,
          post.created,
          post.updated,
          post.media,
          post.reactions,
          post.comments,
          post.id
        )
      )
      .join("");
  } catch (err) {
    console.error("Search error:", err);
    feedEl!.innerHTML = `<p class="text-red-500">Something went wrong while searching.</p>`;
  }
});

// TOO --> make it a export function
async function renderFeed() {
  const token = localStorage.getItem("authToken"); // 👈 stored at login
  if (!token) {
    return;
  }

  try {
    const posts = await getAllPosts();

    feedEl!.innerHTML = posts
      .map((post) =>
        createCard(
          post.title,
          post.body,
          post.created,
          post.updated,
          post.media,
          post.reactions,
          post.comments,
          post.id,
          post.author
        )
      )
      .join("");
  } catch (err) {
    feedEl!.innerHTML = `<p class="text-red-500">Failed to load posts.</p>`;
    console.log(err);
  }
}

renderFeed();

feedEl?.addEventListener("click", async (event) => {
  const target = event.target as HTMLAnchorElement;

  if (target.classList.contains("single-post")) {
    const postId = target.dataset.postId;

    console.log(postId);
  }
});

feedEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const target = event.target as HTMLFormElement;

  // Reaction form
  if (target.classList.contains("add-reaction-form")) {
    const postId = target.dataset.postid;
    const formData = new FormData(target);
    const symbol = formData.get("symbol");
    console.log("React to post", postId, "with", symbol);
  }

  // Comment form
  if (target.classList.contains("add-comment-form")) {
    event.preventDefault();

    const postId = Number(target.dataset.postid);
    const formData = new FormData(target);
    const body = formData.get("body") as string;

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    try {
      const result = await commentOnPost(postId, body, token);
      console.log("Comment posted:", result);
      target.reset(); // clear the form
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  }
});
