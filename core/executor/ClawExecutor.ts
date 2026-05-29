import { chromium } from "playwright";

export async function ClawExecutor(task: string) {

const browser = await chromium.launch({
headless: false,
});

const page = await browser.newPage();

console.log("Running task:", task);

if (task.includes("youtube")) {

await page.goto(
  "https://youtube.com"
);

}

if (task.includes("github")) {

await page.goto(
  "https://github.com"
);

}

return {
success: true,
task,
};
}
