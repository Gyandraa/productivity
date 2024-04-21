import { study } from "../data/study";

export function Study() {
  return (
    <ul>
      {study.map((study) => {
        return <li key={study.id}>{study.title}</li>;
      })}
    </ul>
  );
}