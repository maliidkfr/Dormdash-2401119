/* =========================================
   DormDash JavaScript
   Author: Damali Reid 
   Project: Web Programming IA#2
   ========================================= */

// Run this when the page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("DormDash initialized ✅");

  // Highlight the current active page in navbar
  setActiveLink();

  // Attach event listeners for forms if they exist
  setupRegisterForm();
  setupLoginForm();
});

/* ======= Highlight Active Navbar Link ======= */
function setActiveLink() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* ======= Register Form Validation ======= */
function setupRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return; // Stop if we're not on the register page

  form.addEventListener("submit", event => {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("regError");

    if (!fullname || !email || !username || !password) {
      error.textContent = "⚠️ All fields must be filled!";
      error.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      error.textContent = "⚠️ Please enter a valid email!";
      error.style.color = "red";
      return;
    }

    // Store user in localStorage (mock database)
    const userData = { fullname, email, username, password };
    localStorage.setItem("DormDashUser", JSON.stringify(userData));

    error.textContent = "✅ Registration successful! Redirecting...";
    error.style.color = "green";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
}

/* ======= Login Validation ======= */
function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const error = document.getElementById("loginError");

    if (!username || !password) {
      error.textContent = "⚠️ Please fill in both fields!";
      error.style.color = "red";
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("DormDashUser"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      error.textContent = "✅ Login successful! Redirecting...";
      error.style.color = "green";

      localStorage.setItem("DormDashLoggedIn", "true");

      setTimeout(() => {
        window.location.href = "products.html";
      }, 1200);
    } else {
      error.textContent = "❌ Invalid username or password.";
      error.style.color = "red";
    }
  });
}

/* ======= Add to Cart Function ======= */
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("DormDashCart")) || [];

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("DormDashCart", JSON.stringify(cart));
  alert(`${name} added to cart ✅`);
}
