export function createUserCard(user: {
  name: string;
  email: string;
  bio?: string;
  avatar?: { url?: string; alt?: string };
  _count?: { followers?: number; following?: number };
}) {
  return `
  <div class="max-w-lg mx-auto bg-white rounded-lg shadow p-6 text-center">
    <!-- Avatar -->
    <div class="flex justify-center mb-4">
      <img 
        src="${user.avatar?.url || "https://via.placeholder.com/100"}" 
        alt="${user.avatar?.alt || user.name || "User avatar"}" 
        class="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
      />
    </div>

    <!-- Name & Email -->
    <h2 class="text-2xl font-bold mb-1">${user.name}</h2>
    <p class="text-sm text-gray-500 mb-4">${user.email}</p>

    <!-- Bio -->
    <p class="text-gray-700 mb-4">${user.bio || "This user has no bio yet."}</p>

    <!-- Followers / Following -->
    <div class="flex justify-center gap-6 mb-4">
      <div>
        <span class="font-semibold text-lg">${
          user._count?.followers || 0
        }</span>
        <p class="text-gray-500 text-sm">Followers</p>
      </div>
      <div>
        <span class="font-semibold text-lg">${
          user._count?.following || 0
        }</span>
        <p class="text-gray-500 text-sm">Following</p>
      </div>
    </div>
  </div>
  `;
}
