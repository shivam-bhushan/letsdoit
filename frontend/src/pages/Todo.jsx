/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import axios from "axios";
import AddTaskForm from "../components/AddTaskForm";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function Todo() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchTasks(userId);
  }, []);

  const fetchTasks = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in.");
      return;
    }

    axios
      .get(`https://letsdoit-4ttj.onrender.com/api/tasks/getTask`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-ID": userId,
        },
      })
      .then((response) => {
        console.log(
          "Task IDs in list:",
          response.data.map((task) => task.id)
        );
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks. Please try again.");
      });
  };

  const addTask = (title) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in.");
      return;
    }

    axios
      .post(
        `https://letsdoit-4ttj.onrender.com/api/tasks/addTask`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        fetchTasks(localStorage.getItem("userId"));
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Failed to add task. Please try again.");
      });
  };

  const removeTask = (taskId) => {
    console.log("Received Task ID for deletion:", taskId);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in.");
      return;
    }
    if (!taskId) {
      console.error("Task ID is undefined.");
      alert("Cannot delete task: No task ID provided.");
      return;
    }

    axios
      .delete(
        `https://letsdoit-4ttj.onrender.com/api/tasks/deleteTask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        console.log("Task deleted successfully");
        fetchTasks(localStorage.getItem("userId"));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-[#617F80] font-bold pb-2">Let's Do It</h1>

      {/* add task */}
      <AddTaskForm onAddTask={addTask} />

      {/* tasks */}
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            title={task.title}
            id={task._id}
            removeTask={() => removeTask(task._id)}
          />
        ))}
      </div>
    </div>
  );
}
export default Todo;
