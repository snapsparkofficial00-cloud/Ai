import { chromium }
from "playwright";

export async function runTask(
task: any
) {

const browser =
await chromium.launch({
headless: false,
});

const page =
await browser.newPage();

if (
task.input.includes(
"youtube"
)
) {

await page.goto(
  "https://youtube.com"
);

}

if (
task.input.includes(
"github"
)
) {

await page.goto(
  "https://github.com"
);

}

return {
success: true,
};
}
