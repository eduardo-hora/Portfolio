const sharedWebNote =
  "Web e UI tem sido a minha principal área de atuação recentemente. Os projetos apresentados nesta secção exploram a junção entre cor, interatividade e como cativar o olhar, com foco em criar experiências visualmente bonitas, mas diretas e minimalistas.";

const webProjects = [
  {
    url: "https://diana-coelho.github.io/Portfolio/",
    note: sharedWebNote,
  },
  {
    url: "https://franciscaolive.github.io/T1/",
    note: sharedWebNote,
  },
  {
    url: "https://joana-p-pinto.github.io/Joana-Portfolio/",
    note: sharedWebNote,
  },
];

let currentIndex = 0;
let currentCategory = null;
let galleryImages = [];
let currentGalleryIndex = 0;

function setProjectMeta(noteText = "", captionText = "") {
  const noteEl = document.getElementById("project-note");
  const captionEl = document.getElementById("project-caption");

  if (noteEl) noteEl.textContent = noteText;
  if (captionEl) captionEl.textContent = captionText;
}

function updateCategoryInfo(categoryId) {
  const webArrows = document.getElementById("webdesign-arrows");

  if (categoryId === "webdesign") {
    if (webArrows) webArrows.style.display = "flex";
    currentIndex = 0;
    window.updateProjectView();
    return;
  }

  if (webArrows) webArrows.style.display = "none";

  const categoryMeta = {
    cartazes: {
      note: 'O cartaz para mim é um exercício de síntese, "uma imagem fala mais que mil palavras". Nestes trabalhos, procuro sempre a hierarquia e a clareza da informação necessária, utilizando a cor e a tipografia como metáforas ou simbolismos ao evento ou tema do cartaz.',
    },
    editorial: {
      note: "Projetos de Editorial em fase de desenvolvimento e catalogação.",
      caption: "",
    },
    motion: {
      note: "Explorações de animação e Motion Design em fase de curadoria.",
      caption: "",
    },
  };

  const meta = categoryMeta[categoryId];
  if (meta) setProjectMeta(meta.note, meta.caption);
}

window.toggleCategory = function (categoryId) {
  const targetItem = document.getElementById(`cat-${categoryId}`);
  const categoriesList = document.getElementById("categories-list");
  if (!targetItem || !categoriesList) return;

  const isOpen = targetItem.classList.contains("open");

  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.remove("open");
  });

  const defaultInfo = document.getElementById("default-info");
  const projectInfo = document.getElementById("project-info");

  if (!isOpen) {
    categoriesList.classList.add("has-open");
    targetItem.classList.add("open");
    currentCategory = categoryId;

    if (defaultInfo) defaultInfo.style.display = "none";
    if (projectInfo) projectInfo.style.display = "grid";

    updateCategoryInfo(categoryId);
  } else {
    window.closeCategories();
  }
};

window.closeCategories = function () {
  const categoriesList = document.getElementById("categories-list");
  if (categoriesList) categoriesList.classList.remove("has-open");

  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.remove("open");
  });

  currentCategory = null;

  const defaultInfo = document.getElementById("default-info");
  const projectInfo = document.getElementById("project-info");

  if (defaultInfo) defaultInfo.style.display = "block";
  if (projectInfo) projectInfo.style.display = "none";
};

window.nextProject = function () {
  if (currentCategory !== "webdesign") return;
  currentIndex = (currentIndex + 1) % webProjects.length;
  window.updateProjectView();
};

window.prevProject = function () {
  if (currentCategory !== "webdesign") return;
  currentIndex = (currentIndex - 1 + webProjects.length) % webProjects.length;
  window.updateProjectView();
};

window.updateProjectView = function () {
  const current = webProjects[currentIndex];

  const iframe = document.getElementById("project-iframe");
  const siteUrl = document.getElementById("site-url");

  if (iframe) iframe.src = current.url;
  if (siteUrl) siteUrl.href = current.url;
  setProjectMeta(current.note, current.caption || "");
};

window.openFullscreenImage = function (index) {
  const container = document.getElementById("posters-scroll");
  if (!container) return;

  const imgs = container.querySelectorAll("img");
  galleryImages = Array.from(imgs).map((img) => img.src);
  currentGalleryIndex = index;

  window.renderFullscreenImage();

  const overlay = document.getElementById("fullscreen-overlay");
  if (overlay) overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.renderFullscreenImage = function () {
  const content = document.getElementById("fullscreen-content");
  if (!content || galleryImages.length === 0) return;

  content.innerHTML = "";
  const img = document.createElement("img");
  img.src = galleryImages[currentGalleryIndex];
  img.alt = `Cartaz ${currentGalleryIndex + 1}`;
  content.appendChild(img);
};

window.nextFullscreenImage = function () {
  if (galleryImages.length === 0) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  window.renderFullscreenImage();
};

window.prevFullscreenImage = function () {
  if (galleryImages.length === 0) return;
  currentGalleryIndex =
    (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  window.renderFullscreenImage();
};

window.closeFullscreen = function () {
  const overlay = document.getElementById("fullscreen-overlay");
  if (overlay) overlay.style.display = "none";
  document.body.style.overflow = "auto";
};

document.addEventListener("keydown", function (e) {
  const overlay = document.getElementById("fullscreen-overlay");
  if (overlay && overlay.style.display === "flex") {
    if (e.key === "ArrowRight") {
      window.nextFullscreenImage();
    } else if (e.key === "ArrowLeft") {
      window.prevFullscreenImage();
    } else if (e.key === "Escape") {
      window.closeFullscreen();
    }
  }
});
