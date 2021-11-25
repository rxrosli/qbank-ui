import IOption from "./IOptions";

interface IQuestion {
	uuid: string;
	type: string;
	stem: string;
	options: IOption[];
	tags: string[];
}

export default IQuestion;
