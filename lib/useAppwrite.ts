import { useState, useEffect } from "react";
import { Alert } from "react-native";

export default function useAppwrite<T> (fn: () => Promise<T>) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true); 

	const fetchData = async () => {
		setLoading(true);
		try{
			const res = await fn();
			setData(res);
		} catch(err) {
			Alert.alert('Error', err as string);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchData()
	}, []);

	const refetch = async () => await fetchData();
	return { data, loading, refetch };
}
