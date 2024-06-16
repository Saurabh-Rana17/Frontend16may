import { useQuery } from "@tanstack/react-query";
import { BaseUrl } from "../utility/CONSTANT";

const useFetch = (url) => {
  async function fetchData() {
    const response = await fetch(BaseUrl + url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${response.status}  ${response.statusText}`
      );
    }
    return response.json();
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: [url],
    queryFn: fetchData,
    // staleTime: staleTimeValue,
    refetchOnWindowFocus: false,
  });

  return { data, isPending, isError, error };
};

export default useFetch;
