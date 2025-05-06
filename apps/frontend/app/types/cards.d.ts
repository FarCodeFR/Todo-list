export type cardType = {
	id: number;
	title: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
	lengthTitle: checked;
	onChecked: (id: number, completed: boolean) => void;
	onDelete: (id: number) => void;
	onUpdate: (id: number, title: string) => void;
};
