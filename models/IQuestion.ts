import IOption from "./IOptions";

interface IQuestion {
	_id?: string;
	type: string;
	stem: string;
	options: IOption[];
	tags: string[];
}

export default IQuestion;
