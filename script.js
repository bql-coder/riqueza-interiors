const FORM_ENDPOINTS = {
  interior: "",
  academy: "https://formspree.io/f/xpqnnwgq",
  podcast: "",
};

const MAX_RECEIPT_SIZE = 5 * 1024 * 1024;
const ALLOWED_RECEIPT_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const ACADEMY_REGISTRATION_FEE = 10000;

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
      description: "Practical training in interior decoration, space planning, materials, and site execution.",
      options: [
        ["Full one-time payment", "₦315,000"],
        ["1st installment", "₦210,000"],
        ["2nd installment", "₦105,000"],
      ],
    },
    {
      name: "Interior Design Project Management",
      description: "Project workflow, coordination, client handling, and delivery systems.",
      options: [
        ["Full one-time payment", "₦305,000"],
        ["1st installment", "₦215,000"],
        ["2nd installment", "₦100,000"],
      ],
    },
    {
      name: "Furniture Design",
      description: "Furniture concepts, detailing, and practical production thinking.",
      options: [
        ["Full one-time payment", "₦255,000"],
        ["1st installment", "₦180,000"],
        ["2nd installment", "₦85,000"],
      ],
    },
    {
      name: "AutoCAD & SketchUp (Beginner Class)",
      description: "Design documentation and 3D visualization foundations for beginners.",
      options: [
        ["Full one-time payment", "₦205,000"],
        ["1st installment", "₦150,000"],
        ["2nd installment", "₦65,000"],
      ],
    },
  ],
  podcast: [
    {
      name: "Podcast Studio Rental",
      description: "Studio rental only.",
      options: [["Per hour", "₦35,000"], ["Monthly bundle", "₦130,000"]],
    },
    {
      name: "Studio Rental for 3 Episodes",
      description: "Record three episodes back-to-back.",
      options: [["3 hours", "₦100,000"], ["Monthly bundle", "₦390,000"]],
    },
    {
      name: "Audio & Video Recording",
      description: "Single-camera recording package.",
      options: [["Per hour", "₦60,000"], ["Monthly bundle", "₦230,000"]],
    },
    {
      name: "Multi-Cam Recording + Editing",
      description: "Multi-camera recording with post-production.",
      options: [["Per hour", "₦130,000"], ["Monthly bundle", "₦500,000"]],
    },
    {
      name: "Premium Multi-Cam Production",
      description: "Recording, editing, intro, design, and montage.",
      options: [["Per hour", "₦270,000"], ["Monthly bundle", "₦1,060,000"]],
    },
  ],
};

const podcastAddons = [
  ["Audio edit per 10 minutes", "\u20A610,000"],
  ["Single-cam video edit per 10 minutes", "\u20A612,500"],
  ["Multi-cam video edit per 10 minutes", "\u20A615,000"],
  ["Artwork design", "\u20A640,000"],
  ["Video intro montage", "\u20A660,000"],
];

const podcastRateSections = [
  {
    title: "Recording Only",
    description: "Clean studio sessions without post-production.",
    items: [
      {
        name: "Podcast Studio Rental",
        description: "Studio rental only for focused recording sessions.",
        options: [["Per hour", "\u20A635,000"], ["Monthly bundle", "\u20A6130,000"]],
      },
      {
        name: "Studio Rental for 3 Episodes",
        description: "Record three episodes back-to-back in one booking.",
        options: [["3 hours", "\u20A6100,000"], ["Monthly bundle", "\u20A6390,000"]],
      },
      {
        name: "Audio & Video Recording",
        description: "Single-camera recording package.",
        options: [["Per hour", "\u20A660,000"], ["Monthly bundle", "\u20A6230,000"]],
      },
      {
        name: "Multi-Cam Recording",
        description: "Multi-camera recording with a more editorial setup.",
        options: [["Per hour", "\u20A690,000"], ["Monthly bundle", "\u20A6350,000"]],
      },
    ],
  },
  {
    title: "Recording + Editing",
    description: "Packages with recording and editing bundled together.",
    items: [
      {
        name: "Recording + Editing (Single Cam)",
        description: "Recording and editing for a streamlined production flow.",
        options: [["Per hour", "\u20A690,000"], ["Monthly bundle", "\u20A6350,000"]],
      },
      {
        name: "Recording + Editing (Multi-Cam)",
        description: "Multi-camera recording with editing included.",
        options: [["Per hour", "\u20A6130,000"], ["Monthly bundle", "\u20A6500,000"]],
      },
      {
        name: "Premium Multi-Cam Production",
        description: "Recording, editing, intro, design, and montage.",
        options: [["Per hour", "\u20A6270,000"], ["Monthly bundle", "\u20A61,060,000"]],
      },
      {
        name: "3-Episode Multi-Cam Editing",
        description: "Multi-cam editing for three back-to-back episodes.",
        options: [["3 hours", "\u20A6385,000"], ["Monthly bundle", "\u20A61,520,000"]],
      },
      {
        name: "3-Episode Premium Production",
        description: "Three back-to-back episodes with full production.",
        options: [["3 hours", "\u20A6805,000"], ["Monthly bundle", "\u20A63,200,000"]],
      },
    ],
  },
  {
    title: "Editing Only",
    description: "Standalone editing, design, and intro services.",
    items: [
      {
        name: "Audio Editing",
        description: "Podcast audio edit.",
        options: [["Per 10 minutes", "\u20A610,000"]],
      },
      {
        name: "Video Editing (Single Cam)",
        description: "Podcast video edit for single-camera footage.",
        options: [["Per 10 minutes", "\u20A612,500"]],
      },
      {
        name: "Video Editing (Multi-Cam)",
        description: "Podcast video edit for multi-camera footage.",
        options: [["Per 10 minutes", "\u20A615,000"]],
      },
      {
        name: "Intro / Outro Audio Edit",
        description: "Podcast intro and outro audio edit.",
        options: [["Flat rate", "\u20A640,000"]],
      },
      {
        name: "Artwork Design",
        description: "Podcast artwork design.",
        options: [["Flat rate", "\u20A640,000"]],
      },
      {
        name: "Video Intro Montage",
        description: "Video intro montage for podcast episodes.",
        options: [["Flat rate", "\u20A660,000"]],
      },
    ],
  },
];

const podcastRateCards = podcastRateSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, group: section.title })),
);

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
  if (targetPage === currentPage) {
    link.classList.add("is-active");
    link.setAttribute("aria-current", "page");
  }
});

function closeNav() {
  nav.classList.remove("open");
  header.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
}

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
  link.addEventListener("click", closeNav);
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

  if (nav.classList.contains("open") && !nav.contains(event.target) && !toggle.contains(event.target)) {
    closeNav();
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
    closeNav();
  }
});

function renderRates(type) {
  const target = document.querySelector(`[data-rate-target="${type}"]`);
  if (!target) return;

  if (type === "podcast") {
    const recording = podcastRateSections[0];
    const bundles = podcastRateSections[1];
    const editing = podcastRateSections[2];

    const renderPriceStack = (options) =>
      options
        .map(
          ([label, price]) => `
            <div class="rate-option">
              <span>${label}</span>
              <strong>${price}</strong>
            </div>
          `,
        )
        .join("");

    const renderPackageCard = (item, buttonLabel, defaultOptionIndex = 0) => `
      <article class="rate-card rate-card--podcast">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        ${renderPriceStack(item.options)}
        <button
          type="button"
          class="podcast-book-btn"
          data-podcast-package="${item.name}"
          data-podcast-option-index="${defaultOptionIndex}"
        >
          ${buttonLabel}
        </button>
      </article>
    `;

    target.innerHTML = `
      <section class="podcast-rate-section">
        <div class="podcast-rate-header">
          <div>
            <p class="section-kicker">01 / Recording</p>
            <h2>Studio Access</h2>
          </div>
          <p>Professional capture for ready-to-publish voices.</p>
        </div>
        <div class="podcast-rate-grid">
          ${recording.items.map((item) => renderPackageCard(item, "Select", 0)).join("")}
        </div>
      </section>
      <section class="podcast-rate-split">
        <div class="podcast-bundle-column">
          <div class="podcast-rate-header compact">
            <div>
              <p class="section-kicker">02 / Premium bundles</p>
              <h2>Recording + Editing</h2>
            </div>
            <p>Bundled sessions for polished production and post-production.</p>
          </div>
          <div class="podcast-bundle-list">
            ${bundles.items
              .map(
                (item) => `
                  <article class="podcast-rate-row">
                    <div>
                      <h3>${item.name}</h3>
                      <p>${item.description}</p>
                    </div>
                    <div class="podcast-rate-row-meta">
                      <strong>${item.options[0]?.[1] || ""}</strong>
                      <span class="podcast-monthly-price">${item.options[1]?.[1] || ""}</span>
                      <button
                        type="button"
                        class="podcast-book-link"
                        data-podcast-package="${item.name}"
                        data-podcast-option-index="${item.options.length > 1 ? 1 : 0}"
                      >
                        Book Bundle
                      </button>
                    </div>
                  </article>
                `,
              )
              .join("")}
          </div>
        </div>
        <article class="podcast-edit-panel">
          <div class="podcast-rate-header compact">
            <div>
              <p class="section-kicker">03 / Add-ons</p>
              <h2>Add-ons</h2>
            </div>
          </div>
          <div class="podcast-edit-list">
            ${editing.items
              .map(
                (item) => `
                  <div class="podcast-edit-row">
                    <div>
                      <span>${item.name}</span>
                      <p>${item.description}</p>
                    </div>
                    <div class="podcast-edit-row-meta">
                      <strong>${item.options[0]?.[1] || ""}</strong>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      </section>
    `;
    bindPodcastBookingButtons(target);
    return;
  }

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
}

function bindPodcastBookingButtons(root) {
  if (!root || root.dataset.podcastButtonsBound === "true") return;
  root.dataset.podcastButtonsBound = "true";

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-podcast-package]");
    if (!button) return;
    const packageName = button.dataset.podcastPackage;
    const optionIndex = Number(button.dataset.podcastOptionIndex || "0");
    focusPodcastPackage(packageName, optionIndex);
  });
}

function focusPodcastPackage(packageName, optionIndex = 0) {
  const packageSelect = document.querySelector('[data-rate-select="podcast"]');
  const optionSelect = document.querySelector('[data-option-select="podcast"]');
  const form = document.querySelector('form[data-forminit="podcast"]');
  if (!packageSelect || !form) return;

  const packageIndex = [...packageSelect.options].findIndex((option) => option.textContent === packageName);
  if (packageIndex < 0) return;

  packageSelect.value = String(packageIndex);
  packageSelect.dispatchEvent(new Event("change", { bubbles: true }));

  if (optionSelect) {
    const safeIndex = Math.max(0, Math.min(optionIndex, optionSelect.options.length - 1));
    optionSelect.value = String(safeIndex);
    optionSelect.dispatchEvent(new Event("change", { bubbles: true }));
  }

  form.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    const firstField = form.querySelector("input, select, textarea, button");
    firstField?.focus?.();
  }, 450);
}

function moneyToNumber(price) {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

function formatNaira(value) {
  return "\u20A6" + value.toLocaleString("en-NG");
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
  if (!packageSelect || !output) return;
  const usesOptionSelect = Boolean(optionSelect);
  const availableRates = type === "podcast" ? podcastRateCards : rates[type];

  packageSelect.innerHTML = availableRates
    .map((item, index) => `<option value="${index}">${item.name}</option>`)
    .join("");

  function renderOptions() {
    const selected = availableRates[Number(packageSelect.value)];
    if (usesOptionSelect) {
      optionSelect.innerHTML = selected.options
        .map(([label, price], index) => `<option value="${index}" data-price="${price}">${label}</option>`)
        .join("");
    }
    updatePrice();
  }

  function updatePrice() {
    const form = packageSelect.closest("form");
    const selected = availableRates[Number(packageSelect.value)];
    const option = usesOptionSelect ? selected.options[Number(optionSelect.value)] : selected.options[0];
    const selectedAddons =
      type === "podcast"
        ? [...document.querySelectorAll('[data-addon-target="podcast"] input:checked')].map((input) => {
            const addon = podcastAddons[Number(input.dataset.addonIndex)];
            return { label: addon[0], price: addon[1] };
          })
        : [];
    const baseAmount = option ? moneyToNumber(option[1]) : 0;
    const addonAmount = selectedAddons.reduce((sum, addon) => sum + moneyToNumber(addon.price), 0);
    const registrationAmount = type === "academy" ? ACADEMY_REGISTRATION_FEE : 0;
    output.textContent = option ? formatNaira(baseAmount + addonAmount + registrationAmount) : "Select an option";

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
      let paymentOptionField = form.querySelector('input[name="fi-text-paymentOption"]');
      if (type === "academy" && !paymentOptionField) {
        paymentOptionField = document.createElement("input");
        paymentOptionField.type = "hidden";
        paymentOptionField.name = "fi-text-paymentOption";
        form.appendChild(paymentOptionField);
      }
      if (type === "academy" && paymentOptionField) {
        paymentOptionField.value = "Full one-time payment (upon registration)";
      }
      expected.value = option
        ? `${selected.name} - ${option[0]} - base ${option[1]}${
            type === "academy" ? `; registration fee ${formatNaira(ACADEMY_REGISTRATION_FEE)}` : ""
          }${
            selectedAddons.length
              ? `; add-ons: ${selectedAddons.map((addon) => `${addon.label} ${addon.price}`).join(", ")}`
              : ""
          }; total ${formatNaira(baseAmount + addonAmount + registrationAmount)}`
        : "";
    }

    if (type === "academy") {
      const feeTag = form?.querySelector("[data-registration-fee]");
      if (feeTag) {
        feeTag.textContent = `Registration fee: ${formatNaira(ACADEMY_REGISTRATION_FEE)} (non-refundable)`;
      }
    }
  }

  packageSelect.addEventListener("change", renderOptions);
  if (usesOptionSelect) {
    optionSelect.addEventListener("change", updatePrice);
  }
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
