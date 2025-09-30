import { createCard } from "../components/cards/postUi";
import { getPostById } from "../api/apiClient";

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
