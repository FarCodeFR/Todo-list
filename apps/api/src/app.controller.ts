import {
	Controller,
	Get,
	Post,
	HttpCode,
	HttpStatus,
	Body,
	Delete,
	Put,
	Param,
	BadRequestException,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateCardDto } from "./validation/create-card.dto";

@Controller("cards")
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	async readAllCards() {
		try {
			return await this.appService.readAll();
		} catch (err) {
			console.error(err);
		}
	}

	@Post()
	async create(@Body() createCardDto: CreateCardDto){
		try{
			const newCard = await this.appService.create(createCardDto);
			return newCard;
		}catch(err){
			console.error(err)
		}
	}

	@Delete(":id")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteCard(@Param('id') id: string) {
		try {
			console.log("Tentative suppression carte avec id:", id);
			const response = await this.appService.delete(Number(id));
			return response;
		} catch (err) {
			console.error(err);
		}
	}



	@Put(":id")
	async updateCompleted(
		@Param("id") id: string, 
		@Body() body: {completed: boolean, title:string})
		{
			const cardId = parseInt(id, 10);
			if (isNaN(cardId)) 
				throw new BadRequestException("ID invalide");
			if (body.title !== undefined) {
				return await this.appService.updateTitle(cardId, { title: body.title });
			}
			if (body.completed !== undefined) {
				return await this.appService.updateChecked(cardId, { completed: body.completed });
			}
			throw new BadRequestException("Aucune donnée à mettre à jour");
		}
}
