import React from "react";

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  const { id, name, image, likes } = toy;

  // Sends DELETE request to remove the toy from db, then calls onDeleteToy callback to sync UI state
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

  // Sends PATCH request to increment toy likes count, then calls onLikeToy callback to sync UI state
  function handleLike() {
    const updatedLikes = { likes: likes + 1 };

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedLikes)
    })
      .then((res) => res.json())
      .then((data) => {
        onLikeToy(data);
      })
      .catch((err) => console.error("Error liking toy:", err));
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
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
