import { useState } from "react";
import { dataStudys } from "../data/studys";

export function Studys() {
  const [studys, setStudys] = useState(dataStudys);
  const [newStudy, setNewStudy] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  function searchStudy(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredStudys = studys.filter((study) =>
    study.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewStudy(event.target.value);
  }

  function addStudy(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newStudy.trim() !== "") {
      const lastId = studys[studys.length - 1].id;
      const newStudyData = {
        id: lastId + 1,
        title: newStudy,
        isDone: false,
      };
      setStudys([...studys, newStudyData]);
      setNewStudy("");
    }
  }

  function removeStudy(id: number) {
    const updatedStudys = studys.filter((study) => study.id !== id);
    setStudys(updatedStudys);
  }

  return (
    <div>
      <form>
        <label htmlFor="searchStudy"></label>
        <input 
        type="text"
        id="searchStudy"
        value={searchQuery}
        onChange={searchStudy}
        placeholder="Search Study" 
        />
      </form>
      <form onSubmit={addStudy}>
        <div>
          <label htmlFor="title">Add New Study</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newStudy}
            onChange={handleInputChange}
            placeholder="Add new"
          />
        </div>

        <div>
          <button type="submit">Add New Study</button>
        </div>
      </form>

      <ul>
        {filteredStudys.map((study) => {
          return (
            <li key={study.id}>
              <h2>{study.title}</h2>;
              <button onClick={() => removeStudy(study.id)}>Remove</button>;
            </li>
          );
        })}
      </ul>
    </div>
  );
}
