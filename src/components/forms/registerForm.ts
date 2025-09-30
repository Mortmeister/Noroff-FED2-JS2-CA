export function registerForm(): string {
  return `
<div class="flex min-h-screen flex-col justify-center items-center px-6 py-12">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-white">
      Register a new account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
    <form id="registerForm" class="space-y-6">
      
      <!-- Name -->
      <div>
        <label class="block text-sm font-medium text-white">Username</label>
        <input
          type="text"
          name="name"
          required
          placeholder="your_username"
          class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-white">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="first.last@stud.noroff.no"
          class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-white">Password</label>
        <input
          type="password"
          name="password"
          required
          minlength="8"
          placeholder="Password"
          class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
        <p class="mt-1 text-xs text-gray-300">
          Must be at least 8 characters, include a number, a lowercase letter, and an uppercase letter.
        </p>
      </div>

      <!-- Bio -->
      <div>
        <label class="block text-sm font-medium text-white">Bio</label>
        <textarea
          name="bio"
          rows="3"
          placeholder="Tell us something about yourself..."
          class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500"
        ></textarea>
      </div>

      <!-- Avatar -->
      <div>
        <label class="block text-sm font-medium text-white">Avatar URL</label>
        <input
          type="url"
          name="avatarUrl"
          placeholder="https://example.com/avatar.jpg"
          class="mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <!-- Submit -->
      <div>
        <button
          type="submit"
          class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</div>
`;
}
