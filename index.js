import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

const makeCommits = async (n) => {
  if (n === 0) {
    await git.push();
    console.log("✅ All commits pushed");
    return;
  }

  const x = random.int(0, 54);
  const y = random.int(0, 6);

  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date };

  try {
    console.log("📅 Commit:", date);

    // Step 1: Write file
    await jsonfile.writeFile(path, data);

    // Step 2: Add
    await git.add([path]);

    // Step 3: Commit
    await git.commit(date, { "--date": date });

    // Optional delay (important 🔥)
    await new Promise((res) => setTimeout(res, 300));

    // Next commit
    await makeCommits(n - 1);

  } catch (err) {
    console.error("❌ Error:", err);
  }
};

makeCommits(100);