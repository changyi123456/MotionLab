const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
const langToggle = document.getElementById("langToggle");
const copyEmailButtons = Array.from(document.querySelectorAll(".copy-email[data-email]"));
const isAuthorPage = window.location.pathname.toLowerCase().endsWith("author.html");

const commonTranslations = [
  { selector: ".site-nav", attrs: { "aria-label": "Main navigation" } },
  { selector: ".site-nav a:nth-of-type(1)", text: "Overview" },
  { selector: ".site-nav a:nth-of-type(2)", text: "Core Math" },
  { selector: ".site-nav a:nth-of-type(3)", text: "Workflow" },
  { selector: ".site-nav a:nth-of-type(4)", text: "Downloads" },
  { selector: ".site-nav a:nth-of-type(5)", text: "Author" },
  { selector: ".brand", attrs: { "aria-label": "MotionLab Tracker Guide" } },
];

const indexTranslations = [
  { selector: ".intro-copy .section-label", text: "2D And 3D Motion Tracking Workbench" },
  { selector: ".intro-copy h1", text: "MotionLab Tracker Technical And Operation Guide" },
  {
    selector: ".intro-copy > p:not(.section-label)",
    text:
      "This guide introduces the calculation logic, operating workflow, data output, and release status of MotionLab 2D Workbench and MotionLab 3D Workbench. The packaged apps are provided through GitHub Releases for direct download and extraction. Source materials are marked as not public until the official release is ready.",
  },
  { selector: ".intro-actions .button.primary", text: "Start Workflow" },
  { selector: ".intro-actions .button:not(.primary)", text: "Technical References" },
  {
    selector: ".app-showcase",
    attrs: { "aria-label": "MotionLab 2D and 3D application screenshots" },
  },
  {
    selector: ".app-shot-primary figcaption span",
    text: "Single-view tracking with calibration, scale setup, and exported motion data.",
  },
  {
    selector: ".app-shot:not(.app-shot-primary) figcaption span",
    text: "Dual-view XZ / YZ tracking with depth calibration and 3D trajectory output.",
  },
  { selector: "#principles .section-head .section-label", text: "Core Math" },
  { selector: "#principles .section-head h2", text: "Core Calculation Principles" },
  {
    selector: "#principles .split-block:not(.reverse) h3",
    text: "2D Tracker: calibration, coordinates, and derivatives",
  },
  {
    selector: "#principles .split-block:not(.reverse) > div:first-child > p:nth-of-type(1)",
    text:
      "2D tracking treats the video as a calibrated plane. After choosing an origin, axis direction, and known physical length, pixel positions can be converted into real-world coordinates. With the frame rate, position samples can then be transformed into displacement, velocity, and acceleration.",
  },
  {
    selector: "#principles .split-block:not(.reverse) .equation-card:nth-child(1) figcaption",
    html: "A known physical length L and its pixel distance d<sub>px</sub> define the pixel-to-world scale S.",
  },
  {
    selector: "#principles .split-block:not(.reverse) .equation-card:nth-child(2) figcaption",
    text:
      "Pixel coordinates are translated to the selected origin, rotated into the chosen axes, and scaled into physical coordinates.",
  },
  {
    selector: "#principles .split-block:not(.reverse) .equation-card:nth-child(3) figcaption",
    text:
      "Velocity and acceleration are estimated from neighboring frames, so stable tracking points and frame rate matter.",
  },
  {
    selector: "#principles .split-block:not(.reverse) > div:first-child > p:nth-of-type(2)",
    text:
      "The exported data is suited for classroom analysis, graphs, CSV processing, and follow-up fitting. When the tracked point jitters, centroid snap and manual correction reduce frame-to-frame noise.",
  },
  { selector: "#principles .split-block:not(.reverse) .note-panel h4", text: "2D Use Notes" },
  {
    selector: "#principles .split-block:not(.reverse) .note-panel li:nth-child(1)",
    text: "Use a clear calibration length in the same plane as the motion.",
  },
  {
    selector: "#principles .split-block:not(.reverse) .note-panel li:nth-child(2)",
    text: "Keep the camera still and avoid perspective changes when possible.",
  },
  {
    selector: "#principles .split-block:not(.reverse) .note-panel li:nth-child(3)",
    text: "Export time, x, y, vx, vy, and derived data for graphs or CSV analysis.",
  },
  {
    selector: "#principles .split-block.reverse > div:first-child h3",
    text: "3D Tracker: paired XZ / YZ views",
  },
  {
    selector: "#principles .split-block.reverse > div:first-child > p:nth-of-type(1)",
    text:
      "MotionLab 3D Workbench uses two synchronized views: view A records the XZ plane and view B records the YZ plane. After setting scale, FPS, and matching frames, the two tracks can be fused into X, Y, and Z coordinates.",
  },
  {
    selector: "#principles .split-block.reverse .equation-card:nth-child(1) figcaption",
    text: "View A contributes XZ measurements, while view B contributes YZ measurements.",
  },
  {
    selector: "#principles .split-block.reverse .equation-card:nth-child(2) figcaption",
    text:
      "A first-order parallax model keeps the two depth readings consistent when the cameras are not perfectly orthogonal.",
  },
  {
    selector: "#principles .split-block.reverse .equation-card:nth-child(3) figcaption",
    text:
      "The optimization chooses correction parameters that minimize the difference between the two Z estimates across frames.",
  },
  {
    selector: "#principles .split-block.reverse > div:first-child > p:nth-of-type(2)",
    text:
      "The resulting 3D trajectory can be checked visually and exported for graphing, CSV work, or Python analysis. A lower Z residual usually indicates better paired-view alignment.",
  },
  { selector: "#principles .split-block.reverse .note-panel h4", text: "3D Use Notes" },
  {
    selector: "#principles .split-block.reverse .note-panel li:nth-child(1)",
    text: "Track X, Y, and Z with matched frame timing between the two videos.",
  },
  {
    selector: "#principles .split-block.reverse .note-panel li:nth-child(2)",
    text: "Use the same object point in both XZ and YZ views to avoid paired-track mismatch.",
  },
  {
    selector: "#principles .split-block.reverse .note-panel li:nth-child(3)",
    text: "Inspect the 3D trajectory and export CSV/Python-ready data after correction.",
  },
  { selector: "#workflow .section-head .section-label", text: "How To Use" },
  { selector: "#workflow .section-head h2", text: "Operating Workflow" },
  { selector: ".workflow-card:nth-child(1) h3", text: "2D Workbench Workflow" },
  {
    selector: ".workflow-card:nth-child(1) li:nth-child(1)",
    text: "Import a video, confirm FPS, and set a clear calibration length.",
  },
  {
    selector: ".workflow-card:nth-child(1) li:nth-child(2)",
    text: "Use the calibration tool to define origin, axes, and the real-world scale.",
  },
  {
    selector: ".workflow-card:nth-child(1) li:nth-child(3)",
    text: "Create a point mass and click the tracked object frame by frame.",
  },
  {
    selector: ".workflow-card:nth-child(1) li:nth-child(4)",
    text: "Review the trajectory, fix incorrect points, and keep the motion path smooth.",
  },
  {
    selector: ".workflow-card:nth-child(1) li:nth-child(5)",
    text: "Use centroid snap or auto tracking when the target is visually stable.",
  },
  {
    selector: ".workflow-card:nth-child(1) li:nth-child(6)",
    text: "Export coordinates, velocity, acceleration, graphs, and CSV data.",
  },
  { selector: ".workflow-card:nth-child(2) h3", text: "3D Workbench Workflow" },
  {
    selector: ".workflow-card:nth-child(2) li:nth-child(1)",
    text: "Load view A for XZ tracking and view B for YZ tracking.",
  },
  {
    selector: ".workflow-card:nth-child(2) li:nth-child(2)",
    text: "Calibrate both views with scale, orientation, and synchronized frame timing.",
  },
  {
    selector: ".workflow-card:nth-child(2) li:nth-child(3)",
    text: "Track the same physical point in both views with matched frames.",
  },
  {
    selector: ".workflow-card:nth-child(2) li:nth-child(4)",
    text: "Run Z correction and check the residual or alignment quality.",
  },
  {
    selector: ".workflow-card:nth-child(2) li:nth-child(5)",
    text: "Inspect the 3D trajectory with the plot controls and switch views as needed.",
  },
  {
    selector: ".workflow-card:nth-child(2) li:nth-child(6)",
    text: "Export the 3D result for CSV, graphing, or Python analysis.",
  },
  { selector: "#downloads .section-head .section-label", text: "Downloads" },
  { selector: "#downloads .section-head h2", text: "Downloads And Release Status" },
  {
    selector: "#downloads .section-head p:not(.section-label)",
    text:
      "The 2D and 3D portable packages are available on GitHub Releases. Download the package, unzip it, and run the application directly without installation.",
  },
  { selector: ".download-row:nth-child(1) strong", text: "MotionLab 2D Workbench Portable Package" },
  {
    selector: ".download-row:nth-child(1) span",
    text: "Uploaded to GitHub Releases. Download and unzip to run directly.",
  },
  { selector: ".download-row:nth-child(2) strong", text: "MotionLab 3D Workbench Portable Package" },
  {
    selector: ".download-row:nth-child(2) span",
    text: "Uploaded to GitHub Releases. Download and unzip to run directly.",
  },
  { selector: ".download-row:nth-child(3) strong", text: "Source Package And Open Materials" },
  {
    selector: ".download-row:nth-child(3) span",
    text: "Currently marked as not public. The download link will be added after the official release.",
  },
  { selector: ".download-row:nth-child(3) .button", text: "Not Public" },
  { selector: ".download-row:nth-child(4) strong", text: "Demo Videos And Sample Data" },
  {
    selector: ".download-row:nth-child(4) span",
    text: "A placeholder for later video demonstrations, sample CSV files, and teaching examples.",
  },
  { selector: ".download-row:nth-child(4) .button", text: "Pending" },
  { selector: ".references .section-head .section-label", text: "Technical References" },
  { selector: ".references .section-head h2", text: "Technical Reference Sources" },
  {
    selector: ".references > p",
    text:
      "The technical notes are based on concepts from older Tracker resources and DLTdv8 references. MotionLab reorganizes those ideas into a compact teaching workflow for 2D and 3D video tracking, with references preserved for later expansion.",
  },
  {
    selector: ".reference-list li:nth-child(1) span",
    text: "Open Source Physics / Tracker official documentation and project overview.",
  },
  {
    selector: ".reference-list li:nth-child(2) span",
    text: "Tracker getting-started workflow, including video import, calibration, tracking, and export.",
  },
  {
    selector: ".reference-list li:nth-child(3) span",
    text: "Tracker open-source project and implementation resources under the Open Source Physics framework.",
  },
  {
    selector: ".reference-list li:nth-child(4) span",
    text: "DLTdv8 reference for DLT coefficients, 2D/3D DLT calibration, and multi-view reconstruction.",
  },
  { selector: ".author-preview .section-label", text: "About The Author" },
  { selector: ".author-preview h2", text: "Teacher Chang-Yi Jiang" },
  {
    selector: ".author-preview p:not(.section-label)",
    text:
      "A physics educator focused on high-school physics teaching, inquiry-based practice, physics competition mentoring, physics simulations, and MotionLab video-tracking tools for classroom and research use.",
  },
  { selector: ".author-preview .button", text: "View Full Author Profile" },
  { selector: ".site-footer span:nth-child(2)", text: "Technical documentation site draft" },
];

const authorTranslations = [
  { selector: ".author-summary .section-label", text: "Author Information" },
  { selector: ".author-summary h1", text: "Teacher Chang-Yi Jiang" },
  {
    selector: ".author-lead",
    text:
      "A physics educator dedicated to high-school physics teaching, inquiry-based practice, science fair mentoring, and physics competitions. MotionLab turns video tracking, data visualization, and physics modeling into classroom-ready tools so students can study motion, mechanics, and 3D trajectory data from real footage.",
  },
  { selector: ".tag-list", attrs: { "aria-label": "Expertise tags" } },
  { selector: ".tag-list span:nth-child(1)", text: "Physics Education" },
  { selector: ".tag-list span:nth-child(2)", text: "Motion Analysis" },
  { selector: ".tag-list span:nth-child(3)", text: "Inquiry And Practice" },
  { selector: ".tag-list span:nth-child(4)", text: "Physics Simulation" },
  { selector: ".author-contact-card", attrs: { "aria-label": "Author contact information" } },
  { selector: ".profile-name span", text: "MotionLab / AI Physics Teacher" },
  { selector: ".education-card .section-label", text: "Education" },
  { selector: ".education-card h2", text: "Education" },
  { selector: ".education-card li:nth-child(1)", text: "B.S., Department of Physics, National Changhua University of Education" },
  { selector: ".education-card li:nth-child(2)", text: "M.S., Graduate Institute of Physics, National Changhua University of Education" },
  { selector: ".education-card li:nth-child(3)", text: "Doctoral student, Graduate Institute of Science Education, National Taiwan Normal University" },
  { selector: ".experience-card .section-label", text: "Teaching Experience" },
  { selector: ".experience-card h2", text: "Experience" },
  { selector: ".experience-card li:nth-child(1)", text: "One year as a full-time substitute physics teacher at National Chung Hsing Senior High School" },
  { selector: ".experience-card li:nth-child(2)", text: "Five years as a full-time physics teacher at Mingdao High School" },
  { selector: ".achievement-card .section-label", text: "Mentoring" },
  { selector: ".achievement-card h2", text: "Mentoring And Competition Highlights" },
  { selector: ".achievement-item:nth-child(1) strong", text: "15 projects" },
  { selector: ".achievement-item:nth-child(1) span", text: "High-school science fair projects mentored" },
  { selector: ".achievement-item:nth-child(2) strong", text: "2 projects" },
  { selector: ".achievement-item:nth-child(2) span", text: "Third place in Taichung Astronomy and Physics science fair category" },
  { selector: ".achievement-item:nth-child(3) strong", text: "3 projects" },
  { selector: ".achievement-item:nth-child(3) span", text: "Honorable mentions in Taichung Astronomy and Physics science fair category" },
  { selector: ".achievement-item:nth-child(4) strong", text: "TYPT" },
  { selector: ".achievement-item:nth-child(4) span", text: "Taiwan Young Physicists' Tournament: 2 gold medals, 3 bronze medals, and 3 individual awards" },
  { selector: ".achievement-item:nth-child(5) strong", text: "4 students" },
  { selector: ".achievement-item:nth-child(5) span", text: "Advanced to the national physics academic ability competition" },
  { selector: ".achievement-item:nth-child(6) strong", text: "4 medals" },
  { selector: ".achievement-item:nth-child(6) span", text: "Inquiry and practice competition: 2 gold medals and 2 bronze medals" },
  { selector: ".project-card .section-label", text: "MotionLab Project" },
  { selector: ".project-card h2", text: "MotionLab Project" },
  {
    selector: ".project-card p:nth-of-type(2)",
    text:
      "MotionLab 2D / 3D Tracker is a video analysis tool designed for physics classes, inquiry-based practice, and science fair research. The project combines older Tracker resources, DLTdv8-related concepts, and classroom workflow needs to support calibration, tracking, graph review, data export, and 3D trajectory analysis.",
  },
  {
    selector: ".project-card p:nth-of-type(3)",
    text:
      "The current 2D and 3D portable packages are available on GitHub Releases. Source materials and the source package remain private for now and will be released after they are organized.",
  },
  { selector: ".project-card .button", text: "View MotionLab Releases" },
  { selector: ".research-card .section-label", text: "Research And Works" },
  { selector: ".research-card h2", text: "Research And Works" },
  {
    selector: ".publication-list li:nth-child(1) span",
    text: "Chang-Yi Jiang. (2016). The Secrets and Techniques of Swinging. Chinese Physics, 17(2), 25-32.",
  },
  {
    selector: ".publication-list li:nth-child(2) a",
    text: "Master's thesis: Conceptual Difficulties And Instructional Effects Of Friction",
  },
  {
    selector: ".publication-list li:nth-child(3) a",
    text: "Physics Bimonthly: Revealing The Secrets Of Polarized Light And Color",
  },
  {
    selector: ".publication-list li:nth-child(4) a",
    text: "Physics Bimonthly column: Physics Inquiry And Practice: Online Simulation",
  },
  { selector: ".publication-list li:nth-child(5) > span", text: "Physics Simulations: High School And Competition Physics" },
  { selector: ".publication-links a:nth-child(1)", text: "High School Physics Simulations" },
  { selector: ".publication-links a:nth-child(2)", text: "Competition Physics Simulations" },
  { selector: ".author-footer-actions .button.primary", text: "Back To Guide" },
  { selector: ".author-footer-actions .copy-email", text: "Copy Email" },
  { selector: ".site-footer span:nth-child(2)", text: "Author profile" },
];

const translations = commonTranslations.concat(isAuthorPage ? authorTranslations : indexTranslations);
const originals = [];
const originalTitle = document.title;

function setActiveNav() {
  const current = sections
    .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }))
    .filter((item) => item.top <= 120)
    .pop();

  navLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", Boolean(current && target === current.id));
  });
}

function captureOriginals() {
  translations.forEach((entry, entryIndex) => {
    originals[entryIndex] = Array.from(document.querySelectorAll(entry.selector)).map((element) => {
      const attrs = {};

      Object.keys(entry.attrs || {}).forEach((name) => {
        attrs[name] = element.getAttribute(name);
      });

      return {
        html: element.innerHTML,
        text: element.textContent,
        attrs,
      };
    });
  });
}

function applyLanguage(language) {
  const isEnglish = language === "en";
  document.documentElement.lang = isEnglish ? "en" : "zh-Hant";
  document.title = isEnglish
    ? isAuthorPage
      ? "Author Information | MotionLab Tracker Guide"
      : "MotionLab Tracker Technical And Operation Guide"
    : originalTitle;

  translations.forEach((entry, entryIndex) => {
    Array.from(document.querySelectorAll(entry.selector)).forEach((element, elementIndex) => {
      const original = originals[entryIndex]?.[elementIndex];

      if (isEnglish) {
        if (entry.html !== undefined) {
          element.innerHTML = entry.html;
        } else if (entry.text !== undefined) {
          element.textContent = entry.text;
        }

        Object.entries(entry.attrs || {}).forEach(([name, value]) => {
          element.setAttribute(name, value);
        });
        return;
      }

      if (original) {
        if (entry.html !== undefined) {
          element.innerHTML = original.html;
        } else if (entry.text !== undefined) {
          element.textContent = original.text;
        }

        Object.keys(entry.attrs || {}).forEach((name) => {
          if (original.attrs[name] === null) {
            element.removeAttribute(name);
          } else {
            element.setAttribute(name, original.attrs[name]);
          }
        });
      }
    });
  });

  if (langToggle) {
    langToggle.textContent = isEnglish ? "中" : "EN";
    langToggle.setAttribute("aria-label", isEnglish ? "切換到中文" : "Switch to English");
  }
}

function initLanguageToggle() {
  if (!langToggle) {
    return;
  }

  captureOriginals();
  const savedLanguage = readSavedLanguage();
  applyLanguage(savedLanguage);

  langToggle.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "en" ? "zh" : "en";
    saveLanguage(nextLanguage);
    applyLanguage(nextLanguage);
    setActiveNav();
  });
}

function readSavedLanguage() {
  try {
    return localStorage.getItem("motionlab-guide-language") === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

function saveLanguage(language) {
  try {
    localStorage.setItem("motionlab-guide-language", language);
  } catch {
    // The toggle still works for the current page even if file:// storage is blocked.
  }
}

function initCopyEmailButtons() {
  copyEmailButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.email;

      try {
        await copyText(email);
        button.textContent = document.documentElement.lang === "en" ? "Email copied" : "Email 已複製";
      } catch {
        button.textContent = email;
      }

      window.setTimeout(() => {
        button.textContent = document.documentElement.lang === "en" ? "Copy Email" : "複製 Email";
      }, 1800);
    });
  });
}

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", setActiveNav);
initLanguageToggle();
initCopyEmailButtons();
