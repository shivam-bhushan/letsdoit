// export default TaskLists;
import { useState, useEffect } from "react";
import axios from "axios";
import AddListForm from "../components/AddListForm";
import ListCard from "../components/ListCard";
import { useNavigate } from "react-router-dom";

// Update this to match your server's address and port
const API_BASE_URL = "http://localhost:3000/api";

const TaskLists = () => {
  const [lists, setLists] = useState([]);
  // const [newListTitle, setNewListTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetchLists(userId);
  }, []);

  const fetchLists = async (userId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in.");
      return;
    }
    await axios
      .get(`${API_BASE_URL}/lists/getLists`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "User-ID": userId,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Lists fetched successfully:", response.data);
        setLists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching lists:", error);
        alert("Error fetching lists");
      });
  };

  const addList = async (title) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in.");
      return;
    }

    axios
      .post(
        `${API_BASE_URL}/lists/addList`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        fetchLists(localStorage.getItem("userId"));
      })

      .catch((error) => {
        console.error("Error adding task:", error);
        alert("Failed to add task. Please try again.");
      });
    // if (!newListTitle.trim()) return;
    // try {
    //   const response = await axios.post(
    //     `${API_BASE_URL}/lists/addList`,
    //     { title: newListTitle },
    //     {
    //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     }
    //   );
    //   setLists([...lists, response.data.list]);
    //   setNewListTitle("");
    // } catch (error) {
    //   console.error("Error adding list:", error);
    // }
  };

  const removeList = async (listId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication error. Please log in.");
      return;
    }
    if (!listId) {
      alert("List not found");
      return;
    }

    axios
      .delete(`${API_BASE_URL}/lists/deleteList/${listId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log("List deleted successfully");
        fetchLists(localStorage.getItem("userId"));
      })
      .catch((err) => {
        console.error("Error deleting list:", err);
        alert("Failed to delete list. Please try again.");
      });
  };

  // const fetchTasks = async (listId) => {
  //   try {
  //     const response = await axios.get(
  //       `${API_BASE_URL}/lists/getListTasks/${listId}`,
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };

  const navigateToList = (listId) => {
    navigate("/todo", { state: { listId: listId } });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold  pb-10">
        Hi Shivam,
        <br />
        Here Are Your Lists!
      </h2>

      <div className="h-full w-full flex justify-center lg:justify-start gap-5 flex-wrap">
        <AddListForm onAddList={addList} />

        {lists.map((list) => (
          <ListCard
            key={list._id}
            title={list.title}
            id={list._id}
            removeList={() => removeList(list._id)}
            goToList={() => navigateToList(list._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskLists;
