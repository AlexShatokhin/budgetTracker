const useStorage = () => {
    const setItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
    const getItem = (key: string) => JSON.parse(localStorage.getItem(key) as string);
    const removeItem = (key: string) => localStorage.removeItem(key);

    return {setItem, getItem, removeItem};
}

export default useStorage;