document.addEventListener("DOMContentLoaded", function () {
  // DOM ELEMENTS
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");
  const inputCouponCode = document.getElementById("coupon-text");
  const applyCouponBtn = document.getElementById("apply");
  const discountElement = document.getElementById("discount");
  const discountContainerElement = document.querySelector(".discount");
  const couponMessageElement = document.getElementById("coupon-message");

  applyCouponBtn.addEventListener("click", applyCoupon);
  inputCouponCode.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      applyCoupon();
    }
  });

  // Cart data
  let cart = {
    subtotal: 100.0,
    shipping: 5.0,
    discount: 0,
    total: 105.0,
    appliedCoupon: null,
  };

  // Available coupon codes with their discounts
  const coupons = {
    WELCOME10: {
      type: "percentage",
      value: 10,
      description: "10% off your order",
    },
    SAVE20: {
      type: "percentage",
      value: 20,
      description: "20% off your order",
    },
    FREESHIP: {
      type: "shipping",
      value: 100,
      description: "Free shipping on your order",
    },
    FLAT25: {
      type: "fixed",
      value: 25,
      description: "$25 off your order",
    },
  };

  updateCartDisplay();

  function applyCoupon() {
    const code = inputCouponCode.value;

    resetCoupon();

    if (code.length === 0) {
      showCouponMessage("Please enter a coupon code", "error");
      return;
    }

    if (!coupons[code]) {
      showCouponMessage("Invalid Coupon Code", "error");
      return;
    }

    const coupon = coupons[code];
    cart.appliedCoupon = coupon;

    switch (coupon.type) {
      case "percentage":
        cart.discount = ((cart.subtotal * coupon.value) / 100).toFixed(2);
        break;
      case "fixed":
        cart.discount = Math.min(coupon.value, cart.subtotal).toFixed(2);
        break;
      case "shipping":
        cart.discount = Math.min(cart.shipping, coupon.value).toFixed(2);
    }

    // update total
    updateTotal();

    updateCartDisplay();
    showCouponMessage(`Coupon entered: ${coupon.description}`, "discount");
  }

  function updateCartDisplay() {
    subtotalElement.textContent = `$${cart.subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${cart.shipping.toFixed(2)}`;
    totalElement.textContent = `$${cart.total.toFixed(2)}`;

    if (cart.discount > 0) {
      discountElement.textContent = `-$${cart.discount}`;
      discountContainerElement.classList.remove("hide");
    } else {
      discountContainerElement.classList.add("hide");
    }
  }

  function resetCoupon() {
    cart.appliedCoupon = null;
    cart.discount = 0;
    updateTotal();
    updateCartDisplay();
  }

  function updateTotal() {
    cart.total =
      parseFloat(cart.subtotal) +
      parseFloat(cart.shipping) -
      parseFloat(cart.discount);
  }

  function showCouponMessage(message, type) {
    couponMessageElement.textContent = message;
    couponMessageElement.classList.remove("hide");
    couponMessageElement.className = type;
  }
});
