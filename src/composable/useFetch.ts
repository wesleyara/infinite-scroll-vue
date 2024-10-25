/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
import { ref } from "vue";

export const useFetch = () => {
  const limit = 30;
  const skip = ref(0);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: async ({ queryKey }) => {
      const [_, limit, skip] = queryKey;

      const response = await axios.get(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      );

      return response.data.users;
    },
  });

  return { data, isLoading, skip };
};
