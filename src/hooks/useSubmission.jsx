import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSubmission = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  
  const { data: submission = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['submission'],
    queryFn: async () => {
      const res = await axiosPublic.get('/submission');
      return res.data;
    },
  });

  return { submission, refetch, queryClient };
};

export default useSubmission;
