import { CrewAI } from "../crewai";
import { buildWebsite } from "../website-builder";

type RouterRequest = {
message: string;
};

export async function AIRouter(
input: RouterRequest
) {
const lower =
input.message.toLowerCase();

/* WEBSITE TASKS */

if (
lower.includes("website") ||
lower.includes("app") ||
lower.includes("dashboard")
) {
return await buildWebsite(
input.message
);
}

/* DEFAULT CREW AI */

return await CrewAI({
objective:
input.message,
});
}
