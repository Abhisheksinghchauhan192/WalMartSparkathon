
const getCategoryEmoji = (category) => {
  const emojiMap = {
    Electronics: "🔌",
    Clothing: "👕",
    Toys: "🧸",
    Books: "📚",
    Grocery: "🛒",
    Furniture: "🪑",
    Beauty: "💄",
    Uncategorized: "📦",
  };
  return emojiMap[category] || "🛍️";
};

export default getCategoryEmoji;
