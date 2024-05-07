import { useState } from "react";
import { dataTasks } from "../data/tasks";
import { Link } from "react-router-dom";

export function Tasks() {
  const [tasks, setTasks] = useState(dataTasks);
  const [newTask, setNewTask] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  function searchTask(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyword(event.target.value.toLowerCase());
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
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
    <div className="container mx-auto py-4">
      <form className="mb-4">
        <label htmlFor="searchTask" className="mr-2">
          Search:
        </label>
        <input
          type="text"
          id="searchTask"
          value={searchKeyword}
          onChange={searchTask}
          placeholder="Search Study"
          className="border border-gray-300 rounded px-2 py-1"
        />
      </form>

      <form onSubmit={addTask} className="mb-4">
        <div className="flex items-center">
          <label htmlFor="title" className="mr-2">
            Add New Task:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask}
            onChange={handleInputChange}
            placeholder="Add new"
            className="border border-gray-300 rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded ml-2"
          >
            Add
          </button>
        </div>
      </form>

      <ul>
        {filteredTasks.map((task) => {
          return (
            <li
              key={task.id}
              className="flex justify-between items-center border-b border-gray-300 py-2"
            >
              <Link
                to={`/detail/${task.id}`}
                className="text-blue-500 hover:underline"
              >
                {task.title}
              </Link>
              <div>
                <button
                  onClick={() => removeTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
