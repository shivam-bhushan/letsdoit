import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlinePlus } from "react-icons/ai";

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center justify-between shadow-sm bg-[#84a98c] rounded-full px-4 py-2 m-4 w-80"
    >
      <div className="flex flex-col items-center justify-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add Task"
          required
          className="bg-[#84a98c] text-white placeholder-gray-200 px-1 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#84a98c] focus:ring-opacity-50"
        />
      </div>
      <button type="submit" className="rounded-full bg-[#52796f] shadow-md">
        <AiOutlinePlus color="white" />
      </button>
    </form>
  );
}

AddTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
