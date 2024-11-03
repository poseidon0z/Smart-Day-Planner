class Task {
  static currentId = 1;

  constructor(date, taskDescription, startTime, endTime, status = false) {
    this.id = Task.currentId++;
    this.date = date;
    this.taskDescription = taskDescription;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.completionTime = 0;
  }

  incompleteTask() {
    this.status = false;
  }

  completeTask() {
    this.status = true;
    this.completionTime = Math.floor(Date.now() / 1000);
  }

  updateTimes(newStartTime, newEndTime) {
    this.startTime = newStartTime;
    this.endTime = newEndTime;
  }

  displayTask() {
    return `Task ID: ${this.id}\nDescription: ${this.taskDescription}\nDate: ${
      this.date
    }\nStart Time: ${this.startTime}\nEnd Time: ${this.endTime}\nStatus: ${
      this.status ? 'Complete' : 'Incomplete'
    }`;
  }
}

export default Task;
