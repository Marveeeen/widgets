document.addEventListener("DOMContentLoaded", function () {
  const ITEMS_LIMIT = 10;
  const skeletonLoader = document.querySelector(".skeleton-loader");
  const apiList = document.querySelector("ul");
  const errorContainer = document.querySelector(".error");

  // create skeleton item depending on the item limit
  function createSkeletonLoaderItem() {
    Array.from(Array(ITEMS_LIMIT)).forEach(() => {
      const skeletonItem = document.createElement("div");

      skeletonItem.className = "skeleton-item";
      skeletonItem.innerHTML = `
          <div class="skeleton-line name"></div>
          <div class="skeleton-line email"></div>
          `;

      skeletonLoader.appendChild(skeletonItem);
    });
  }

  async function fetchUsers() {
    try {
      // Add delay to demo skeleton loader
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        `https://dummyjson.com/users?limit=${ITEMS_LIMIT}`
      );

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      data.users.forEach((user) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        const li = document.createElement("li");

        li.className = "list-item";
        li.innerHTML = `
          <div>
            <p class="name">${fullName}</p>
            <p class="email">${user.email}</p>
          </div>
          <div class="badge">${user.company.name}</div>`;

        apiList.appendChild(li);
      });
    } catch (err) {
      const spanError = document.createElement("span");
      spanError.textContent = `${err.message}. Please refresh the page`;
      errorContainer.appendChild(spanError);
    } finally {
      skeletonLoader.classList.add("loaded");
    }
  }

  createSkeletonLoaderItem();
  fetchUsers();
});
