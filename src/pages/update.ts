import { updatePost, getPostById } from "../api/apiClient";
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
      localStorage.removeItem("username");
      updateLinkText();
      alert("You have been logged out.");
      window.location.href = "./login.html";
    } else {
      window.location.href = "../login.html";
    }
  });
}

const postImageUrl = document.getElementById("url") as HTMLInputElement;
const imageURLPreview = document.getElementById(
  "imageURLPreview"
) as HTMLImageElement;

postImageUrl.addEventListener("input", () => {
  updateImagePreview(postImageUrl, imageURLPreview);
  debugger;
});

const updateForm = document.getElementById("updatePostForm") as HTMLFormElement;

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

async function loadPost() {
  if (!postId) return;

  const token = localStorage.getItem("authToken");
  const post = await getPostById(postId, token!);

  (updateForm.elements.namedItem("title") as HTMLInputElement).value =
    post.title || "";
  (updateForm.elements.namedItem("body") as HTMLTextAreaElement).value =
    post.body || "";
  (updateForm.elements.namedItem("mediaUrl") as HTMLInputElement).value =
    post.media?.url || "";
  (updateForm.elements.namedItem("mediaAlt") as HTMLInputElement).value =
    post.media?.alt || "";
  (updateForm.elements.namedItem("tags") as HTMLInputElement).value =
    post.tags?.join(", ") || "";
}

loadPost();

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!postId) return;

  const token = localStorage.getItem("authToken");
  const formData = new FormData(updateForm);
  const data = Object.fromEntries(formData.entries()) as {
    title: string;
    body: string;
    mediaUrl: string;
    mediaAlt: string;
    tags: string;
  };

  const payload = {
    title: data.title,
    body: data.body,
    media: data.mediaUrl
      ? { url: data.mediaUrl, alt: data.mediaAlt || "" }
      : undefined,
    tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
  };

  try {
    await updatePost(postId, token!, payload);
    alert("Post updated successfully!");
    window.location.href = "/profile.html";
  } catch (err) {
    console.error(err);
    alert("Failed to update post");
  }
});
