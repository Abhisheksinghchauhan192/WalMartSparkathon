
import React from "react";
import getCategoryEmoji from "../utils/emoji";

const CategoryTitle = ({ category }) => {
  return (
    <h2 className="text-2xl font-bold mb-4 text-blue-800">
      {getCategoryEmoji(category)} {category}
    </h2>
  );
};

export default CategoryTitle;
