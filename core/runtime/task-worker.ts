let chromium: any = null;

if (
process.env.NODE_ENV !==
"production"
) {

chromium =
require("playwright")
.chromium;
}

export async function runTask(
task: any
) {

if (!chromium) {

console.log(
  "Playwright disabled in production"
);

return {
  success: false,
};

}

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
