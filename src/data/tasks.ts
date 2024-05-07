export let dataTasks = [
  {
    id: 1,
    title: "Task List",
    isDone: true,
  },

  {
    id: 2,
    title: "task execution",
    isDone: true,
  },

  {
    id: 3,
    title: "assignment collection",
    isDone: false,
  },

  {
    id: 4,
    title: "finish",
    isDone: false,
  },
];

export function getTasks() {
  return dataTasks;
}

export function addTask({ title, isDone }: { title: string; isDone: boolean }) {
  const nextId =
    dataTasks.length > 0 ? dataTasks[dataTasks.length - 1].id + 1 : 1;

  const newTask = { id: nextId, title, isDone };
  const newDataTasks = [...dataTasks, newTask];

  dataTasks = newDataTasks;

  return dataTasks;
}

export function editTask(
  idToEdit: number,
  updatedTask: {
    title: string;
    isDone: boolean;
  }
) {
  const indexToEdit = dataTasks.findIndex((item) => item.id === idToEdit);
  if (indexToEdit !== -1) {
    dataTasks[indexToEdit] = {
      ...dataTasks[indexToEdit],
      ...updatedTask,
    };
  }
}
