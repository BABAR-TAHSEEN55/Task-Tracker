const fs = require("fs").promises;
const path = require("path");
const {
  reduceEachTrailingCommentRange,
  resolveTripleslashReference,
} = require("typescript");

class TaskTracker {
  constructor(filename = "task.json") {
    this.filename = filename;
    this.tasks = [];
  }

  async LoadTasks() {
    try {
      const data = await fs.readFile(this.filename, "utf-8");
      this.tasks = JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        console.log(
          "No Tasks found in the file , Starting with an empty Task List"
        );
        this.tasks = [];
      }
    }
  }

  async addTask(title, description, dueDate) {
    const task = {
      id: this.tasks.length + 1,
      title,
      description,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    await this.SaveTask();
    return task;
  }
  //   async removeTask(id) {
  //     const task = this.tasks.find((t) => t.id === id);
  //     if (task) {
  //       this.tasks = this.tasks.filter((t) => t.id != id);
  //       await this.SaveTask();
  //       return true;
  //     }
  //     return false;
  //   } // COULD BE USED BUT INEFFICIENT FOR LARGER ARRAYS
  async removeTask(id) {
    const InitialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id != id);
    if (InitialLength > this.tasks.length) {
      await this.SaveTask();
      return true;
    }
    return false;
  }

  async MarkTaskCompleted(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = true;
      await this.SaveTask();
      return true;
    }
    return false;
  }
  ListTask() {
    return this.tasks;
  }
  async SaveTask() {
    await fs.writeFile(this.filename, JSON.stringify(this.tasks, null, 2));
  }
}
