import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.document = dom.window.document;

import { showSlides } from "../js/main.js";

describe("showSlides function", () => {});
it("Should maintain the correct slide order when navigating forward and backward", () => {
  // Mock the DOM elements
  document.body.innerHTML = `
    <div class="mySlides"></div>
    <div class="mySlides"></div>
    <div class="mySlides"></div>
  `;

  // Set up the initial state
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll(".mySlides");

  // Test forward navigation
  showSlide(1);
  expect(currentSlideIndex).toBe(1);
  expect(slides[1].style.display).toBe("flex");

  showSlide(2);
  expect(currentSlideIndex).toBe(2);
  expect(slides[2].style.display).toBe("flex");

  // Test wrapping to the beginning
  showSlide(3);
  expect(currentSlideIndex).toBe(0);
  expect(slides[0].style.display).toBe("flex");

  // Test backward navigation
  showSlide(-1);
  expect(currentSlideIndex).toBe(2);
  expect(slides[2].style.display).toBe("flex");

  // Ensure other slides are hidden
  expect(slides[0].style.display).toBe("none");
  expect(slides[1].style.display).toBe("none");
});

it("Should work correctly with a single slide", () => {
  // Mock the DOM elements
  document.body.innerHTML = `
    <div class="mySlides"></div>
  `;

  // Set up the initial state
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll(".mySlides");

  // Test forward navigation
  showSlide(1);
  expect(currentSlideIndex).toBe(0);
  expect(slides[0].style.display).toBe("flex");

  // Test backward navigation
  showSlide(-1);
  expect(currentSlideIndex).toBe(0);
  expect(slides[0].style.display).toBe("flex");

  // Test multiple forward navigations
  showSlide(5);
  expect(currentSlideIndex).toBe(0);
  expect(slides[0].style.display).toBe("flex");

  // Test multiple backward navigations
  showSlide(-5);
  expect(currentSlideIndex).toBe(0);
  expect(slides[0].style.display).toBe("flex");
});

it("Should hide all slides before showing the current one", () => {
  // Mock the DOM elements
  document.body.innerHTML = `
    <div class="mySlides"></div>
    <div class="mySlides"></div>
    <div class="mySlides"></div>
  `;

  // Set up the initial state
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll(".mySlides");

  // Set initial display state for slides
  slides.forEach((slide) => (slide.style.display = "flex"));

  // Call the function
  showSlide(1);

  // Check if all slides are hidden first
  slides.forEach((slide, index) => {
    if (index !== 1) {
      expect(slide.style.display).toBe("none");
    }
  });

  // Check if only the current slide is displayed
  expect(slides[1].style.display).toBe("flex");
  expect(currentSlideIndex).toBe(1);
});