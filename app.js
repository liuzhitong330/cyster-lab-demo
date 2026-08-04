(function () {
  "use strict";

  const data = window.CYSTER_LAB_DATA;
  if (!data) return;

  let activeCondition = "inflamed";
  let activeCell = "wt";
  let activeBuilder = "hev";

  const conditionControls = document.getElementById("condition-controls");
  const cellControls = document.getElementById("cell-controls");
  const routeViz = document.getElementById("route-viz");
  const builderControls = document.getElementById("builder-controls");

  function makeButton(label, value, current, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.value = value;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(value === current));
    if (value === current) button.classList.add("active");
    button.addEventListener("click", onClick);
    return button;
  }

  function renderControls() {
    conditionControls.replaceChildren();
    Object.entries(data.conditions).forEach(([key, condition]) => {
      conditionControls.appendChild(
        makeButton(condition.shortLabel, key, activeCondition, function () {
          activeCondition = key;
          renderControls();
          renderRoute();
        })
      );
    });

    cellControls.replaceChildren();
    Object.entries(data.cells).forEach(([key, label]) => {
      cellControls.appendChild(
        makeButton(label, key, activeCell, function () {
          activeCell = key;
          renderControls();
          renderRoute();
        })
      );
    });
  }

  function svgEl(name, attrs, text) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, value));
    if (text) el.textContent = text;
    return el;
  }

  function renderRoute() {
    const condition = data.conditions[activeCondition];
    const cell = condition.cells[activeCell];
    routeViz.replaceChildren();

    const defs = svgEl("defs");
    const marker = svgEl("marker", {
      id: "arrowhead",
      markerWidth: "8",
      markerHeight: "8",
      refX: "6",
      refY: "4",
      orient: "auto"
    });
    marker.appendChild(svgEl("path", { d: "M0,0 L8,4 L0,8 z", fill: "#1f7a8c" }));
    defs.appendChild(marker);
    routeViz.appendChild(defs);

    routeViz.appendChild(svgEl("rect", { x: "22", y: "55", width: "188", height: "194", rx: "2", class: "zone zone-blood" }));
    routeViz.appendChild(svgEl("rect", { x: "260", y: "35", width: "98", height: "234", rx: "49", class: "zone zone-hev" }));
    routeViz.appendChild(svgEl("rect", { x: "408", y: "55", width: "250", height: "194", rx: "2", class: "zone zone-tissue" }));

    routeViz.appendChild(svgEl("text", { x: "45", y: "87", class: "zone-label" }, "BLOOD"));
    routeViz.appendChild(svgEl("text", { x: "309", y: "25", class: "zone-label middle" }, "HEV"));
    routeViz.appendChild(svgEl("text", { x: "433", y: "87", class: "zone-label" }, activeCondition === "tumor" ? "TUMOR INTERSTITIUM" : "NODE PARENCHYMA"));

    for (let i = 0; i < 6; i += 1) {
      routeViz.appendChild(svgEl("circle", { cx: String(62 + i * 24), cy: String(150 + (i % 2) * 34), r: "8", class: "background-cell" }));
    }

    const route = svgEl("path", {
      d: `M112 212 C190 212 219 175 276 163 C342 149 374 177 ${cell.stopX} 176`,
      class: `cell-route ${cell.routeClass}`,
      "marker-end": "url(#arrowhead)"
    });
    routeViz.appendChild(route);

    routeViz.appendChild(svgEl("circle", { cx: String(cell.stopX), cy: "176", r: "16", class: "active-cell" }));
    routeViz.appendChild(svgEl("circle", { cx: String(cell.stopX - 5), cy: "171", r: "3", class: "cell-detail" }));
    routeViz.appendChild(svgEl("circle", { cx: String(cell.stopX + 5), cy: "181", r: "3", class: "cell-detail" }));

    condition.signalTags.forEach((tag, index) => {
      const x = 246 + index * 112;
      const group = svgEl("g", { class: "signal-tag" });
      group.appendChild(svgEl("rect", { x: String(x), y: "274", width: "100", height: "22", rx: "11" }));
      group.appendChild(svgEl("text", { x: String(x + 50), y: "289", "text-anchor": "middle" }, tag));
      routeViz.appendChild(group);
    });

    document.getElementById("dominant-cue").textContent = condition.cue;
    document.getElementById("observed-effect").textContent = cell.effect;
    document.getElementById("route-caption").textContent = `${condition.label} · ${cell.label}. ${condition.context} Current readout: ${cell.status}.`;
  }

  function renderBuilderControls() {
    builderControls.replaceChildren();
    Object.entries(data.builders).forEach(([key, builder]) => {
      builderControls.appendChild(
        makeButton(builder.label, key, activeBuilder, function () {
          activeBuilder = key;
          renderBuilderControls();
          renderBuilderNote();
        })
      );
    });
  }

  function renderBuilderNote() {
    const builder = data.builders[activeBuilder];
    document.getElementById("builder-role").textContent = builder.role;
    document.getElementById("builder-title").textContent = builder.title;
    document.getElementById("builder-copy").textContent = builder.copy;
    document.getElementById("builder-evidence").textContent = builder.evidence;
    document.getElementById("builder-gap").textContent = builder.gap;
    document.getElementById("builder-experiment").textContent = builder.experiment;
    document.getElementById("builder-readout").textContent = builder.readout;
    document.getElementById("builder-control").textContent = builder.control;
    document.getElementById("builder-decisive").textContent = builder.decisive;
    document.getElementById("builder-lab-value").textContent = builder.labValue;
    document.getElementById("builder-cathy-value").textContent = builder.cathyValue;

    document.querySelectorAll(".pathway-node").forEach((node) => {
      node.classList.toggle("active", builder.activeNodes.includes(node.dataset.node));
    });
  }

  renderControls();
  renderRoute();
  renderBuilderControls();
  renderBuilderNote();
})();
