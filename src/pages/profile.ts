import { createPost, getPostsByUsername } from "../api/apiClient";
import { createProfileCard } from "../components/cards/postUi";
import { deletePost } from "../api/apiClient";
import { updateImagePreview } from "../components/forms/preview";

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
