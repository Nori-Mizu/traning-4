import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hello, setHello] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/");
      const data = await response.json();
      setHello(data);
      console.log(data);
    }
    fetchData();
  }, []);

  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    async function fetchtaskData() {
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      setTaskData(data);
      console.log(data);
    }
    fetchtaskData();
  }, []);

  console.log(taskData);

  const [assignee, setAssignee] = useState("");
  const [task, setTask] = useState("");
  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
    console.log(assignee);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
    console.log(task);
  };

  const handleSend = () => {
    // メッセージと日時をサーバーに送信
    const created_at = new Date().toISOString();

    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignee, task, created_at }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        // 送信後に表示を更新
        setTaskData([...taskData, newTask]);
        console.log(newTask);
        setTask("");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  //日時の表示形式変更
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }
  return (
    <>
      <h1>{hello.text}</h1>
      {/* {typeof backendData.users === "undefined" ? (
        <p>Now Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )} */}
      <h1>TODOリスト</h1>
      <table>
        <thead>
          <tr>
            <th>Completed</th>
            <th>ID</th>
            <th>Assignee</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((task, i) => (
            <tr key={i}>
              <td>{task.completed}</td>
              <td>{task.id}</td>
              <td>{task.assignee}</td>
              <td>{task.task}</td>
              <td>{formatDate(task.due_date)}</td>
              <td>{formatDate(task.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <input
          type="text"
          value={assignee}
          onChange={handleAssigneeChange}
          placeholder="ここに名前"
        />

        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder="ここにタスク"
        />

        <button onClick={handleSend}>投稿！！</button>
      </div>
    </>
  );
}

export default App;
