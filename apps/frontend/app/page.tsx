"use client";
import { useEffect, useState } from "react";
import Cards from "./components/Cards";
import styles from "./page.module.css";
import type { cardType } from "./types/cards";

export default function Home() {
  const [cards, setCards] = useState<cardType[]>([]);
  const [newCard, setNewCard] = useState<string>("");
  const [lengthLetter, setLengthLetter] = useState(20);

  //* ALL CARDS

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur dans la réponse du serveur");
        }
        return res.json();
      })
      .then((data) => setCards(data))
      .catch((err) => {
        console.error("Erreur lors du chargement des cartes", err);
      });
  }, []);

  //* ADD FUNCTION

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCard.trim() === "" || newCard.length > lengthLetter) {
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newCard,
          completed: false,
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la carte");
      }
      const createCard = await response.json();
      setCards((prev) => [...prev, createCard]);
      setNewCard("");
    } catch (err) {
      console.error(err);
    }
  };

  //* UPDATE FUNCTION

  const handleUpdateTitle = async (id: number, newTitle: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newTitle }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du titre");
      }
      const updatedCard = await response.json();
      setCards((prev) =>
        prev.map((card) => (card.id === id ? updatedCard : card))
      );
    } catch (err) {
      console.error(err);
    }
  };

  //* DELETE FUNCTION

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cards/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la carte");
      }
      setCards((prevCard) => prevCard.filter((card) => card.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de la carte", err);
    }
  };

  //* CHECKED FUNCTION

  const handleCheckedCompleted = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cards/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed }),
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut");
      }
      const updatedCard = await response.json();
      setCards((prevCard) =>
        prevCard.map((card) => (card.id === id ? updatedCard : card))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className={styles["container-navigation"]}>
        <h1>Todo List</h1>
      </header>
      <main className={styles["container-form"]}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="notes">Notes</label>
          <div>
            <input
              type="text"
              name="notes"
              value={newCard}
              onChange={(e) => setNewCard(e.target.value)}
              placeholder="Entrer une nouvelle tâche"
            />
            <button
              type="submit"
              disabled={newCard.length < 5 || newCard.length > lengthLetter}
            >
              Ajouter
            </button>
          </div>
        </form>
        {newCard.length >= lengthLetter && (
          <p style={{ fontSize: "20px", color: "red" }}>
            {lengthLetter} caractères maximum
          </p>
        )}
        {newCard.length <= 4 && (
          <p style={{ fontSize: "20px", color: "red" }}>5 caractères minimum</p>
        )}
        <h2>Tâche à faire</h2>
        {cards.map((el) => {
          return (
            <Cards
              key={el.id}
              title={el.title}
              completed={el.completed}
              id={el.id}
              createdAt={el.createdAt}
              updatedAt={el.updatedAt}
              lengthTitle={lengthLetter}
              onDelete={handleDelete}
              onChecked={handleCheckedCompleted}
              onUpdate={handleUpdateTitle}
            />
          );
        })}
      </main>
    </>
  );
}
