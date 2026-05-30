import fs from "fs";

const path = "./lib/memory/memory.json";

export function saveLesson(lesson: any) {
  const data = JSON.parse(
    fs.readFileSync(path, "utf8")
  );

  data.lessons.push(lesson);

  fs.writeFileSync(
    path,
    JSON.stringify(data, null, 2)
  );
}
