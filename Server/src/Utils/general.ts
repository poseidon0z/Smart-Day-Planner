export function getProblemFromCode(problemCode: number) {
  if (problemCode === 1) {
    return 'The task is not specific.';
  } else if (problemCode === 2) {
    return 'The allocated time is insufficient to complete the task.';
  } else if (problemCode === 3) {
    return 'The allocated time is excessive for this task.';
  } else if (problemCode === 0) {
    return 'The task is specific and well-suited to the allocated time.';
  } else {
    return 'Unknown problem code.';
  }
}
