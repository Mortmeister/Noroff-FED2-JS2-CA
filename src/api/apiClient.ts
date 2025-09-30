const BASE_URL: string = "https://v2.api.noroff.dev";

// register user
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
      console.log("New user created", result);
      window.location.href = "./index.html";
      return result;
    } else {
      const error = await response.json();
      console.log("failed login", error);
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
  }
}

// login
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
      console.log("login successful", result);

      return result;
    } else {
      const error = await response.json();
      console.log("failed login", error);
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
  }
}

// Delete
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
      console.log(result);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getPostById(id: string, token: string) {
  const response = await fetch(`https://v2.api.noroff.dev/social/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch post");
  const result = await response.json();
  return result.data;
}

export async function updatePost(
  postId: string,
  token: string,
  payload: {
    title: string;
    body: string;
    media?: { url: string; alt: string };
    tags?: string[];
  }
) {
  const response = await fetch(
    `https://v2.api.noroff.dev/social/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to update post");
  }

  return response.json(); // returns the updated post
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
      console.log(result);
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
      body: JSON.stringify({ body }), // 👈 only send the body as string
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
    console.log("Search results:", result.data);
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
    console.log("Search results:", result.data);
    return result.data;
  } catch (err) {
    console.error("Error while searching posts:", err);
    throw err;
  }
}

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
    console.log("Search results:", result.data);
    return result.data;
  } catch (err) {
    console.error("Error while searching posts:", err);
    throw err;
  }
}

// /social/profiles/<name>/follow PUT
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

  return response.json(); // returns the updated post
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

  return response.json(); // returns the updated post
}
// /social/profiles/<name>/unfollow PUT
