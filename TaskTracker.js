const fs = require("fs");
const path = require("path");

class TaskTracker {
  constructor(filename = "task.json") {
    this.filename = filename;
    this.tasks = [];
  }

  async LoadTasks() {
    const data = await fs.readFile(this.filename, "utf-8");
    this.tasks = JSON.parse(data);
  }
}
