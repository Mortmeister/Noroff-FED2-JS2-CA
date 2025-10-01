import {
  createPost,
  getPostsByUsername,
  getSingleProfile,
} from "../api/apiClient";
import { createProfileCard, createCard } from "../components/cards/postUi";
import { createUserCard } from "../components/cards/userUi";
import { deletePost } from "../api/apiClient";
import { updateImagePreview } from "../components/forms/preview";
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

const profileContainerEl = document.getElementById("profileContainer");

async function renderUserProfile() {
  const profile = localStorage.getItem("username");
  if (!profile) return;

  try {
    const user = await getSingleProfile(profile);

    if (profileContainerEl && user) {
      profileContainerEl.innerHTML = createUserCard(user);
    }
  } catch (err) {
    console.error("Failed to load user profile:", err);
    if (profileContainerEl) {
      profileContainerEl.innerHTML = `<p class="text-red-500">Failed to load user profile.</p>`;
    }
  }
}

renderUserProfile();

const postImageUrl = document.getElementById("url") as HTMLInputElement;
const imageURLPreview = document.getElementById(
  "imageURLPreview"
) as HTMLImageElement;

if (postImageUrl && imageURLPreview) {
  postImageUrl.addEventListener("input", () => {
    updateImagePreview(postImageUrl, imageURLPreview);
  });
}

const postFormEl = document.getElementById(
  "createPostForm"
) as HTMLFormElement | null;
const myPostsEl = document.getElementById("myPostsEl");

async function handleCreatePost(event: Event) {
  event.preventDefault();

  if (!postFormEl) return;
  const formData = new FormData(postFormEl);
  const data = Object.fromEntries(formData.entries()) as {
    title: string;
    body: string;
    mediaUrl?: string;
    mediaAlt?: string;
    tags?: string;
  };

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("You must be logged in to create a post.");
    return;
  }

  const payload = {
    title: data.title,
    body: data.body,
    media: data.mediaUrl
      ? { url: data.mediaUrl, alt: data.mediaAlt || "" }
      : undefined,
    tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
  };

  try {
    const result = await createPost(token, payload);
    console.log("Post created:", result);
    alert("Post successfully created!");
    postFormEl.reset();
    renderFeed(); // 👈 re-render feed after posting
  } catch (err) {
    console.error(err);
    alert("Something went wrong while creating the post.");
  }
}

async function renderFeed() {
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  if (!token || !username) return;

  try {
    const postsPersonal = await getPostsByUsername(username);

    myPostsEl!.innerHTML = postsPersonal
      .map((post) =>
        createProfileCard(
          post.id, // 👈 pass id first
          post.title,
          post.body,
          post.created,
          post.updated,
          post.media
        )
      )
      .join("");
  } catch (err) {
    myPostsEl!.innerHTML = `<p class="text-red-500">Failed to load posts.</p>`;
    console.error(err);
  }
}

postFormEl?.addEventListener("submit", handleCreatePost);
renderFeed();

myPostsEl?.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("delete-btn")) {
    const postId = target.dataset.id!;
    console.log("Delete post:", postId, target);
    deletePost(postId);
    renderFeed();
    // 👉 call deletePost(postId)
  }

  if (target.classList.contains("edit-btn")) {
    const postId = target.dataset.id!;
    console.log("Edit post:", postId);
    window.location.href = `/update.html?postId=${postId}`;
    // 👉 open edit form or modal
  }
});
