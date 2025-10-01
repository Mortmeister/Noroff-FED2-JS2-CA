export function createHeader() {
  const token = localStorage.getItem("authToken");
  const loginText = token ? "Log out" : "Log in";

  return `
  <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      
          <div class="flex justify-between items-center w-full lg:w-auto">
        <ul class="flex flex-row font-medium space-x-8">
          <li>
            <a
              href="./feed.html"
              class="py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 
                     dark:text-gray-400 dark:hover:text-white"
            >Feed</a>
          </li>
          <li>
            <a
              href="./profile.html"
              class="py-2 pr-4 pl-3 text-gray-700 hover:text-primary-700 
                     dark:text-gray-400 dark:hover:text-white"
            >Profile</a>
          </li>
        </ul>
      </div>
      
      <div class="flex items-center">
        <a
          id="loginLink"
          class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 
                 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 
                 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none 
                 dark:focus:ring-gray-800"
        >
          ${loginText}
        </a>
      </div>

      

    </div>
  </nav>`;
}
