import React from "react";

function ToyCard({ toy, onDeleteToy }) {
  const { id, name, image, likes } = toy;

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (res.ok) {
          onDeleteToy(id);
        } else {
          console.error("Failed to delete toy");
        }
      })
      .catch((err) => console.error("Error deleting toy:", err));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
