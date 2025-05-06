import { Injectable, NotFoundException } from "@nestjs/common";
import { cards } from "../../../packages/db/src/schema";
import { db } from "../../../packages/db/src/database";
import { CreateCardDto } from "./validation/create-card.dto";
import { eq } from "drizzle-orm";
@Injectable()
export class AppService {
	async readAll() {
		try {
			return await db.select().from(cards);
		} catch (err) {
			console.error(err);
		}
	}

	async create(createCardDto: CreateCardDto){
		try{
			const [newCard] = await db.insert(cards).values({title: createCardDto.title, completed: createCardDto.completed ?? false,}).returning();
			return newCard
		}catch(err){
			console.error(err)
		}
	}
	

	async delete(id: number) {
		try {
			const card = await db.select().from(cards).where(eq(cards.id, id));
			if (card.length === 0) {
				throw new Error("Carte non trouvée");
			}
			 await db.delete(cards).where(eq(cards.id, id));
			return { message: "Carte supprimée avec succès" };
		} catch (err) {
			console.error(err);
		}
	}

	async updateTitle(id: number, updateTitleDto: CreateCardDto){
		try {
			const card = await db.select().from(cards).where(eq(cards.id, id))
			if(card.length === 0){
				throw new NotFoundException("Carte non trouvé");
			}
			const updatedTitle = await db.update(cards).set({title: updateTitleDto.title}).where(eq(cards.id, id)).returning();
			return updatedTitle[0]; 
		}catch(err){
			console.error(err)
			throw new Error("Problème lors de la modification du titre")
		}
	}

	async updateChecked(id: number, data: {completed: boolean}){
		try {
			const card = await db.select().from(cards).where(eq(cards.id, id))
			if(card.length === 0 ){
				throw new NotFoundException("Carte non trouvée");
			}
			const updated = await db.update(cards).set({completed: data.completed}).where(eq(cards.id, id)).returning();
			return updated[0]
		} catch(err){
			console.error(err)
			throw new Error("Problème lors de la modification de la checkbox")
		}
	}
}
