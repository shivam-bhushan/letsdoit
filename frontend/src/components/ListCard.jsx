import PropTypes from "prop-types"; // Import PropTypes
import { AiOutlineDelete } from "react-icons/ai";

function ListCard({ title, id, removeList, goToList }) {
  return (
    <div
      onClick={() => goToList(id)}
      className="flex relative flex-col rounded-3xl items-center justify-center w-36 h-36 bg-gray-50 shadow-lg overflow-hidden"
    >
      <h1 className="text-gray-400 font-bold text-lg">{title}</h1>
      <button
        className=" absolute flex items-center justify-center w-15 h-8 rounded-full bottom-2 right-2 bg-gray-600"
        onClick={(e) => {
          e.stopPropagation();
          removeList(id);
        }}
      >
        <AiOutlineDelete color="white" size="1.2em" />
      </button>
    </div>
  );
}

ListCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeList: PropTypes.func.isRequired,
  goToList: PropTypes.func.isRequired,
};

export default ListCard;
