(() => {
  "use strict";
  const OWNER = "oceancarcare";
  const REPO = "website";
  const BRANCH = "main";
  const DIR = "assets/gallery";
  const MANIFEST = `${DIR}/gallery.json`;
  const API_ROOT = `https://api.github.com/repos/${OWNER}/${REPO}`;
  const MEDIA_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "gif", "mp4", "webm", "mov"]);
  const root = document.getElementById("admin-root");
  const state = { token: "", username: "", media: [], manifestSha: null, busy: false, status: "", statusType: "" };

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const extOf = (name) => String(name).split(".").pop().toLowerCase();
  const isMedia = (name) => MEDIA_EXTENSIONS.has(extOf(name));
  const mediaType = (name) => ["mp4", "webm", "mov"].includes(extOf(name)) ? "video" : "image";
  const prettyName = (name) => name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
  const apiPath = (path) => path.split("/").map(encodeURIComponent).join("/");

  async function api(path, options = {}) {
    const response = await fetch(`${API_ROOT}${path}`, {
      ...options,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${state.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });
    const result = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) throw new Error(result?.message || `GitHub API request failed (${response.status})`);
    return result;
  }

  function decodeBase64Utf8(value) {
    const binary = atob(value.replace(/\s/g, ""));
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeBase64Utf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  }

  async function fileToBase64(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
    }
    return btoa(binary);
  }

  async function readManifest() {
    try {
      const file = await api(`/contents/${apiPath(MANIFEST)}?ref=${encodeURIComponent(BRANCH)}`);
      state.manifestSha = file.sha;
      const data = JSON.parse(decodeBase64Utf8(file.content || ""));
      return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
      if (/Not Found/i.test(error.message)) {
        state.manifestSha = null;
        return [];
      }
      throw error;
    }
  }

  async function loadMedia() {
    const [directory, manifestItems] = await Promise.all([
      api(`/contents/${apiPath(DIR)}?ref=${encodeURIComponent(BRANCH)}`),
      readManifest(),
    ]);
    if (!Array.isArray(directory)) throw new Error("Gallery folder could not be read.");
    const metadata = new Map(manifestItems.map((item) => [item.name, item]));
    state.media = directory
      .filter((item) => item.type === "file" && item.name !== "gallery.json" && isMedia(item.name))
      .map((file) => {
        const record = metadata.get(file.name) || {};
        return {
          name: file.name,
          sha: file.sha,
          type: mediaType(file.name),
          description: record.description || prettyName(file.name),
          preview: file.download_url || `../${DIR}/${encodeURIComponent(file.name)}`,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async function saveManifest(message) {
    const content = encodeBase64Utf8(JSON.stringify({ items: state.media.map(({ name, description, type }) => ({ name, description, type })) }, null, 2));
    const payload = { message, content, branch: BRANCH };
    if (state.manifestSha) payload.sha = state.manifestSha;
    const updated = await api(`/contents/${apiPath(MANIFEST)}`, { method: "PUT", body: JSON.stringify(payload) });
    state.manifestSha = updated.content?.sha || null;
  }

  function explainError(error) {
    if (error instanceof TypeError || /Failed to fetch|NetworkError|Load failed/i.test(error?.message || "")) {
      return "The browser could not reach api.github.com, so GitHub did not validate the token. Check network, firewall, or browser-extension blocking and retry.";
    }
    return error?.message || "Unknown error";
  }

  function status(message, type = "") {
    state.status = message;
    state.statusType = type;
    const target = document.querySelector(".status");
    if (target) {
      target.textContent = message;
      target.className = `status ${type}`;
    }
    document.querySelectorAll("[data-action], #upload-file, [data-replace-file]").forEach((control) => {
      control.disabled = state.busy;
    });
  }

  function cardTemplate(item) {
    const media = item.type === "video"
      ? `<video src="${escapeHtml(item.preview)}" controls preload="metadata"></video>`
      : `<img src="${escapeHtml(item.preview)}" alt="${escapeHtml(item.description)}" loading="lazy" />`;
    return `<article class="media-card" data-name="${escapeHtml(item.name)}">
      <div class="preview">${media}</div>
      <div class="file-meta"><span class="file-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span><span class="type-chip">${escapeHtml(item.type)}</span></div>
      <div class="card-body">
        <label for="desc-${escapeHtml(item.name)}">Gallery description</label>
        <input type="text" id="desc-${escapeHtml(item.name)}" data-description value="${escapeHtml(item.description)}" maxlength="180" />
        <div class="card-actions">
          <button class="button primary" data-action="save">Save description</button>
          <button class="button" data-action="replace">Replace</button>
          <input class="replace-input" type="file" data-replace-file accept="image/*,video/mp4,video/webm,video/quicktime" />
          <button class="button danger" data-action="delete">Delete</button>
        </div>
      </div>
    </article>`;
  }

  function renderLogin() {
    root.innerHTML = `<section class="panel login-panel">
      <p class="eyebrow">Site management</p>
      <h1>Gallery admin</h1>
      <p class="intro">Connect your GitHub account to add, replace, describe, preview, and remove Gallery media.</p>
      <form id="login-form">
        <label class="field-label" for="pat">GitHub personal access token</label>
        <input id="pat" name="pat" type="password" autocomplete="off" spellcheck="false" placeholder="github_pat_…" required />
        <p class="hint">Use a fine-grained token for <strong>oceancarcare/website</strong> with Contents read and write access. The token stays in this browser session and is never saved in the repository. “Failed to fetch” means the browser could not reach GitHub; “Bad credentials” means GitHub rejected the token.</p>
        <div class="actions"><button class="button primary" type="submit" ${state.busy ? "disabled" : ""}>${state.busy ? "Connecting…" : "Connect to GitHub"}</button></div>
      </form>
      <p class="status ${escapeHtml(state.statusType)}">${escapeHtml(state.status)}</p>
    </section>`;
    document.getElementById("login-form").addEventListener("submit", connect);
  }

  function renderDashboard() {
    root.innerHTML = `<section class="toolbar">
      <div><p class="eyebrow">Ocean Car Care · ${escapeHtml(state.username)}</p><h1>Gallery media</h1><p>Files in <code>${DIR}/</code> are shown on the public Gallery page.</p></div>
      <div class="actions"><button class="button" data-action="refresh" ${state.busy ? "disabled" : ""}>Refresh</button><button class="button" data-action="logout">Log out</button></div>
    </section>
    <p class="status ${escapeHtml(state.statusType)}">${escapeHtml(state.status)}</p>
    <section class="upload-panel">
      <div class="upload-copy"><strong>Add an image or video</strong><span>PNG, JPG, WEBP, GIF, MP4, WEBM or MOV · up to 20 MB</span></div>
      <label class="button primary file-picker">Choose media<input id="upload-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,video/quicktime" ${state.busy ? "disabled" : ""} /></label>
    </section>
    <section class="media-grid">${state.media.length ? state.media.map(cardTemplate).join("") : `<div class="empty">No gallery media found. Upload the first item above.</div>`}</section>
    <section class="help"><h2>What each operation does</h2><table><thead><tr><th>Operation</th><th>What happens</th></tr></thead><tbody>
      <tr><td>Browse / Refresh</td><td>Fetches the latest files and descriptions from GitHub.</td></tr>
      <tr><td>Preview</td><td>Loads the repository media in this admin page.</td></tr>
      <tr><td>Upload</td><td>Adds a new file and creates a GitHub commit.</td></tr>
      <tr><td>Replace</td><td>Updates an existing file and creates a GitHub commit.</td></tr>
      <tr><td>Save / Delete</td><td>Saves the Gallery caption, or removes the media file and its caption with GitHub commits.</td></tr>
    </tbody></table></section>`;
    root.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", onAction));
    root.querySelectorAll("[data-replace-file]").forEach((input) => input.addEventListener("change", onReplaceFile));
    document.getElementById("upload-file").addEventListener("change", onUploadFile);
  }

  function render() {
    if (!state.token) renderLogin();
    else renderDashboard();
  }

  async function connect(event) {
    event.preventDefault();
    const token = document.getElementById("pat").value.trim();
    if (!token) return;
    state.token = token;
    state.busy = true;
    render();
    try {
      const user = await api("/user");
      state.username = user.login;
      await loadMedia();
      state.status = `Connected as ${user.login}.`;
      state.statusType = "good";
    } catch (error) {
      state.token = "";
      state.username = "";
      state.status = `Could not connect: ${explainError(error)} Check that the token is scoped to this repository with Contents read/write access.`;
      state.statusType = "";
    } finally {
      state.busy = false;
      render();
    }
  }

  async function onAction(event) {
    if (state.busy) return;
    const action = event.currentTarget.dataset.action;
    const card = event.currentTarget.closest(".media-card");
    if (action === "logout") {
      state.token = ""; state.username = ""; state.media = []; state.manifestSha = null; state.status = ""; state.statusType = ""; render(); return;
    }
    if (action === "refresh") {
      state.busy = true; status("Refreshing from GitHub…");
      try { await loadMedia(); status("Gallery list refreshed.", "good"); }
      catch (error) { status(`Refresh failed: ${explainError(error)}`); }
      finally { state.busy = false; render(); }
      return;
    }
    if (!card || state.busy) return;
    const name = card.dataset.name;
    const item = state.media.find((entry) => entry.name === name);
    if (!item) return;
    if (action === "replace") {
      card.querySelector("[data-replace-file]").click();
      return;
    }
    if (action === "save") {
      const previous = item.description;
      item.description = card.querySelector("[data-description]").value.trim() || prettyName(item.name);
      state.busy = true; status("Saving description to GitHub…");
      try { await saveManifest(`Update Gallery description for ${item.name}`); status("Description saved to the public Gallery.", "good"); }
      catch (error) { item.description = previous; status(`Could not save description: ${explainError(error)}`); }
      finally { state.busy = false; render(); }
      return;
    }
    if (action === "delete") {
      if (!window.confirm(`Delete ${name} from the repository and public Gallery?`)) return;
      state.busy = true; status("Deleting media from GitHub…");
      try {
        state.media = state.media.filter((entry) => entry.name !== name);
        await saveManifest(`Remove ${name} from Gallery manifest`);
        await api(`/contents/${apiPath(`${DIR}/${name}`)}`, { method: "DELETE", body: JSON.stringify({ message: `Delete Gallery media ${name}`, sha: item.sha, branch: BRANCH }) });
        status("Media deleted and Gallery manifest updated.", "good");
      } catch (error) { status(`Delete or manifest update failed: ${explainError(error)}. Refresh to inspect the repository state.`); }
      finally { state.busy = false; try { await loadMedia(); } catch (_) {} render(); }
    }
  }

  async function onUploadFile(event) {
    if (state.busy) return;
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (!isMedia(file.name)) { status("Choose a supported image or video file."); return; }
    if (file.size > 20 * 1024 * 1024) { status("Files must be 20 MB or smaller for browser upload."); return; }
    if (state.media.some((item) => item.name.toLowerCase() === file.name.toLowerCase())) { status("A file with this name already exists. Use Replace on that item instead."); return; }
    const name = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!name || name === "gallery.json") { status("That filename cannot be used."); return; }
    state.busy = true; status(`Uploading ${name} to GitHub…`);
    try {
      await api(`/contents/${apiPath(`${DIR}/${name}`)}`, { method: "PUT", body: JSON.stringify({ message: `Add Gallery media ${name}`, content: await fileToBase64(file), branch: BRANCH }) });
      state.media.push({ name, sha: "", type: mediaType(name), description: prettyName(name), preview: `../${DIR}/${encodeURIComponent(name)}` });
      await saveManifest(`Add ${name} to Gallery manifest`);
      status("Media uploaded and added to the public Gallery.", "good");
    } catch (error) { status(`Upload or manifest update failed: ${explainError(error)}. Refresh to inspect repository contents.`); }
    finally { state.busy = false; try { await loadMedia(); } catch (_) {} render(); }
  }

  async function onReplaceFile(event) {
    if (state.busy) return;
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    const card = event.currentTarget.closest(".media-card");
    const name = card?.dataset.name;
    const item = state.media.find((entry) => entry.name === name);
    if (!item) return;
    if (extOf(file.name) !== extOf(item.name)) { status("Choose a replacement with the same file extension."); return; }
    if (file.size > 20 * 1024 * 1024) { status("Files must be 20 MB or smaller for browser upload."); return; }
    state.busy = true; status(`Replacing ${name} on GitHub…`);
    try {
      const updated = await api(`/contents/${apiPath(`${DIR}/${name}`)}`, { method: "PUT", body: JSON.stringify({ message: `Replace Gallery media ${name}`, content: await fileToBase64(file), sha: item.sha, branch: BRANCH }) });
      item.sha = updated.content?.sha || item.sha;
      status("Media replaced.", "good");
    } catch (error) { status(`Replace failed: ${explainError(error)}`); }
    finally { state.busy = false; try { await loadMedia(); } catch (_) {} render(); }
  }

  render();
})();
