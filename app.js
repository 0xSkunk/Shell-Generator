(function () {
  const $ = id => document.getElementById(id);

  const $ip = $("ip"), $port = $("port");
  const $search = $("search"), $osTabs = document.querySelectorAll("#os-tabs button");
  const $list = $("shell-list"), $empty = $("empty-state");
  const $cmd = $("cmd"), $copy = $("copy"), $label = $("selected-label");
  const $shellSelect = $("shell-select"), $shellField = $("shell-field");
  const $encodingSelect = $("encoding-select");
  const $modeBtns = document.querySelectorAll("#mode-switch button");
  const $ipLabel = $("ip-label");
  const $listenerTitle = $("listener-title"), $listenerSub = $("listener-sub");
  const $listenerSelect = $("listener-select");
  const $listenerCmd = $("listener-cmd"), $copyListener = $("copy-listener");

  /* ---------- Data ---------- */
  const DATA = {
    reverse: window.PAYLOADS || [],
    bind:    window.BIND_PAYLOADS || [],
  };
  const LISTENERS = {
    reverse: window.LISTENER_PAYLOADS || [],
    bind:    window.CONNECT_PAYLOADS || [],
  };
  const SHELL_OPTIONS = window.SHELL_OPTIONS || {};
  const byId         = { reverse: new Map(DATA.reverse.map(p => [p.id, p])),
                         bind:    new Map(DATA.bind.map(p => [p.id, p])) };
  const listenerById = { reverse: new Map(LISTENERS.reverse.map(p => [p.id, p])),
                         bind:    new Map(LISTENERS.bind.map(p => [p.id, p])) };

  /* ---------- Encoding helpers ---------- */
  function toBase64(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function applyEncoding(text, enc) {
    if (!text) return text;
    switch (enc) {
      case "base64": return toBase64(text);
      case "url":    return encodeURIComponent(text);
      case "url2":   return encodeURIComponent(encodeURIComponent(text));
      default:       return text;
    }
  }

  /* ---------- State ---------- */
  const state = {
    ip: "10.10.14.1",
    port: "4444",
    mode: "reverse",
    os: "all",
    search: "",
    encoding: "none",
    shell: { Linux: "/bin/sh", Windows: "cmd.exe", macOS: "/bin/sh" },
    selected: {
      reverse: DATA.reverse[0]?.id || null,
      bind:    DATA.bind[0]?.id || null,
    },
    listener: {
      reverse: LISTENERS.reverse[0]?.id || null,
      bind:    LISTENERS.bind[0]?.id || null,
    },
  };
  const KEY = "shellgen-v4";

  const currentSelected = () => byId[state.mode].get(state.selected[state.mode]);
  const currentListener = () => listenerById[state.mode].get(state.listener[state.mode]);
  const currentCategory = () => currentSelected()?.category || "Linux";

  /* ---------- Build payload list ---------- */
  function buildList() {
    $list.innerHTML = "";
    for (const p of DATA[state.mode]) {
      const li = document.createElement("li");
      li.className = "shell-item";
      li.dataset.id = p.id;
      li.dataset.os = p.category;
      li.innerHTML = `
        <button type="button" class="shell-btn">
          <span class="shell-name"></span>
          <span class="shell-os"></span>
        </button>`;
      li.querySelector(".shell-name").textContent = p.name;
      li.querySelector(".shell-os").textContent = p.category;
      $list.appendChild(li);
    }
  }

  /* ---------- Build listener dropdown ---------- */
  function buildListenerSelect() {
    $listenerSelect.innerHTML = "";
    for (const p of LISTENERS[state.mode]) {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      $listenerSelect.appendChild(opt);
    }
    if (state.listener[state.mode]) $listenerSelect.value = state.listener[state.mode];
  }

  /* ---------- Build shell dropdown (per category) ---------- */
function buildShellSelect() {
  const cat = currentCategory();
  const opts = SHELL_OPTIONS[cat] || [];
  $shellSelect.innerHTML = "";
  for (const o of opts) {
    const opt = document.createElement("option");
    opt.value = o.value;
    opt.textContent = o.label;
    $shellSelect.appendChild(opt);
  }

  if (state.mode === "bind") {
    // Bind: always default (first option)
    if (opts.length) $shellSelect.value = opts[0].value;
  } else {
    const stored = state.shell[cat];
    if (stored && opts.find(o => o.value === stored)) {
      $shellSelect.value = stored;
    } else if (opts.length) {
      $shellSelect.value = opts[0].value;
      state.shell[cat] = opts[0].value;
    }
  }

  updateShellSelectState();
}

function updateShellSelectState() {
  const p = currentSelected();
  const inBind = state.mode === "bind";

  // Bind → always locked. Reverse → only when payload uses shell.
  const enabled = !inBind && !!(p && p.usesShell);
  $shellSelect.disabled = !enabled;
  $shellField.classList.toggle("disabled", !enabled);

  // Label hint
  const labelEl = $shellField.querySelector("span");
  if (labelEl) labelEl.textContent = inBind ? "Shell (fixed)" : "Shell";
}

  /* ---------- Filter ---------- */
  function filterList() {
    const q = state.search.trim().toLowerCase();
    let visible = 0;
    for (const li of $list.children) {
      const p = byId[state.mode].get(li.dataset.id);
      if (!p) continue;
      const matchesOs = state.os === "all" || li.dataset.os === state.os;
      const matchesQ  = !q || p.name.toLowerCase().includes(q);
      const show = matchesOs && matchesQ;
      li.style.display = show ? "" : "none";
      li.classList.toggle("active", li.dataset.id === state.selected[state.mode]);
      if (show) visible++;
    }
    $empty.style.display = visible ? "none" : "block";
  }

  /* ---------- Render ---------- */
  const ENC_LABELS = { none: "", base64: "base64", url: "url", url2: "url²" };

function renderMain() {
  const p = currentSelected();
  const cat = currentCategory();
  const opts = SHELL_OPTIONS[cat] || [];

  // Bind → force default. Reverse → user selection (fallback default).
  const sh = state.mode === "bind"
    ? (opts[0]?.value || "")
    : (state.shell[cat] || (opts[0]?.value || ""));

  let text = p ? p.cmd(state.ip, state.port, sh) : "";
  text = applyEncoding(text, state.encoding);
  $cmd.textContent = text;

  const base = p ? p.name : "generated command";
  const suffix = state.encoding === "none" ? "" : ` · ${ENC_LABELS[state.encoding] || state.encoding}`;
  $label.textContent = base + suffix;

  $cmd.classList.remove("flash");
  void $cmd.offsetWidth;
  $cmd.classList.add("flash");
}
  function renderListener() {
    const p = currentListener();
    $listenerCmd.textContent = p ? p.cmd(state.ip, state.port) : "";
    $listenerCmd.classList.remove("flash");
    void $listenerCmd.offsetWidth;
    $listenerCmd.classList.add("flash");
  }
  function render() { renderMain(); renderListener(); filterList(); }

  /* ---------- Persistencia ---------- */
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (typeof s.ip === "string")   { state.ip = s.ip;   $ip.value = s.ip; }
      if (typeof s.port === "string") { state.port = s.port; $port.value = s.port; }
      if (s.mode === "reverse" || s.mode === "bind") state.mode = s.mode;
      if (typeof s.os === "string") state.os = s.os;
      if (typeof s.encoding === "string") state.encoding = s.encoding;
      if (s.shell && typeof s.shell === "object") {
        for (const k of ["Linux", "Windows", "macOS"]) {
          if (typeof s.shell[k] === "string") state.shell[k] = s.shell[k];
        }
      }
      if (s.selected && typeof s.selected === "object") {
        if (byId.reverse.has(s.selected.reverse)) state.selected.reverse = s.selected.reverse;
        if (byId.bind.has(s.selected.bind))       state.selected.bind    = s.selected.bind;
      }
      if (s.listener && typeof s.listener === "object") {
        if (listenerById.reverse.has(s.listener.reverse)) state.listener.reverse = s.listener.reverse;
        if (listenerById.bind.has(s.listener.bind))       state.listener.bind    = s.listener.bind;
      }
    } catch (_) {}
  }

  /* ---------- Apply mode ---------- */
  function applyMode() {
    $modeBtns.forEach(b => b.classList.toggle("active", b.dataset.mode === state.mode));
    $osTabs.forEach(b => b.classList.toggle("active", b.dataset.os === state.os));
    $encodingSelect.value = state.encoding;

    if (state.mode === "reverse") {
      $ipLabel.textContent       = "Your IP (attacker)";
      $listenerTitle.textContent = "Listener";
      $listenerSub.textContent   = "Command to catch the shell";
    } else {
      $ipLabel.textContent       = "Target IP";
      $listenerTitle.textContent = "Connection";
      $listenerSub.textContent   = "Command to connect to the target";
    }

    buildList();
    buildListenerSelect();
    buildShellSelect();
    render();
  }

  /* ---------- Events ---------- */
  $ip.addEventListener("input",   () => { state.ip = $ip.value;     save(); render(); });
  $port.addEventListener("input", () => { state.port = $port.value; save(); render(); });
  $search.addEventListener("input", () => { state.search = $search.value; filterList(); });

  $osTabs.forEach(btn => btn.addEventListener("click", () => {
    $osTabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.os = btn.dataset.os;
    save(); filterList();
  }));

  $list.addEventListener("click", e => {
    const btn = e.target.closest(".shell-btn");
    if (!btn) return;
    const li = btn.closest(".shell-item");
    if (!li || li.style.display === "none") return;
    state.selected[state.mode] = li.dataset.id;
    save();
    buildShellSelect();
    renderMain();
    filterList();
  });

  $modeBtns.forEach(btn => btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    save(); applyMode();
  }));

  $listenerSelect.addEventListener("change", () => {
    state.listener[state.mode] = $listenerSelect.value;
    save(); renderListener();
  });

  $shellSelect.addEventListener("change", () => {
    state.shell[currentCategory()] = $shellSelect.value;
    save(); renderMain();
  });

  $encodingSelect.addEventListener("change", () => {
    state.encoding = $encodingSelect.value;
    save(); renderMain();
  });

  /* ---------- Copy ---------- */
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    document.execCommand("copy"); ta.remove();
  }
  function setupCopy(btn, getText) {
    const original = btn.innerHTML;
    btn.addEventListener("click", async () => {
      const text = getText();
      if (!text) return;
      try {
        await copyText(text);
        btn.classList.add("copied");
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
          'stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          "<span>Copied!</span>";
        setTimeout(() => { btn.classList.remove("copied"); btn.innerHTML = original; }, 1600);
      } catch (_) {}
    });
  }
  setupCopy($copy,         () => $cmd.textContent);
  setupCopy($copyListener, () => $listenerCmd.textContent);

  /* ---------- Init ---------- */
  load();
  applyMode();
})();