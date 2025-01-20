import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useSubmission= () => {
  const axiosPublic = useAxiosPublic();

  const { data: task = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['submission'],
    queryFn: async () => {
      const res = await axiosPublic.get('/submission');
      return res.data;
    },
  });

  return [task, loading, refetch];
};

export default useSubmission;
