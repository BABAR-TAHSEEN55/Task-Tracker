const fs = require("fs").promises;
const path = require("path");

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
  async removeTask() {}

  async MarkTaskCompleted() {}
  ListTask() {
    return this.tasks;
  }
  async SaveTask() {
    await fs.writeFile(this.filename, JSON.stringify(this.tasks, null, 2));
  }
}
