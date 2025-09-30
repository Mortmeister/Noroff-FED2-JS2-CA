export function createCard(
  title: string,
  body: string,
  created: string,
  updated: string,
  media?: { url?: string; alt?: string },
  reactions?: { symbol: string; count: number }[],
  comments?: { body: string; author: { name: string } }[],
  postId?: number,
  author?: { name: string; avatar?: { url?: string; alt?: string } }
) {
  const authorName = author?.name || "Anonymous";
  const authorUrl = author?.name
    ? `./profile-user.html?author=${authorName}`
    : "#";
  return `
    <div class="card bg-base-100 w-96 shadow-sm">
    <a href="${authorUrl}">
        <div class="flex items-center gap-3 p-4">
        <img 
          src="${author?.avatar?.url || "https://via.placeholder.com/40"}" 
          alt="${author?.avatar?.alt || author?.name || "User avatar"}" 
          class="w-10 h-10 rounded-full object-cover"
        />
        <span class="font-semibold">${author?.name || "Anonymous"}</span>
      </div>
      </a>

    <a href="./single.html?postId=${postId}">
      ${
        media?.url
          ? `
          <figure>
            <img src="${media.url}" class="single-post" id="${postId}" alt="${
              media.alt || "Post image"
            }" class="object-cover"/>
          </figure>
          `
          : ""
      }
      </a>

      <div class="card-body">
        <h2 class="card-title">${title ?? "Untitled post"}</h2>
        <p class="text-sm text-gray-500">
          Created: ${new Date(
            created
          ).toLocaleDateString()} • Updated: ${new Date(
    updated
  ).toLocaleDateString()}
        </p>
        <p>${body ?? ""}</p>

        <!-- Reactions -->
        <div class="mt-4">
          <h4 class="font-semibold text-sm mb-2">Reactions:</h4>
          ${
            reactions && reactions.length > 0
              ? `
                <div class="flex flex-wrap gap-2">
                  ${reactions
                    .map(
                      (reaction) =>
                        `<span class="px-2 py-1 bg-gray-100 rounded text-sm cursor-pointer">
                          ${reaction.symbol} ${reaction.count}
                        </span>`
                    )
                    .join("")}
                </div>`
              : `<p class="text-sm text-gray-400">No reactions yet</p>`
          }
          <form class="add-reaction-form mt-2 flex gap-2" data-postid="${postId}">
            <input 
              type="text" 
              name="symbol" 
              placeholder="😀" 
              maxlength="2" 
              class="input input-bordered input-sm w-16"
              required
            />
            <button type="submit" class="btn btn-sm btn-primary">React</button>
          </form>
        </div>

        <!-- Comments -->
        <div class="mt-4 border-t pt-2">
          <h4 class="font-semibold text-sm mb-2">Comments:</h4>
          ${
            comments && comments.length > 0
              ? comments
                  .map(
                    (comment) => `
                    <div class="text-sm mb-1">
                      <span class="font-bold">${
                        comment.author?.name ?? "Anonymous"
                      }:</span>
                      ${comment.body}
                    </div>`
                  )
                  .join("")
              : `<p class="text-sm text-gray-400">No comments yet</p>`
          }

          <form class="add-comment-form mt-2 space-y-2" data-postid="${postId}">
            <textarea 
              name="body" 
              rows="2" 
              placeholder="Write a comment..." 
              class="textarea textarea-bordered w-full"
              required
            ></textarea>
            <button type="submit" class="btn btn-sm btn-secondary">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  `;
}
export function createProfileCard(
  id: string,
  title: string,
  body: string,
  created: string,
  updated: string,
  media?: { url?: string; alt?: string }
) {
  return `
    <article 
      class="border rounded-md p-4 shadow bg-white text-black"
      data-post-id="${id}"
    >
      <h3 class="font-bold text-lg">${title ?? "Untitled post"}</h3>
      <p class="text-sm text-gray-500">Created: ${new Date(
        created
      ).toLocaleDateString()}</p>
      <p class="text-sm text-gray-500">Updated: ${new Date(
        updated
      ).toLocaleDateString()}</p>
      <p class="mt-2">${body ?? ""}</p>
      ${
        media?.url
          ? `<img src="${media.url}" alt="${
              media.alt || "Post image"
            }" class="mt-4 rounded"/>`
          : ""
      }

      <div class="mt-4 flex gap-2">
        <button 
          class="edit-btn bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          data-id="${id}"
        >
          Edit
        </button>
        <button 
          class="delete-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          data-id="${id}"
        >
          Delete
        </button>
      </div>
    </article>
  `;
}
