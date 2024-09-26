import TaskTracker from "./TaskTracker.js";
import inquirer from "inquirer";
import chalk from "chalk";
const taskTracker = new TaskTracker();
await taskTracker.LoadTasks();

async function MainMenu() {
  console.log(chalk.green("Welcome To CLI for TaskTracking !!"));

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: chalk.blue("What would you like to do ? (Use arrow Keys )"),
      choices: [
        { name: chalk.bold.magenta("Add a Task"), value: "Add a Task" },
        { name: chalk.bold.magenta("List all Tasks"), value: "List all Tasks" },
        { name: chalk.bold.magenta("Save Tasks"), value: "Save Tasks" },
        { name: chalk.bold.magenta("Remove Tasks"), value: "Remove Tasks" },

        { name: chalk.red("Exit"), value: "Exit" },
      ],
    },
  ]);
  switch (choice) {
    case "Add a Task":
      await addTask();
      break;
    case "List all Tasks":
      await ListTask();
      break;
    case "Save Tasks":
      await SaveTask();
      break;
    case "Remove Tasks":
      await removeTask();
      break;
    case "Mark Tasks Completed":
      await MarkTaskCompleted();
      break;
    case "Exit":
      console.log("Thank you for using CLI");
      process.exit(0);
  }

  async function addTask() {
    const { title, description, dueDate } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: chalk.magenta("Enter task title"),
      },
      {
        type: "input",
        name: "description",
        message: chalk.magenta("Enter task description"),
      },
      {
        type: "input",
        name: "dueDate",
        message: chalk.magenta("Enter task DueDate"),
      },
    ]);
    taskTracker.addTask(title, description, dueDate);
    console.log(chalk.green("Task added Successfully! "));
  }
}

async function ListTask() {
  const tasks = taskTracker.ListTask();
  console.table(tasks);
}

async function SaveTask() {
  // const save = await taskTracker.SaveTask();
  // if (save) {
  //   console.log("Task Saved Successfully");
  // } else {
  //   console.log("Task not found ");
  // }
  try {
    await taskTracker.SaveTask();
    console.log(chalk.green("Task saved Successfully! "));
  } catch (error) {
    console.log(chalk.red("Error found ", error));
  }
}

async function removeTask() {
  const tasks = taskTracker.removeTask();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No Tasks to remove "));
    return;
  }
  const { taskId } = await inquirer.prompt([
    {
      type: "input",
      name: "taskId",
      message: chalk.magenta("Enter TaskId"),
    },
  ]);
  const removed = await taskTracker.removeTask(taskId);
  if (removed) {
    console.log(chalk.green("Task removed Successfully! "));
  } else {
    console.log(chalk.yellow("Task not found "));
  }
}
async function MarkTaskCompleted() {
  const tasks = taskTracker.ListTask();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No Tasks can be found "));
    return;
  }
  const { taskId } = await inquirer.prompt([
    {
      type: "number",
      name: "taskId",
      message: chalk.magenta("Enter taskId"),
    },
  ]);
  console.log({ taskId });
  const MarkCompleted = await taskTracker.MarkTaskCompleted(taskId);
  if (taskId === undefined) {
    console.log("Please enter a valid TaskId");
    return;
  } else {
    if (MarkCompleted) {
      console.log(chalk.green("Task Completed"));
    } else {
      console.log(chalk.yellow("Task is not Completed yet!"));
    }
  }
}
MainMenu();

/* Things to do and Follow Up Quesitons : 
1. Create a repository
2. Push al code 
3. Write README.md file
4.Is this an API ? 


*/
