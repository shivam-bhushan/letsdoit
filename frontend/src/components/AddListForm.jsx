import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import PropTypes from "prop-types";

function AddListForm({ onAddList }) {
  const [title, setTitle] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
    onAddList(title);
    setTitle("");
  };
  return (
    <form
      onSubmit={handelSubmit}
      className="flex relative flex-col rounded-3xl items-center justify-center w-36 h-36 bg-gray-50 shadow-lg overflow-hidden"
    >
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="text-gray-400 font-bold text-lg placeholder-gray-300 w-24 text-center bg-gray-50 focus:outline-none"
        placeholder="NewList"
      />
      <button
        type="submit"
        className=" absolute flex items-center justify-center w-15 h-8 rounded-full bottom-2 right-2 bg-gray-600"
      >
        <FiPlus size={18} />
      </button>
    </form>
  );
}

AddListForm.propTypes = {
  onAddList: PropTypes.func.isRequired,
};

export default AddListForm;
