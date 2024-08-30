import PropTypes from "prop-types"; // Import PropTypes
import { AiOutlineDelete } from "react-icons/ai";

function TaskCard({ title, id, removeTask }) {
  return (
    <div className="flex flex-row justify-between items-center p-3 mb-3 bg-[#52796f] rounded-full shadow-sm w-80">
      <div className="flex flex-col items-start ms-2">
        <h4 className="font-medium text-lg">{title}</h4>
      </div>
      <button
        onClick={() => removeTask(id)}
        className="bg-[#84a98c] p-2 rounded-full shadow-lg"
      >
        <AiOutlineDelete color="white" size="1.2em" />
      </button>
    </div>
  );
}

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeTask: PropTypes.func.isRequired,
};

export default TaskCard;
