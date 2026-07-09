import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  // Controlled form inputs state
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // Submit handler to send POST request to the backend for creating a new toy
  function handleSubmit(e) {
    e.preventDefault();
    const newToy = {
      name,
      image,
      likes: 0
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
      .then((res) => res.json())
      .then((data) => {
        // Update parent state with the new toy object and reset input fields
        onAddToy(data);
        setName("");
        setImage("");
      })
      .catch((err) => console.error("Error creating toy:", err));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
