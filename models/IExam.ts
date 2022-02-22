import IQuestion from "./IQuestion";

export default interface IExam {
	_id?: string;
	title: string;
	description: string;
	author: string;
	settings: { [key: string]: string };
	questions: IQuestion[];
	updatedAt: string;
}
