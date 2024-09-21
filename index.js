import TaskTracker from "./TaskTracker.js";
import inquirer from "inquirer";
const taskTracker = new TaskTracker();

async function MainMenu() {
  console.log("Welcome To CLI for TaskTracking !!");

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do ? (Use arrow Keys )",
      choices: [
        "Add a Task",
        "List all Tasks",
        "Save Tasks",
        "Remove Tasks",
        "Mark Tasks Completed",
        "Exit",
      ],
    },
  ]);

  switch (choice) {
    case "Add a Task":
      await taskTracker.addTask();
      break;

    default:
      break;
  }
}

MainMenu();
