import { useEffect, useState } from "react";
import { GetSearch } from "Services/metadata.service";

export default function useSearchBar(search = "") {
	const [state, setState] = useState({
		isLoading: true,
		data: [],
		dataFilter: [],
	});

	useEffect(() => {
		const controller = new AbortController();

		const onMount = async () => {
			const { signal } = controller;
			try {
				const data = await GetSearch(signal);

				setState((c) => ({ ...c, isLoading: false, data: data }));
			} catch (err) {}
		};

		onMount();

		return () => {
			controller.abort();
		};
	}, []);

	useEffect(() => {
		const onFilter = (search) => {
			if (search.length > 0) {
				const dataStartWith = state.data.filter((collection) => collection.name.toUpperCase().startsWith(search.toUpperCase()));
				const names = dataStartWith.map((o) => o.name);

				const dataIncludes = state.data.filter(
					(collection) => collection.name.toUpperCase().includes(search.toUpperCase()) && !names.includes(collection.name)
				);

				setState((c) => ({ ...c, dataFilter: [...dataStartWith, ...dataIncludes] }));
			}
		};

		onFilter(search);
	}, [search, state.data]);

	return [state.isLoading, state.dataFilter];
}
