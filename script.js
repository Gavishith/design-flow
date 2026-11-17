const STORAGE_KEY = "designflow-cse326-v1";
const catalog = [
  { id: "oak", category: "Flooring", name: "White oak", finish: "Matte oil", durability: "High", price: "₹2,400 / sq ft", tone: "#c9a36a", note: "Warm grain that hides everyday wear." },
  { id: "stone", category: "Flooring", name: "Limestone", finish: "Honed", durability: "High", price: "₹3,100 / sq ft", tone: "#d9d2c5", note: "Cool and quiet underfoot in larger rooms." },
  { id: "limewash", category: "Walls", name: "Limewash clay", finish: "Soft matte", durability: "Medium", price: "₹180 / sq ft", tone: "#e7d7c4", note: "A cloudy plaster look that takes light well." },
  { id: "sage", category: "Walls", name: "Olive plaster", finish: "Mineral paint", durability: "Medium", price: "₹160 / sq ft", tone: "#7e8f78", note: "A muted green that pairs with timber." },
  { id: "linen", category: "Upholstery", name: "Natural linen", finish: "Woven", durability: "Medium", price: "₹1,450 / m", tone: "#efe6d6", note: "Breathable and easy to live with." },
  { id: "velvet", category: "Upholstery", name: "Rust velvet", finish: "Cut pile", durability: "Medium", price: "₹2,200 / m", tone: "#8d3b28", note: "A deeper seat color for lounge schemes." },
  { id: "brass", category: "Metal", name: "Brushed brass", finish: "Satin", durability: "High", price: "₹6,800 / set", tone: "#c6a15b", note: "Warm hardware that ages gently." },
  { id: "iron", category: "Metal", name: "Blackened iron", finish: "Waxed", durability: "High", price: "₹5,400 / set", tone: "#2a2724", note: "A darker line for frames and lamps." },
  { id: "travertine", category: "Stone", name: "Travertine", finish: "Filled and honed", durability: "High", price: "₹4,200 / sq ft", tone: "#e5d3b8", note: "Soft veining for counters and hearths." },
  { id: "terrazzo", category: "Stone", name: "Clay terrazzo", finish: "Polished", durability: "High", price: "₹3,600 / sq ft", tone: "#c98b6a", note: "Speckled surface that ties mixed palettes together." }
];
const seed = () => ({
  projects: [
    { id: "p1", name: "Harbor House living room", client: "Maya Chen", type: "Residential", brief: "A quieter lounge with low seating, warm timber, and one strong art wall.", status: "In review" },
    { id: "p2", name: "Atelier North identity", client: "Atelier North", type: "Brand", brief: "A studio identity that can live on print, signage, and a small showroom.", status: "In review" },
    { id: "p3", name: "Cedar & Co cafe", client: "Cedar & Co", type: "Hospitality", brief: "A morning cafe: pale stone, olive banquettes, and brass at the counter.", status: "Changes requested" }
  ],
  designs: [
    { id: "d1", projectId: "p1", title: "Warm oak lounge", concept: "Low linen sofa, oak floor, and a single brass lamp.", style: "Modern warm", status: "pending", layout: "lounge", colors: ["#c9a36a", "#efe6d6", "#243f33", "#1c1915"] },
    { id: "d2", projectId: "p1", title: "Clay gallery wall", concept: "Limewash walls, a long art ledge, and darker seating.", style: "Gallery calm", status: "changes", layout: "lounge", colors: ["#e7d7c4", "#8d3b28", "#d9d2c5", "#2a2724"] },
    { id: "d3", projectId: "p2", title: "Wordmark in olive", concept: "A serif wordmark with an olive field and brass rule.", style: "Editorial", status: "pending", layout: "brand", colors: ["#243f33", "#f3eee6", "#c6a15b", "#1c1915"] },
    { id: "d4", projectId: "p2", title: "Stamp and grid", concept: "A compact stamp logo set on a stone-colored grid.", style: "Structured", status: "approved", layout: "brand", colors: ["#e5d3b8", "#1c1915", "#c24d1d", "#fffdf9"] },
    { id: "d5", projectId: "p3", title: "Morning counter", concept: "Travertine counter, olive banquette, brass taps.", style: "Cafe daylight", status: "pending", layout: "cafe", colors: ["#e5d3b8", "#7e8f78", "#c6a15b", "#f6f1ea"] },
    { id: "d6", projectId: "p3", title: "Night service", concept: "Blackened iron, rust velvet, and a lower light level.", style: "Evening", status: "rejected", layout: "cafe", colors: ["#2a2724", "#8d3b28", "#c9a36a", "#1c1915"] }
  ],
  selections: { p1: { Flooring: "oak", Walls: "limewash", Upholstery: "linen", Metal: "brass" }, p2: { Stone: "travertine", Metal: "brass" }, p3: { Flooring: "stone", Upholstery: "velvet", Metal: "brass", Stone: "travertine" } },
  pins: [],
  feedback: [
    { id: "f1", projectId: "p1", designId: "d2", author: "Maya Chen", message: "The clay wall is right, but the sofa reads too dark for afternoon light.", at: "2026-11-12T10:30:00" },
    { id: "f2", projectId: "p3", designId: "d5", author: "Cedar & Co", message: "Keep the brass, and show a second banquette fabric that is easier to clean.", at: "2026-11-14T16:10:00" }
  ],
  activity: [
    { text: "Maya Chen asked for a lighter sofa on Clay gallery wall.", at: "2026-11-12T10:30:00" },
    { text: "Stamp and grid was approved for Atelier North.", at: "2026-11-10T09:00:00" },
    { text: "Night service was rejected for Cedar & Co cafe.", at: "2026-11-08T18:20:00" }
  ]
});
let state = load();
let materialCategory = "Flooring";
let galleryFilter = "all";
let approvalFilter = "all";
const $ = (sel) => document.querySelector(sel);
const pages = {
  overview: "Overview",
  rooms: "Project Rooms",
  designs: "Design Options",
  materials: "Materials",
  gallery: "Gallery",
  feedback: "Feedback",
  approvals: "Approvals"
};
function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) { /* keep the starter data if storage is blocked */ }
  return seed();
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function uid(prefix) {
  return prefix + Math.random().toString(36).slice(2, 8);
}
function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
function projectById(id) {
  return state.projects.find((item) => item.id === id);
}
function designsFor(projectId) {
  return state.designs.filter((item) => item.projectId === projectId);
}
function statusLabel(status) {
  return { pending: "In review", approved: "Approved", rejected: "Rejected", changes: "Changes requested" }[status] || status;
}
function badge(status) {
  const kind = status === "Approved" || status === "approved" ? "approved"
    : status === "Rejected" || status === "rejected" ? "rejected"
    : status === "Changes requested" || status === "changes" ? "changes" : "quiet";
  const label = statusLabel(status);
  return `<span class="badge ${kind}">${esc(label)}</span>`;
}

function formatWhen(iso) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => node.classList.remove("show"), 2400);
}
function logActivity(text) {
  state.activity.unshift({ text, at: new Date().toISOString() });
  state.activity = state.activity.slice(0, 12);
}
function refreshProjectStatus(projectId) {
  const designs = designsFor(projectId);
  const project = projectById(projectId);
  if (!project || !designs.length) return;
  if (designs.some((item) => item.status === "changes")) project.status = "Changes requested";
  else if (designs.every((item) => item.status === "approved" || item.status === "rejected") && designs.some((item) => item.status === "approved")) project.status = "Approved";
  else project.status = "In review";
}
function board(design) {
  const [c1, c2, c3, c4] = design.colors;
  if (design.layout === "brand") {
    return `<div class="board" style="background:${c1}"><div class="board-mark" style="left:14%;top:28%;right:14%;height:8px;background:${c3}"></div><div class="board-mark" style="left:14%;top:40%;width:46%;height:18px;background:${c2}"></div><div class="board-mark" style="left:14%;top:64%;width:28%;height:8px;background:${c4}"></div></div>`;
  }
  if (design.layout === "cafe") {
    return `<div class="board" style="background:${c4}"><div class="board-floor" style="background:${c1}"></div><div class="board-block" style="left:8%;bottom:18%;width:46%;height:38%;background:${c2}"></div><div class="board-block" style="right:8%;bottom:18%;width:28%;height:52%;background:${c3}"></div></div>`;
  }
  return `<div class="board" style="background:${c2}"><div class="board-floor" style="background:${c1}"></div><div class="board-block" style="left:10%;bottom:16%;width:52%;height:34%;background:${c3}"></div><div class="board-art" style="left:18%;top:16%;width:28%;height:28%;background:${c4}"></div><div class="board-lamp" style="right:18%;top:12%;bottom:30%;background:${design.colors[0]}"></div></div>`;
}
function showPage(name) {
  document.querySelectorAll(".page").forEach((page) => page.classList.toggle("active", page.id === "page-" + name));
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.page === name));
  $("#crumbLabel").textContent = pages[name];
  $("#sidebar").classList.remove("open");
  if (name === "feedback") fillFeedbackSelects();
  render();
}
function render() {
  const pending = state.designs.filter((item) => item.status === "pending" || item.status === "changes").length;
  $("#pendingCount").textContent = pending;
  renderOverview();
  renderRooms();
  renderDesigns();
  renderMaterials();
  renderGallery();
  renderFeedback();
  renderApprovals();
}
function renderOverview() {
  const counts = {
    rooms: state.projects.length,
    pending: state.designs.filter((item) => item.status === "pending").length,
    approved: state.designs.filter((item) => item.status === "approved").length,
    changes: state.designs.filter((item) => item.status === "changes").length
  };
  $("#stats").innerHTML = [
    ["Project rooms", counts.rooms, "Open client spaces"],
    ["Awaiting review", counts.pending, "Designs with no decision"],
    ["Approved", counts.approved, "Signed off by the client"],
    ["Changes requested", counts.changes, "Need another pass"]
  ].map(([label, value, note]) => `<article class="stat"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("");

  $("#overviewRooms").innerHTML = state.projects.map((project) => `
    <button class="room-card" data-open-room="${project.id}">
      <p class="kicker">${esc(project.type)} · ${esc(project.client)}</p>
      <h3>${esc(project.name)}</h3>
      <p class="meta">${designsFor(project.id).length} design options · ${badge(project.status)}</p>
    </button>`).join("");
  $("#overviewActivity").innerHTML = state.activity.slice(0, 6).map((item) => `
    <article class="note"><p>${esc(item.text)}</p><p class="meta">${formatWhen(item.at)}</p></article>`).join("") || `<p class="empty">No activity yet.</p>`;
}
function renderRooms() {
  const query = $("#roomSearch").value.trim().toLowerCase();
  const filter = $("#roomFilter").value;
  const rooms = state.projects.filter((project) => {
    const hay = (project.name + " " + project.client).toLowerCase();
    return hay.includes(query) && (filter === "all" || project.status === filter);
  });
  $("#roomGrid").innerHTML = rooms.map((project) => `
    <article class="room-card" data-open-room="${project.id}">
      <p class="kicker">${esc(project.type)}</p>
      <h3>${esc(project.name)}</h3>
      <p class="meta">${esc(project.client)}</p>
      <p>${esc(project.brief)}</p>
      <p class="meta">${designsFor(project.id).length} options · ${badge(project.status)}</p>
    </article>`).join("") || `<p class="empty">No rooms match that search.</p>`;
}
function projectOptions(selected = "all") {
  return `<option value="all">All projects</option>` + state.projects.map((project) => `<option value="${project.id}" ${project.id === selected ? "selected" : ""}>${esc(project.name)}</option>`).join("");
}
function renderDesigns() {
  const select = $("#designProject");
  const current = select.value || "all";
  select.innerHTML = projectOptions(current);
  const query = $("#designSearch").value.trim().toLowerCase();
  const designs = state.designs.filter((design) => {
    const project = projectById(design.projectId);
    const hay = (design.title + " " + design.concept + " " + project.name).toLowerCase();
    return hay.includes(query) && (select.value === "all" || design.projectId === select.value);
  });
  $("#designGrid").innerHTML = designs.map((design) => {
    const project = projectById(design.projectId);
    return `<article class="design-card">
      ${board(design)}
      <p class="kicker">${esc(project.name)}</p>
      <h3>${esc(design.title)}</h3>
      <p>${esc(design.concept)}</p>
      <p class="meta">${esc(design.style)} · ${badge(design.status)}</p>
      <div class="btn-row">
        <button class="btn btn-line" data-preview="${design.id}">Open preview</button>
        <button class="btn btn-good" data-decide="${design.id}" data-status="approved">Approve</button>
        <button class="btn btn-bad" data-decide="${design.id}" data-status="rejected">Reject</button>
      </div>
    </article>`;
  }).join("") || `<p class="empty">No design options match.</p>`;
}
function renderMaterials() {
  const select = $("#materialProject");
  const current = select.value || state.projects[0].id;
  select.innerHTML = state.projects.map((project) => `<option value="${project.id}" ${project.id === current ? "selected" : ""}>${esc(project.name)}</option>`).join("");
  const categories = [...new Set(catalog.map((item) => item.category))];
  if (!categories.includes(materialCategory)) materialCategory = categories[0];
  $("#materialCats").innerHTML = categories.map((category) => `<button class="chip ${category === materialCategory ? "active" : ""}" data-cat="${esc(category)}">${esc(category)}</button>`).join("");
  const chosen = (state.selections[select.value] || {})[materialCategory];
  $("#materialGrid").innerHTML = catalog.filter((item) => item.category === materialCategory).map((item) => `
    <article class="swatch ${item.id === chosen ? "selected" : ""} ${state.pins.includes(item.id) ? "pinned" : ""}">
      <div class="swatch-chip" style="background:${item.tone}"></div>
      <h3>${esc(item.name)}</h3>
      <p class="meta">${esc(item.finish)} · ${esc(item.price)}</p>
      <p>${esc(item.note)}</p>
      <div class="btn-row">
        <button class="btn btn-line" data-choose="${item.id}">Use in room</button>
        <button class="btn btn-ghost" data-pin="${item.id}">${state.pins.includes(item.id) ? "Unpin" : "Pin to compare"}</button>
      </div>
    </article>`).join("");
  renderCompare();
}

function renderCompare() {
  const pinned = state.pins.map((id) => catalog.find((item) => item.id === id)).filter(Boolean);
  if (pinned.length < 2) {
    $("#compareHint").textContent = pinned.length === 1 ? "Pin one more material to compare." : "Pin two materials to see them side by side.";
    $("#compareTable").innerHTML = "";
    return;
  }
  const [a, b] = pinned;
  $("#compareHint").textContent = `${a.name} and ${b.name}`;
  const rows = ["category", "finish", "durability", "price", "note"];
  const labels = { category: "Category", finish: "Finish", durability: "Durability", price: "Cost", note: "Note" };
  $("#compareTable").innerHTML = `<table class="compare-table"><thead><tr><th></th><th>${esc(a.name)}</th><th>${esc(b.name)}</th></tr></thead><tbody>
    ${rows.map((key) => `<tr><th>${labels[key]}</th><td>${esc(a[key])}</td><td>${esc(b[key])}</td></tr>`).join("")}
  </tbody></table>`;
}
function renderGallery() {
  const filters = [{ id: "all", name: "All rooms" }, ...state.projects.map((project) => ({ id: project.id, name: project.name }))];
  $("#galleryFilters").innerHTML = filters.map((item) => `<button class="chip ${galleryFilter === item.id ? "active" : ""}" data-gallery="${item.id}">${esc(item.name)}</button>`).join("");
  const designs = state.designs.filter((design) => galleryFilter === "all" || design.projectId === galleryFilter);
  $("#galleryGrid").innerHTML = designs.map((design) => `
    <button class="gallery-card" data-preview="${design.id}">
      ${board(design)}
      <figcaption><strong>${esc(design.title)}</strong><p class="meta">${esc(projectById(design.projectId).name)} · ${badge(design.status)}</p></figcaption>
    </button>`).join("") || `<p class="empty">This room has no previews yet.</p>`;
}
function renderFeedback() {
  const notes = [...state.feedback].sort((a, b) => b.at.localeCompare(a.at));
  $("#feedbackList").innerHTML = notes.map((note) => {
    const project = projectById(note.projectId);
    const design = state.designs.find((item) => item.id === note.designId);
    return `<article class="note"><p class="kicker">${esc(note.author)} · ${esc(project ? project.name : "Project")}${design ? " · " + esc(design.title) : ""}</p><p>${esc(note.message)}</p><p class="meta">${formatWhen(note.at)}</p></article>`;
  }).join("") || `<p class="empty">No feedback yet.</p>`;
}
function renderApprovals() {
  const filters = ["all", "pending", "changes", "approved", "rejected"];
  const labels = { all: "All", pending: "In review", changes: "Changes", approved: "Approved", rejected: "Rejected" };
  $("#approvalFilters").innerHTML = filters.map((item) => `<button class="chip ${approvalFilter === item ? "active" : ""}" data-approval="${item}">${labels[item]}</button>`).join("");
  const designs = state.designs.filter((design) => approvalFilter === "all" || design.status === approvalFilter);
  $("#approvalList").innerHTML = designs.map((design) => {
    const project = projectById(design.projectId);
    return `<article class="decision">
      <p class="kicker">${esc(project.name)} · ${esc(design.style)}</p>
      <h3>${esc(design.title)}</h3>
      <p>${esc(design.concept)}</p>
      <p class="meta">${badge(design.status)}</p>
      <div class="btn-row">
        <button class="btn btn-good" data-decide="${design.id}" data-status="approved">Approve</button>
        <button class="btn btn-warn" data-decide="${design.id}" data-status="changes">Request changes</button>
        <button class="btn btn-bad" data-decide="${design.id}" data-status="rejected">Reject</button>
      </div>
    </article>`;
  }).join("") || `<p class="empty">Nothing in this filter.</p>`;
}
function fillFeedbackSelects() {
  const projectSelect = $("#feedbackProject");
  const previous = projectSelect.value || state.projects[0].id;
  projectSelect.innerHTML = state.projects.map((project) => `<option value="${project.id}">${esc(project.name)}</option>`).join("");
  projectSelect.value = state.projects.some((project) => project.id === previous) ? previous : state.projects[0].id;
  fillDesignSelect(projectSelect.value);
}
function fillDesignSelect(projectId) {
  const select = $("#feedbackDesign");
  const current = select.value;
  select.innerHTML = `<option value="">General note</option>` + designsFor(projectId).map((design) => `<option value="${design.id}">${esc(design.title)}</option>`).join("");
  if ([...select.options].some((option) => option.value === current)) select.value = current;
}

function decide(id, status) {
  const design = state.designs.find((item) => item.id === id);
  if (!design) return;
  design.status = status;
  refreshProjectStatus(design.projectId);
  const verb = { approved: "approved", rejected: "rejected", changes: "requested changes on" }[status];
  logActivity(`${verb[0].toUpperCase() + verb.slice(1)} ${design.title}.`);
  save();
  render();
  toast(`${design.title} · ${statusLabel(status)}`);
  const light = $("#lightbox");
  if (!light.hidden && light.dataset.id === id) openPreview(id);
}
function openPreview(id) {
  const design = state.designs.find((item) => item.id === id);
  const project = projectById(design.projectId);
  const notes = state.feedback.filter((note) => note.designId === id);
  $("#lightTitle").textContent = design.title;
  $("#lightbox").dataset.id = id;
  $("#lightBody").innerHTML = `
    <div>${board(design)}
      <div class="palette">${design.colors.map((color) => `<i style="background:${color}"></i>`).join("")}</div>
    </div>
    <div>
      <p class="kicker">${esc(project.name)} · ${esc(project.client)}</p>
      <p>${esc(design.concept)}</p>
      <p class="meta">${esc(design.style)} · ${badge(design.status)}</p>
      <div class="btn-row">
        <button class="btn btn-good" data-decide="${design.id}" data-status="approved">Approve</button>
        <button class="btn btn-warn" data-decide="${design.id}" data-status="changes">Request changes</button>
        <button class="btn btn-bad" data-decide="${design.id}" data-status="rejected">Reject</button>
      </div>
      <h3 style="margin-top:18px">Client notes</h3>
      ${notes.map((note) => `<article class="note"><p>${esc(note.message)}</p><p class="meta">${esc(note.author)}</p></article>`).join("") || `<p class="empty">No notes on this design yet. Add one from Feedback.</p>`}
    </div>`;
  $("#lightbox").hidden = false;
}
function openModal(title, fieldsHtml, onSubmit) {
  $("#modalTitle").textContent = title;
  $("#modalForm").innerHTML = fieldsHtml + `<div class="btn-row"><button class="btn btn-primary" type="submit">Save</button></div>`;
  $("#backdrop").hidden = false;
  $("#modalForm").onsubmit = (event) => {
    event.preventDefault();
    onSubmit(new FormData(event.target));
    $("#backdrop").hidden = true;
  };
}
function openRoomModal() {
  openModal("New project room", `
    <label class="field">Room name<input name="name" required maxlength="60" placeholder="Riverside apartment"></label>
    <label class="field">Client<input name="client" required maxlength="40" placeholder="Client name"></label>
    <label class="field">Type<select name="type"><option>Residential</option><option>Brand</option><option>Hospitality</option><option>Workplace</option></select></label>
    <label class="field">Brief<textarea name="brief" required maxlength="220" rows="3" placeholder="What should this room decide?"></textarea></label>
  `, (data) => {
    state.projects.unshift({
      id: uid("p"),
      name: data.get("name").trim(),
      client: data.get("client").trim(),
      type: data.get("type"),
      brief: data.get("brief").trim(),
      status: "In review"
    });
    logActivity(`Opened project room ${data.get("name").trim()}.`);
    save();
    render();
    toast("Project room created");
  });
}

function openDesignModal() {
  openModal("Add design option", `
    <label class="field">Project room<select name="projectId">${state.projects.map((project) => `<option value="${project.id}">${esc(project.name)}</option>`).join("")}</select></label>
    <label class="field">Title<input name="title" required maxlength="50" placeholder="Courtyard scheme"></label>
    <label class="field">Style<input name="style" required maxlength="40" placeholder="Quiet modern"></label>
    <label class="field">Concept<textarea name="concept" required maxlength="220" rows="3" placeholder="What makes this option different?"></textarea></label>
    <label class="field">Preview type<select name="layout"><option value="lounge">Room</option><option value="brand">Identity</option><option value="cafe">Hospitality</option></select></label>
  `, (data) => {
    const palettes = {
      lounge: ["#c9a36a", "#efe6d6", "#243f33", "#1c1915"],
      brand: ["#243f33", "#f3eee6", "#c24d1d", "#1c1915"],
      cafe: ["#e5d3b8", "#7e8f78", "#c6a15b", "#f6f1ea"]
    };
    const layout = data.get("layout");
    state.designs.unshift({
      id: uid("d"),
      projectId: data.get("projectId"),
      title: data.get("title").trim(),
      concept: data.get("concept").trim(),
      style: data.get("style").trim(),
      status: "pending",
      layout,
      colors: palettes[layout]
    });
    refreshProjectStatus(data.get("projectId"));
    logActivity(`Added design option ${data.get("title").trim()}.`);
    save();
    render();
    toast("Design option added");
  });
}
function bind() {
  document.body.addEventListener("click", (event) => {
    const page = event.target.closest("[data-page]");
    if (page) { showPage(page.dataset.page); return; }
    const room = event.target.closest("[data-open-room]");
    if (room) {
      $("#designProject").value = room.dataset.openRoom;
      galleryFilter = room.dataset.openRoom;
      showPage("designs");
      return;
    }
    const preview = event.target.closest("[data-preview]");
    if (preview) { openPreview(preview.dataset.preview); return; }
    const decision = event.target.closest("[data-decide]");
    if (decision) { decide(decision.dataset.decide, decision.dataset.status); return; }
    const cat = event.target.closest("[data-cat]");
    if (cat) { materialCategory = cat.dataset.cat; renderMaterials(); return; }
    const choose = event.target.closest("[data-choose]");
    if (choose) {
      const projectId = $("#materialProject").value;
      state.selections[projectId] = state.selections[projectId] || {};
      state.selections[projectId][materialCategory] = choose.dataset.choose;
      const material = catalog.find((item) => item.id === choose.dataset.choose);
      logActivity(`Selected ${material.name} for ${projectById(projectId).name}.`);
      save();
      renderMaterials();
      toast(`${material.name} saved to the room`);
      return;
    }
    const pin = event.target.closest("[data-pin]");
    if (pin) {
      const id = pin.dataset.pin;
      if (state.pins.includes(id)) state.pins = state.pins.filter((item) => item !== id);
      else {
        state.pins.push(id);
        state.pins = state.pins.slice(-2);
      }
      save();
      renderMaterials();
      return;
    }
    const gallery = event.target.closest("[data-gallery]");
    if (gallery) { galleryFilter = gallery.dataset.gallery; renderGallery(); return; }
    const approval = event.target.closest("[data-approval]");
    if (approval) { approvalFilter = approval.dataset.approval; renderApprovals(); }
    const action = event.target.closest("[data-action]");
    if (action && action.dataset.action === "new-room") openRoomModal();
    if (action && action.dataset.action === "new-design") openDesignModal();
  });
  $("#roomSearch").addEventListener("input", renderRooms);
  $("#roomFilter").addEventListener("change", renderRooms);
  $("#designSearch").addEventListener("input", renderDesigns);
  $("#designProject").addEventListener("change", renderDesigns);
  $("#materialProject").addEventListener("change", renderMaterials);
  $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#closeModal").addEventListener("click", () => { $("#backdrop").hidden = true; });
  $("#closeLight").addEventListener("click", () => { $("#lightbox").hidden = true; });
  $("#backdrop").addEventListener("click", (event) => { if (event.target.id === "backdrop") $("#backdrop").hidden = true; });
  $("#lightbox").addEventListener("click", (event) => { if (event.target.id === "lightbox") $("#lightbox").hidden = true; });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { $("#backdrop").hidden = true; $("#lightbox").hidden = true; }
  });

    $("#feedbackProject").addEventListener("change", (event) => fillDesignSelect(event.target.value));
  $("#feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const note = {
      id: uid("f"),
      projectId: data.get("projectId"),
      designId: data.get("designId"),
      author: data.get("author").trim(),
      message: data.get("message").trim(),
      at: new Date().toISOString()
    };
    state.feedback.unshift(note);
    const design = state.designs.find((item) => item.id === note.designId);
    logActivity(`${note.author} left feedback${design ? " on " + design.title : ""}.`);
    save();
    event.target.reset();
    fillFeedbackSelects();
    render();
    toast("Feedback saved");
  });
}
$("#todayLabel").textContent = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
bind();
fillFeedbackSelects();
render();
