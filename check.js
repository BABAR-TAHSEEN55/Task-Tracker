import inquirer from "inquirer";
async function MainMenu() {
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
