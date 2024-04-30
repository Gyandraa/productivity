import { useState } from "react";
import { dataTasks } from "../data/tasks";

export function Tasks() {
  const [tasks, setTasks] = useState(dataTasks);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function searchTask(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.toLowerCase());
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newTask.trim() !== "") {
      const lastId = tasks[tasks.length - 1].id;
      const newTaskData = {
        id: lastId + 1,
        title: newTask,
        isDone: false,
      };
      setTasks([...tasks, newTaskData]);
      setNewTask("");
    }
  }

  function removeTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div>
      <form>
        <label htmlFor="searchTask">Search</label>
        <input
          type="text"
          id="searchTask"
          value={searchQuery}
          onChange={searchTask}
          placeholder="Search Study"
        />
      </form>
      <form onSubmit={addTask}>
        <div>
          <label htmlFor="title">Add New </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Add new"
          />
        </div>

        <div>
          <button type="submit">Add New Study</button>
        </div>
      </form>

      <ul>
        {filteredTasks.map((task) => {
          return (
            <li key={task.id}>
              <h2>{task.title}</h2>;
              <button onClick={() => removeTask(task.id)}>Remove</button>;
            </li>
          );
        })}
      </ul>
    </div>
  );
}
