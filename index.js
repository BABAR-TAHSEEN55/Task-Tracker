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
      await addTask();
      break;
    case "List all Tasks":
      await ListTask();
    default:
      break;
  }

  async function addTask() {
    const { title, description, dueDate } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter task title",
      },
      {
        type: "input",
        name: "description",
        message: "Enter task description",
      },
      {
        type: "input",
        name: "dueDate",
        message: "Enter task DueDate",
      },
    ]);
    taskTracker.addTask(title, description, dueDate);
    console.log("Task added Successfully! ");
  }
}

async function ListTask() {
  const tasks = taskTracker.ListTask();
  console.log(tasks);
}

MainMenu();
