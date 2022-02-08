import IQuestion from "./IQuestion";

export interface IExam {
	title: string;
	description: string;
	author: string;
	settings: { [key: string]: string };
	questions: IQuestion[];
}
