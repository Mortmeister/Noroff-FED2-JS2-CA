export async function registerUser(
  name: string,
  email: string,
  password: string,
  bio: string,
  avatarUrl: string
) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        bio,
        avatar: avatarUrl ? { url: avatarUrl } : undefined,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      window.location.href = "./index.html";
      return result;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function loginUserFromForm(email: string, password: string) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function deletePost(id: string) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getPostById(id: string, token: string) {
  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts/${id}?_comments=true&_reactions=true&_author=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch post");
  const result = await response.json();
  return result.data;
}

export async function updatePost(
  postId: string,
  token: string,
  title: string,
  body: string,
  mediaUrl?: string,
  mediaAlt?: string,
  tags?: string[]
) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          title,
          body,
          media: mediaUrl ? { url: mediaUrl, alt: mediaAlt || "" } : undefined,
          tags,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to update post");
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error updating post:", err);
    throw err;
  }
}

//get all posts

export async function getAllPosts() {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts?_comments=true&_reactions=true&_author=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result.data;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getPostsByUsername(username: string) {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");

  const response = await fetch(
    `https://v2.api.noroff.dev/social/profiles/${username}/posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch posts");

  const result = await response.json();
  return result.data;
}

/**
 * createPost makes a new post to the Noroff API with method POST.
 *
 * @async
 * @function createPost
 * @param {string} token - The authentication token for the logged-in user.
 * @param {Object} payload - Contains the data for the new post.
 * @param {string} payload.title - Contains the title of the post.
 * @param {string} payload.body - Contains the body content of the post.
 * @param {{ url: string, alt: string }} [payload.media] -  media object containing the URL and alt text for an image.
 * @param {string[]} [payload.tags] - List of tags in the post.
 * @returns {Promise<Object>} The post data returned from the API.
 * @throws {Error} If the API request fails or the response is not OK.
 */
export async function createPost(
  token: string,
  payload: {
    title: string;
    body: string;
    media?: { url: string; alt: string };
    tags?: string[];
  }
) {
  const response = await fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create post");
  }

  return response.json();
}

export async function commentOnPost(id: number, body: string, token: string) {
  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts/${id}/comment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify({ body }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to post comment");
  }

  return response.json();
}

export async function searchForPost(query: string) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/posts/search?q=${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to search posts");
    }

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Error while searching posts:", err);
    throw err;
  }
}

// /social/profiles/<name>
export async function getSingleProfile(name: string) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${name}?_following=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to search posts");
    }

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Error while searching posts:", err);
    throw err;
  }
}

/**
 * Fetches all posts for a specific user from the Noroff API, and includes optional queries like comments, reactions, and author information.
 *
 * @param {string} name - The username of the profile to fetch posts for.
 * @returns {Promise<Post[]>} An array of post objects.
 * @throws Will throw an error if the request fails.
 */

export async function getAllPostsFromUser(name: string) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/social/profiles/${name}/posts?_following=true&_comments=true&_reactions=true&_author=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to search posts");
    }

    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error("Error while searching posts:", err);
    throw err;
  }
}

export async function followUser(name: string) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(
    `https://v2.api.noroff.dev/social/profiles/${name}/follow`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update post");
  }

  return response.json();
}

export async function unfollowUser(name: string) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(
    `https://v2.api.noroff.dev/social/profiles/${name}/unfollow`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update post");
  }

  return response.json();
}
