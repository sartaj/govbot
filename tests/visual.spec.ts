import { test, expect } from "@playwright/test";
import path from "path";

const HTML_PATH = path.join(__dirname, "../docs/index.html");

test.describe("Govbot Feed Visual Regression", () => {
  test("full page screenshot - above the fold", async ({ page }) => {
    await page.goto(`file://${HTML_PATH}`);

    // Wait for content to be rendered
    await page.waitForSelector(".entries");

    // Take screenshot of above-the-fold content
    await expect(page).toHaveScreenshot("feed-above-fold.png", {
      fullPage: false,
      maxDiffPixelRatio: 0.01, // Allow 1% pixel difference for anti-aliasing
    });
  });

  test("full page screenshot - entire page", async ({ page }) => {
    await page.goto(`file://${HTML_PATH}`);

    // Wait for content to be rendered
    await page.waitForSelector(".entries");

    // Take full page screenshot
    await expect(page).toHaveScreenshot("feed-full-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("header component", async ({ page }) => {
    await page.goto(`file://${HTML_PATH}`);

    const header = page.locator("header").first();
    await expect(header).toHaveScreenshot("header.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("entry card component", async ({ page }) => {
    await page.goto(`file://${HTML_PATH}`);

    // Screenshot first entry card
    const firstEntry = page.locator(".entry").first();
    await expect(firstEntry).toHaveScreenshot("entry-card.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("footer component", async ({ page }) => {
    await page.goto(`file://${HTML_PATH}`);

    const footer = page.locator("footer").last();
    await expect(footer).toHaveScreenshot("footer.png", {
      maxDiffPixelRatio: 0.01,
    });
  });
});
