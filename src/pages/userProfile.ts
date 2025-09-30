import {
  getSingleProfile,
  getAllPostsFromUser,
  followUser,
  unfollowUser,
} from "../api/apiClient";
import { createUserCard } from "../components/cards/userUi";
import { createCard } from "../components/cards/postUi";

const urlParams = new URLSearchParams(window.location.search);
const authorName = urlParams.get("author");
const postsContainer = document.getElementById("postsFromUserContainer");
const followBtn = document.getElementById("followBtn");
const myUser = localStorage.getItem("username");

const textState1 = "follow";
const textState2 = "Unfollow";

async function returnFollowing() {
  //
  const result = await getSingleProfile(myUser);
  const { following } = result;

  return following.some((user) => user.name === authorName);
}

let isFollowing = await returnFollowing();

followBtn.innerText = isFollowing ? textState2 : textState1;

followBtn.addEventListener("click", async () => {
  try {
    if (!isFollowing) {
      await followUser(authorName);
      followBtn.innerText = textState2;
      isFollowing = true;
    } else {
      await unfollowUser(authorName);
      followBtn.innerText = textState1;
      isFollowing = false;
    }
  } catch (err) {
    console.error("Failed to update follow status:", err);
    alert("Could not update follow status. Try again.");
  }
});

async function renderUserProfile() {
  if (!authorName) return;

  try {
    const user = await getSingleProfile(authorName);

    if (profileContainer && user) {
      profileContainer.innerHTML = createUserCard(user);
    }
  } catch (err) {
    console.error("Failed to load user profile:", err);
    if (profileContainer) {
      profileContainer.innerHTML = `<p class="text-red-500">Failed to load user profile.</p>`;
    }
  }
}

renderUserProfile();

async function renderFeed() {
  const token = localStorage.getItem("authToken"); // 👈 stored at login
  if (!token) {
    return;
  }

  try {
    const posts = await getAllPostsFromUser(authorName);

    postsContainer!.innerHTML = posts
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
    postsContainer!.innerHTML = `<p class="text-red-500">Failed to load posts.</p>`;
    console.log(err);
  }
}

renderFeed();
