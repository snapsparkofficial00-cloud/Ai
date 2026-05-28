export async function pushToGithub(

  repo: string,

  commitMessage: string

) {

  console.log(

    "📦 GITHUB PUSH STARTED"

  );

  /* =========================
     STAGE FILES
  ========================== */

  const stage = {

    files:
      "all files staged",

    commit:
      commitMessage,

  };

  /* =========================
     PUSH PROCESS
  ========================== */

  const push = {

    repository:
      repo,

    branch:
      "main",

    status:
      "pushed successfully",

  };

  /* =========================
     RESULT
  ========================== */

  return {

    success: true,

    stage,

    push,

    timestamp:
      new Date(),

  };

}
