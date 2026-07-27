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

const sharedEditorialNote =
  "Aqui apresento projetos Editoriais com grande foco no suporte físico e na sua valorização. Eu gosto bastante de organizar estes <strong>grandes corpos de texto</strong> através de uma <strong>composição</strong> interessante e de tipografia chamativa, considerando a experiência tátil, e como a <strong>textura do papel</strong> afetaria o livro.";

const editorialProjects = [
  {
    id: "strike",
    note: sharedEditorialNote,
    images: [
      "src/assets/projects/editorial/strike/1.jpg",
      "src/assets/projects/editorial/strike/2.jpg",
      "src/assets/projects/editorial/strike/3.jpg",
    ],
  },
  {
    id: "torsos",
    note: sharedEditorialNote,
    images: [
      "src/assets/projects/editorial/torsos/1.jpg",
      "src/assets/projects/editorial/torsos/2.jpg",
      "src/assets/projects/editorial/torsos/3.jpg",
    ],
  },
  {
    id: "180",
    note: sharedEditorialNote,
    images: [
      "src/assets/projects/editorial/180/1.jpg",
      "src/assets/projects/editorial/180/2.jpg",
      "src/assets/projects/editorial/180/3.jpg",
    ],
  },
];

const sharedMotionNote =
  "Esta é sem duvida a vertente mais recente no meu percurso, onde o que me chama a atenção é o movimento e as animações. Apresento aqui os meus primeiro projetos de exploração dinâmica, aplicando conceitos de ritmo e animação ao design gráfico.";

const categoryMeta = {
  cartazes: {
    note: 'O cartaz para mim é um exercício de síntese, "uma imagem fala mais que mil palavras". Nestes trabalhos, procuro sempre a hierarquia e a clareza da informação necessária, utilizando a cor e a tipografia como metáforas ou simbolismos ao evento ou tema do cartaz.',
  },
  motion: {
    note: sharedMotionNote,
    caption: "",
  },
};

let currentIndex = 0;
let currentEditorialIndex = 0;
let currentCategory = null;
let galleryImages = [];
let currentGalleryIndex = 0;

function setProjectMeta(noteText = "", captionText = "") {
  const noteEl = document.getElementById("project-note");
  const captionEl = document.getElementById("project-caption");

  if (noteEl) noteEl.innerHTML = noteText;
  if (captionEl) captionEl.textContent = captionText;
}

function hideAllArrows() {
  const webArrows = document.getElementById("webdesign-arrows");
  const editorialArrows = document.getElementById("editorial-arrows");

  if (webArrows) webArrows.style.setProperty("display", "none", "important");
  if (editorialArrows)
    editorialArrows.style.setProperty("display", "none", "important");
}

function updateCategoryInfo(categoryId) {
  hideAllArrows();

  if (categoryId === "webdesign") {
    const webArrows = document.getElementById("webdesign-arrows");
    if (webArrows) webArrows.style.setProperty("display", "flex", "important");
    currentIndex = 0;
    window.updateProjectView();
    return;
  }

  if (categoryId === "editorial") {
    const editorialArrows = document.getElementById("editorial-arrows");
    if (editorialArrows)
      editorialArrows.style.setProperty("display", "flex", "important");
    currentEditorialIndex = 0;
    window.updateEditorialView();
    return;
  }

  const meta = categoryMeta[categoryId];
  if (meta) setProjectMeta(meta.note, meta.caption || "");
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
  hideAllArrows();

  const defaultInfo = document.getElementById("default-info");
  const projectInfo = document.getElementById("project-info");

  if (defaultInfo) defaultInfo.style.display = "block";
  if (projectInfo) projectInfo.style.display = "none";
};

window.nextProject = function () {
  if (currentCategory === "webdesign") {
    currentIndex = (currentIndex + 1) % webProjects.length;
    window.updateProjectView();
  } else if (currentCategory === "editorial") {
    currentEditorialIndex =
      (currentEditorialIndex + 1) % editorialProjects.length;
    window.updateEditorialView();
  }
};

window.prevProject = function () {
  if (currentCategory === "webdesign") {
    currentIndex = (currentIndex - 1 + webProjects.length) % webProjects.length;
    window.updateProjectView();
  } else if (currentCategory === "editorial") {
    currentEditorialIndex =
      (currentEditorialIndex - 1 + editorialProjects.length) %
      editorialProjects.length;
    window.updateEditorialView();
  }
};

window.updateProjectView = function () {
  const current = webProjects[currentIndex];

  const iframe = document.getElementById("project-iframe");
  const siteUrl = document.getElementById("site-url");

  if (iframe) iframe.src = current.url;
  if (siteUrl) siteUrl.href = current.url;
  setProjectMeta(current.note, current.caption || "");
};

window.updateEditorialView = function () {
  const current = editorialProjects[currentEditorialIndex];

  document
    .querySelectorAll(".editorial-scroll-container")
    .forEach((container) => {
      container.style.setProperty("display", "none", "important");
    });

  const activeContainer = document.getElementById(
    `editorial-scroll-${current.id}`,
  );
  if (activeContainer) {
    activeContainer.style.setProperty("display", "flex", "important");
  }

  setProjectMeta(current.note, "");
};

function openFullscreenGallery(containerId, index) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const imgs = container.querySelectorAll("img");
  galleryImages = Array.from(imgs).map((img) => ({
    src: img.src,
    alt: img.alt || "Imagem ampliada",
  }));
  currentGalleryIndex = index;

  window.renderFullscreenImage();

  const overlay = document.getElementById("fullscreen-overlay");
  if (overlay) overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

window.openFullscreenImage = function (index) {
  openFullscreenGallery("posters-scroll", index);
};

window.openFullscreenMotionImage = function (index) {
  openFullscreenGallery("motion-scroll", index);
};

window.openFullscreenEditorialImage = function (projectId, index) {
  openFullscreenGallery(`editorial-scroll-${projectId}`, index);
};

window.renderFullscreenImage = function () {
  const content = document.getElementById("fullscreen-content");
  if (!content || galleryImages.length === 0) return;

  content.innerHTML = "";
  const img = document.createElement("img");
  img.src = galleryImages[currentGalleryIndex].src;
  img.alt = galleryImages[currentGalleryIndex].alt;
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
