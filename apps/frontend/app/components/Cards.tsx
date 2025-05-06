import { useState } from "react";
import "../styles/cards.css";
import type { cardType } from "../types/cards";
import { minLength } from "class-validator";

function Cards({
  title,
  id,
  completed,
  lengthTitle,
  onUpdate,
  onDelete,
  onChecked,
}: cardType) {
  const [isVisible, setIsVisible] = useState(false);
  const [updateCard, setUpdateCard] = useState(title);
  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };
  const handleSave = () => {
    onUpdate(id, updateCard);
    setIsVisible(false);
  };

  return (
    <section className="container-cards">
      <input
        type="checkbox"
        aria-label="checkbox"
        checked={completed}
        onChange={() => onChecked(id, !completed)}
      />
      {isVisible ? (
        <input
          className="container-modif-visible"
          maxLength={20}
          minLength={3}
          type="text"
          value={updateCard}
          onChange={(el) => setUpdateCard(el.target.value)}
        />
      ) : (
        <h3>{title}</h3>
      )}
      <section>
        <p>Status: {!completed ? "⏳ À faire" : "✅ Fait"}</p>
      </section>
      <section>
        {isVisible === true ? (
          <button
            onClick={handleSave}
            type="button"
            disabled={
              updateCard.trim() === "" ||
              updateCard.length > lengthTitle ||
              updateCard.length < 5
            }
          >
            Valider
          </button>
        ) : (
          <button type="button" onClick={() => onDelete(id)}>
            Supp
          </button>
        )}
        <button type="button" onClick={handleVisible}>
          Modif
        </button>
      </section>
    </section>
  );
}
export default Cards;
