import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Navigation from "../../components/layout/Navigation";
import IExam from "../../models/IExam";
import {
	authenticated,
	fetchApi,
	FetchApiEvents,
	FetchApiParams,
	refreshToken
} from "../../services/fetch";

export default function Exam() {
	const router = useRouter();
	const { id } = router.query;
	const [isNavActive, setNavActive] = useState(false);
	const [exam, setExam] = useState<IExam>();
	const uri: string = "/exams/" + id;

	const events: FetchApiEvents = {
		onSuccess: async data => {
			console.log(JSON.stringify(data, null, 2));
		},
		onError: async error => {
			console.log(JSON.stringify(error, null, 2));
		},
		onTokenExpired: () => refreshToken()
	};

	async function handleOnSaveClick(exam: IExam) {
		const apiParams: FetchApiParams = {
			uri: uri,
			method: "PATCH",
			body: exam
		};
		await fetchApi(apiParams, events);
	}

	async function handleOnDeleteClick() {
		const apiParams: FetchApiParams = {
			uri: uri,
			method: "DELETE",
			body: {}
		};
		await fetchApi(apiParams, events);
		Router.push("/questions");
	}

	useEffect(() => {
		if (!authenticated()) {
			Router.push("/login");
			return;
		}
		if (!id) {
			return;
		}
		() => {
			const apiParams: FetchApiParams = {
				uri: uri,
				method: "GET",
				body: {}
			};
			fetchApi(apiParams, events);
		};
	}, [id]);

	return exam ? (
		<div>
			<Header heading={`Question / ${exam._id}`} onMenuClick={() => setNavActive(true)} />
			<Navigation isActive={isNavActive} onCollapseClick={() => setNavActive(false)} />
		</div>
	) : (
		<div>loading...</div>
	);
}
