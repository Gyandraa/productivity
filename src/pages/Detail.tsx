import { useNavigate, useParams } from "react-router-dom";
import { dataTasks, editTask } from "../data/tasks";
import { useEffect, useState } from "react";

type TaskId = {
  id: number;
  title: string;
  isDone: boolean;
};

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const taskId = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;

  const navigate = useNavigate();
  const [taskItem, setTaskItem] = useState<TaskId | null>(null);
  const [title, setTitle] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const foundTask = dataTasks.find((task) => task.id === taskId);
    if (foundTask) {
      setTaskItem(foundTask);
      setTitle(foundTask.title);
      setIsDone(foundTask.isDone);
    }
  }, [taskId]);

  if (!taskItem) { 
    return <div className="container mx-auto">Task not found</div>; 
  } 

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const handleSave = () => {
    editTask(Number(id), {
      title: title,
      isDone: isDone,
    });
    setIsEdit(false);
    navigate("/");
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h1>{taskItem?.title}</h1>
          </div>

          <button onClick={handleEdit}>Edit</button>
        </div>

        {isEdit && (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
