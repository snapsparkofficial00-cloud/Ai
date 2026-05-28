import fs from "fs";
import path from "path";

export async function generateFile(

  filePath: string,

  content: string

) {

  try {

    /* =========================
       CREATE DIRECTORY
    ========================== */

    const dir = path.dirname(
      filePath
    );

    if (!fs.existsSync(dir)) {

      fs.mkdirSync(dir, {

        recursive: true,

      });

    }

    /* =========================
       WRITE FILE
    ========================== */

    fs.writeFileSync(

      filePath,

      content

    );

    console.log(

      "📄 FILE CREATED:",

      filePath

    );

    return {

      success: true,

      filePath,

      status:
        "generated",

    };

  } catch (err) {

    console.log(err);

    return {

      success: false,

      error: String(err),

    };

  }

}
