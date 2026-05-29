const FORM_ENDPOINTS = {
  interior: "",
  academy: "https://formspree.io/f/xpqnnwgq",
  podcast: "",
};

const MAX_RECEIPT_SIZE = 5 * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const socialMarkup = `
  <div class="floating-social" data-social>
    <div class="social-menu">
      <a href="https://www.instagram.com/designbyriqueza?igsh=ZzkzMHE5ODFraTc4" target="_blank" rel="noreferrer" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"></rect><circle cx="12" cy="12" r="3.2"></circle><circle cx="17.2" cy="6.8" r="0.8"></circle></svg>
      </a>
      <a href="https://api.whatsapp.com/send?phone=2348163582619" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 19.1l1-3.7a7.2 7.2 0 1 1 2.7 2.6l-3.7 1.1Z"></path><path d="M9.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4 0 .6l-.4.5c-.1.1-.2.3 0 .5.4.8 1.2 1.5 2.1 1.9.2.1.4.1.5-.1l.6-.7c.1-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .6-.4 1.5-1.1 1.7-.8.3-2.5.1-4.4-1.1-1.7-1.1-3.2-3-3.5-4.3-.2-.9.1-1.5.2-1.7Z"></path></svg>
      </a>
      <a href="tel:08163582619" aria-label="Call">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.3 4.5 9 4c.5-.1 1 .1 1.2.6l1 2.5c.2.4.1.8-.2 1.1L9.8 9.5a10.2 10.2 0 0 0 4.7 4.7l1.3-1.2c.3-.3.7-.4 1.1-.2l2.5 1c.5.2.7.7.6 1.2l-.5 1.7c-.2.8-.9 1.3-1.7 1.3A12.8 12.8 0 0 1 5 5.7c0-.8.5-1.5 1.3-1.7Z"></path></svg>
      </a>
    </div>
    <button class="social-toggle" type="button" aria-label="Open social links" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8.5h10M7 12h7M7 15.5h5"></path><path d="M12 21a9 9 0 1 0-7.2-3.6L4 21l3.6-.8A8.9 8.9 0 0 0 12 21Z"></path></svg>
    </button>
  </div>
  <div class="success-modal" data-success-modal role="dialog" aria-modal="true" aria-labelledby="success-title">
    <div class="success-dialog">
      <p class="eyebrow">Message received</p>
      <h2 id="success-title">Thank you.</h2>
      <p data-success-message>We have received your submission.</p>
      <button class="button button-dark" type="button" data-success-close>Close</button>
    </div>
  </div>
`;

document.body.insertAdjacentHTML("beforeend", socialMarkup);

const rates = {
  academy: [
    {
      name: "Interior Decoration & Design",
      description: "Full interior decoration and design training.",
      options: [
        ["Full one-time payment", "NGN 315,000"],
        ["1st installment", "NGN 210,000"],
        ["2nd installment", "NGN 105,000"],
      ],
    },
    {
      name: "Interior Design Project Management",
      description: "Project workflow, coordination, and delivery guidance.",
      options: [
        ["Full one-time payment", "NGN 305,000"],
        ["1st installment", "NGN 215,000"],
        ["2nd installment", "NGN 100,000"],
      ],
    },
    {
      name: "Furniture Design",
      description: "Furniture design foundations for interior environments.",
      options: [
        ["Full one-time payment", "NGN 255,000"],
        ["1st installment", "NGN 180,000"],
        ["2nd installment", "NGN 85,000"],
      ],
    },
    {
      name: "AutoCAD Beginner Class",
      description: "Beginner AutoCAD training for design documentation.",
      options: [
        ["Full one-time payment", "NGN 205,000"],
        ["1st installment", "NGN 150,000"],
        ["2nd installment", "NGN 65,000"],
      ],
    },
    {
      name: "SketchUp Beginner Class",
      description: "Beginner SketchUp training for interior visualization.",
      options: [
        ["Full one-time payment", "NGN 205,000"],
        ["1st installment", "NGN 150,000"],
        ["2nd installment", "NGN 65,000"],
      ],
    },
  ],
  podcast: [
    {
      name: "Podcast Studio Rental",
      description: "Studio rental only.",
      options: [["Per hour", "NGN 35,000"], ["Monthly bundle", "NGN 130,000"]],
    },
    {
      name: "Studio Rental for 3 Episodes",
      description: "Record three episodes back-to-back.",
      options: [["3 hours", "NGN 100,000"], ["Monthly bundle", "NGN 390,000"]],
    },
    {
      name: "Audio & Video Recording",
      description: "Single-camera recording package.",
      options: [["Per hour", "NGN 60,000"], ["Monthly bundle", "NGN 230,000"]],
    },
    {
      name: "Multi-Cam Recording + Editing",
      description: "Multi-camera recording with post-production.",
      options: [["Per hour", "NGN 130,000"], ["Monthly bundle", "NGN 500,000"]],
    },
    {
      name: "Premium Multi-Cam Production",
      description: "Recording, editing, intro, design, and montage.",
      options: [["Per hour", "NGN 270,000"], ["Monthly bundle", "NGN 1,060,000"]],
    },
  ],
};

const podcastAddons = [
  ["Audio edit per 10 minutes", "NGN 10,000"],
  ["Single-cam video edit per 10 minutes", "NGN 12,500"],
  ["Multi-cam video edit per 10 minutes", "NGN 15,000"],
  ["Artwork design", "NGN 40,000"],
  ["Video intro montage", "NGN 60,000"],
];

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector(".nav-toggle");
const social = document.querySelector("[data-social]");
const socialToggle = document.querySelector(".social-toggle");
const successModal = document.querySelector("[data-success-modal]");
const successMessage = document.querySelector("[data-success-message]");
const successClose = document.querySelector("[data-success-close]");

document.querySelectorAll(".site-nav a").forEach((link) => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const targetPage = link.getAttribute("href");
  if (targetPage === currentPage) link.classList.add("is-active");
});

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  header.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

socialToggle.addEventListener("click", () => {
  const open = social.classList.toggle("open");
  socialToggle.setAttribute("aria-expanded", String(open));
});

document.addEventListener("click", (event) => {
  if (!social.contains(event.target)) {
    social.classList.remove("open");
    socialToggle.setAttribute("aria-expanded", "false");
  }
});

function showSuccess(message) {
  successMessage.textContent = message;
  successModal.classList.add("open");
}

successClose.addEventListener("click", () => successModal.classList.remove("open"));
successModal.addEventListener("click", (event) => {
  if (event.target === successModal) successModal.classList.remove("open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    successModal.classList.remove("open");
    social.classList.remove("open");
    socialToggle.setAttribute("aria-expanded", "false");
  }
});

function renderRates(type) {
  const target = document.querySelector(`[data-rate-target="${type}"]`);
  if (!target) return;

  target.innerHTML = rates[type]
    .map(
      (item) => `
        <article class="rate-card">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          ${item.options
            .map(
              ([label, price]) => `
                <div class="rate-option">
                  <span>${label}</span>
                  <strong>${price}</strong>
                </div>
              `,
            )
            .join("")}
        </article>
      `,
    )
    .join("");

  if (type === "podcast") {
    target.insertAdjacentHTML(
      "beforeend",
      `
        <article class="rate-card addon-rate-card">
          <span class="rate-label">Optional extras</span>
          <h3>Editing & add-ons</h3>
          <p>Select these only when they apply to your main studio or recording booking.</p>
          ${podcastAddons
            .map(
              ([label, price]) => `
                <div class="rate-option">
                  <span>${label}</span>
                  <strong>${price}</strong>
                </div>
              `,
            )
            .join("")}
        </article>
      `,
    );
  }
}

function moneyToNumber(price) {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

function formatNaira(value) {
  return `NGN ${value.toLocaleString("en-NG")}`;
}

function renderPodcastAddons() {
  const target = document.querySelector('[data-addon-target="podcast"]');
  if (!target) return;

  target.innerHTML = podcastAddons
    .map(
      ([label, price], index) => `
        <label class="addon-option">
          <input type="checkbox" value="${label} - ${price}" data-addon-index="${index}" />
          <span>${label}</span>
          <strong>${price}</strong>
        </label>
      `,
    )
    .join("");

  target.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelector('[data-option-select="podcast"]')?.dispatchEvent(new Event("change"));
    });
  });
}

function setupRateSelector(type) {
  const packageSelect = document.querySelector(`[data-rate-select="${type}"]`);
  const optionSelect = document.querySelector(`[data-option-select="${type}"]`);
  const output = document.querySelector(`[data-price-output="${type}"]`);
  if (!packageSelect || !optionSelect || !output) return;

  packageSelect.innerHTML = rates[type]
    .map((item, index) => `<option value="${index}">${item.name}</option>`)
    .join("");

  function renderOptions() {
    const selected = rates[type][Number(packageSelect.value)];
    optionSelect.innerHTML = selected.options
      .map(([label, price], index) => `<option value="${index}" data-price="${price}">${label}</option>`)
      .join("");
    updatePrice();
  }

  function updatePrice() {
    const form = packageSelect.closest("form");
    const selected = rates[type][Number(packageSelect.value)];
    const option = selected.options[Number(optionSelect.value)];
    const selectedAddons =
      type === "podcast"
        ? [...document.querySelectorAll('[data-addon-target="podcast"] input:checked')].map((input) => {
            const addon = podcastAddons[Number(input.dataset.addonIndex)];
            return { label: addon[0], price: addon[1] };
          })
        : [];
    const baseAmount = option ? moneyToNumber(option[1]) : 0;
    const addonAmount = selectedAddons.reduce((sum, addon) => sum + moneyToNumber(addon.price), 0);
    output.textContent = option ? formatNaira(baseAmount + addonAmount) : "Select an option";

    const addonSummary = document.querySelector(`[data-addon-summary="${type}"]`);
    const selectedAddonText = selectedAddons.length
      ? selectedAddons.map((addon) => `${addon.label} (${addon.price})`).join(", ")
      : "No add-ons selected";
    if (addonSummary) {
      addonSummary.textContent = selectedAddons.length ? `Includes: ${selectedAddonText}` : selectedAddonText;
    }

    const addonInput = form?.querySelector('input[name="fi-text-selectedAddons"]');
    if (addonInput) {
      addonInput.value = selectedAddonText;
    }

    if (form) {
      let expected = form.querySelector('input[name="fi-text-expectedPayment"]');
      if (!expected) {
        expected = document.createElement("input");
        expected.type = "hidden";
        expected.name = "fi-text-expectedPayment";
        form.appendChild(expected);
      }
      expected.value = option
        ? `${selected.name} - ${option[0]} - base ${option[1]}${
            selectedAddons.length
              ? `; add-ons: ${selectedAddons.map((addon) => `${addon.label} ${addon.price}`).join(", ")}; total ${formatNaira(baseAmount + addonAmount)}`
              : `; total ${option[1]}`
          }`
        : "";
    }
  }

  packageSelect.addEventListener("change", renderOptions);
  optionSelect.addEventListener("change", updatePrice);
  renderOptions();
}

["academy", "podcast"].forEach((type) => {
  renderRates(type);
  setupRateSelector(type);
});

renderPodcastAddons();
document.querySelector('[data-option-select="podcast"]')?.dispatchEvent(new Event("change"));

function validateReceiptFile(input) {
  const file = input.files[0];
  if (!file) return "";

  if (!ALLOWED_RECEIPT_TYPES.includes(file.type)) {
    input.value = "";
    return "Receipt must be a JPG, PNG, or PDF file.";
  }

  if (file.size > MAX_RECEIPT_SIZE) {
    input.value = "";
    return "Receipt must be 5MB or smaller.";
  }

  return "";
}

document.querySelectorAll("input[type='file']").forEach((input) => {
  input.addEventListener("change", () => {
    const label = input.closest(".upload-field");
    const helper = label?.querySelector("em");
    const error = validateReceiptFile(input);
    if (helper) helper.textContent = error || input.files[0]?.name || "JPG, PNG, or PDF receipt. Max 5MB.";
  });
});

document.querySelectorAll("form[data-forminit]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const type = form.dataset.forminit;
    const endpoint = FORM_ENDPOINTS[type];
    const status = form.querySelector(".form-status");
    const button = form.querySelector("button[type='submit']");
    const fileInput = form.querySelector("input[type='file']");

    if (!endpoint) {
      status.textContent = "Add the Formspree endpoint for this form in script.js before it can send.";
      return;
    }

    if (fileInput) {
      const fileError = validateReceiptFile(fileInput);
      if (fileError) {
        status.textContent = fileError;
        return;
      }
    }

    status.textContent = "Sending...";
    button.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        let message = "Submission failed. Please try again.";
        try {
          const result = await response.json();
          message = result?.errors?.map((error) => error.message).join(" ") || result?.error || message;
        } catch {
          // Keep the generic message if Formspree returns a non-JSON error page.
        }
        throw new Error(message);
      }

      status.textContent =
        type === "interior"
          ? "Your inquiry has been received. The Riq'ueza team will contact you shortly."
          : "We have received your payment confirmation. Verification will be completed shortly.";
      showSuccess(status.textContent);
      form.reset();
      document.querySelectorAll("[data-price-output]").forEach((el) => {
        const outputType = el.dataset.priceOutput;
        if (outputType) setupRateSelector(outputType);
      });
    } catch (error) {
      status.textContent = error.message || "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;
    }
  });
});
