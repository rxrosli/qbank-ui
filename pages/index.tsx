import { useRouter } from "next/router";
import { useEffect } from "react";
import { authenticated } from "../utilities/services";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		if (!authenticated()) {
			router.push("/login");
			return;
		}
		router.push("/questions");
	}, []);
	return null;
}
