document.addEventListener("DOMContentLoaded", function () {
  const fetchButton = document.getElementById("fetch");
  const productList = document.querySelector(".product-lists");
  const skeletonLoader = document.querySelector(".skeleton-loader");
  const spanError = document.querySelector(".error span");

  fetchButton.addEventListener("click", fetchProduct);

  async function fetchProduct() {
    try {
      spanError.textContent = "";
      displaySkeletonLoader();

      // artificial delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // reset the product list for refetch
      if (productList.children.length > 0) {
        const productListItem = document.querySelectorAll(".product-item");
        productListItem.forEach((product) => productList.removeChild(product));
      }

      const response = await fetch("https://dummyjson.com/products?limit=10");

      if (!response.ok) throw new Error("Failed to fetch product");

      const data = await response.json();

      const products = productsDTO(data.products);

      displayProducts(products);
    } catch (err) {
      spanError.textContent = `${err.message}. Please refetch the products`;
    } finally {
      skeletonLoader.classList.add("loaded");
    }
  }

  function productsDTO(products) {
    return products.map((product) => ({
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      rating: product.rating,
      ratingsCount: product.reviews.length,
    }));
  }

  function displayProducts(products) {
    if (products.length === 0) {
      spanError.textContent = `No product found`;
      return;
    }

    products.forEach((product) => {
      // Create stars ratings
      const fullStars = Math.floor(product.rating);
      const hasHalfStar = product.rating % 1 >= 0.5;

      let starsHtml = "";
      for (let i = 0; i < fullStars; i++) {
        starsHtml += `<i class="fas fa-star"></i>`;
      }

      if (hasHalfStar) {
        starsHtml += `<i class="fas fa-star-half-alt"></i>`;
      }

      // Create product
      const productItem = document.createElement("div");

      productItem.className = "product-item";
      productItem.innerHTML = `
        <div class="product-image-container">
            <img
            src="${product.thumbnail}"
            alt="${product.title}"
            />
        </div>
        <div class="product-body">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="product-price-ratings">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <div class="product-ratings">
                    <span class="product-stars">${starsHtml}</span>
                    <span class="product-count">(${product.ratingsCount})</span>
                </div>
            </div>
            <button>Add to cart</button>
        </div>`;

      productList.appendChild(productItem);
    });
  }

  function displaySkeletonLoader() {
    skeletonLoader.classList.remove("loaded");

    Array.from(Array(3)).forEach(() => {
      const skeletonItem = document.createElement("div");

      skeletonItem.className = "skeleton-item";
      skeletonItem.innerHTML = `
            <div class="product-image-container"></div>
            <div class="product-body">
                <h3 class="skeleton-line title"></h3>
                <p class="skeleton-line"></p>
                <div class="product-price-ratings">
                <span class="skeleton-line price"></span>
                <div class="product-ratings skeleton">
                    <span class="skeleton-line stars"></span>
                    <span class="skeleton-line count"></span>
                </div>
                </div>
            </div>
          `;

      skeletonLoader.appendChild(skeletonItem);
    });
  }
});
