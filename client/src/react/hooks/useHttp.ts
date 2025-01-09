import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (url : string, method = "GET", body : string | null = null, headers : Record<string, string> = {"Content-type": "application/json"}) => {
        setLoading(true);
        setError(null);


        try {
            const response = await fetch(url, {method, headers, body, credentials: "include"});
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            return await response.json();
        } catch (err : any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error,fetchData };
};

export default useHttp;