import * as dotenv from "dotenv";
dotenv.config();
import { db } from "../database";
import { cards } from "../schema";

type Card = typeof cards.$inferInsert;

const initialCards: Card[] = [
	{ title: "Carte 1" },
	{ title: "Carte 2" },
	{ title: "Carte 3" },
];

async function seed() {
	try {
		await db.delete(cards);
		const existing = await db.select().from(cards).limit(1);
		if (existing.length === 0) {
			await db.insert(cards).values(initialCards);
			console.log("données insérées avec succès !");
		} else {
			console.log("Les données existent déja");
		}
	} catch (error) {
		console.error("Erreur lors de l'insertion des cartes", error);
	}
}

seed();
