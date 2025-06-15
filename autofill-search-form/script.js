document.addEventListener("DOMContentLoaded", function () {
  const searchAddressInput = document.getElementById("search-address");
  const suggestionAddress = document.querySelector(".address-suggestion");
  const streetAddress = document.getElementById("street-address");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const zipCode = document.getElementById("zip-code");

  searchAddressInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchAddress();
    }
  });
  // create a mock address to imitate DB data
  const mockAddress = [
    {
      id: 1,
      street: "123 Main St",
      city: "New Yowk",
      state: "NY",
      zipCode: "10001",
    },
    {
      id: 2,
      street: "456 Park Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
    },
    {
      id: 3,
      street: "789 Oak Dr",
      city: "Chicago",
      state: "IL",
      zipCode: "60007",
    },
    {
      id: 4,
      street: "101 Pine St",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
    },
    {
      id: 5,
      street: "202 Maple Rd",
      city: "Austin",
      state: "TX",
      zipCode: "73001",
    },
  ];

  function searchAddress() {
    const query = searchAddressInput.value.toLowerCase();

    suggestionAddress.innerHTML = "";

    if (query === "") return;

    const filteredAddress = mockAddress.filter(
      (address) =>
        address.street.toLowerCase().includes(query) ||
        address.city.toLowerCase().includes(query) ||
        address.state.toLowerCase().includes(query) ||
        address.zipCode.includes(query)
    );

    filteredAddress.forEach((address) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";
      suggestionItem.textContent = `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;

      suggestionAddress.addEventListener("click", function () {
        autoFilled(address.id);
        suggestionAddress.innerHTML = "";
      });
      suggestionAddress.appendChild(suggestionItem);
    });
  }

  function autoFilled(id) {
    const clickItemIndex = mockAddress.findIndex(
      (address) => address.id === id
    );

    const clickAddress = mockAddress[clickItemIndex];

    streetAddress.value = clickAddress.street;
    city.value = clickAddress.city;
    state.value = clickAddress.state;
    zipCode.value = clickAddress.zipCode;

    [streetAddress, city, state, zipCode].forEach((element) => {
      element.classList.add("auto-filled");

      setTimeout(() => {
        element.classList.remove("auto-filled");
      }, 2000);
    });
  }
});
