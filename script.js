"use strict";

window.addEventListener("DOMContentLoaded", init);
let hex;
const HTML = {};
const style = document.createElement("style");
document.head.appendChild(style);

function init() {
  HTML.colorPicker = document.querySelector("#input");
  HTML.colorBox = document.querySelector("#colorbox");
  convertColors();
}

function convertColors(hex, rgb, hsl) {
  HTML.colorPicker.addEventListener("change", showColors);
}

function convertHEX(hex) {
  let r, g, b;
  r = hex.substring(1, 3);
  g = hex.substring(3, 5);
  b = hex.substring(5, 7);

  r = Number.parseInt(r, 16);
  g = Number.parseInt(g, 16);
  b = Number.parseInt(b, 16);

  showRGB(r, g, b);
}

function showRGB(r, g, b) {
  document.querySelector(".rgb").textContent = "RGB: " + `${r}, ${g}, ${b}`;

  convertRGB(r, g, b);
}

function convertRGB(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  showHSL(h, s, l);
}

function showHSL(h, s, l) {
  document.querySelector(".hsl").textContent = "HSL: " + `${h}, ${s}%, ${l}%`;
}

function showColors(hex) {
  hex = HTML.colorPicker.value;
  console.log(hex);

  document.querySelector(".hex").textContent = "HEX: " + hex;

  HTML.colorBox.dataset.color_selected = hex;
  style.sheet.insertRule(`[data-color_selected="${hex}"] {--selected_color: ${hex}}`);
  convertHEX(hex);
}
