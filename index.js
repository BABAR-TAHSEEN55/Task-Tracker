import TaskTracker from "./TaskTracker.js";
import inquirer from "inquirer";
const taskTracker = new TaskTracker();
await taskTracker.LoadTasks();

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
      console.log("Thank you for using CLI !!");
      process.exit(0);
  }
  //TODO : 1) Adding Colors , 2 ) After Exiting : Thank you For using CLI Inteface  3) Do you want to exit the Cli or want to write another task?

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
    console.log("Task saved Successfully");
  } catch (error) {
    console.log("Error found ", error);
  }
}

async function removeTask() {
  const tasks = taskTracker.removeTask();
  if (tasks.length === 0) {
    console.log("No Tasks to remove  ");
    return;
  }
  const { taskId } = await inquirer.prompt([
    {
      type: "input",
      name: "taskId",
      message: "Enter TaskId",
    },
  ]);
  const removed = await taskTracker.removeTask(taskId);
  if (removed) {
    console.log("Task removed successfully");
  } else {
    console.log("Task not found ");
  }
}
async function MarkTaskCompleted() {
  const tasks = taskTracker.ListTask();
  if (tasks.length === 0) {
    console.log("No Tasks can be found ");
    return;
  }
  const { taskId } = await inquirer.prompt([
    {
      type: "number",
      name: "taskId",
      message: "Enter taskId",
    },
  ]);
  console.log({ taskId });
  const MarkCompleted = await taskTracker.MarkTaskCompleted(taskId);
  if (taskId === undefined) {
    console.log("Please enter a valid TaskId");
    return;
  } else {
    if (MarkCompleted) {
      console.log("Task Completed");
    } else {
      console.log("Task is not Completed yet!");
    }
  }
}
MainMenu();
