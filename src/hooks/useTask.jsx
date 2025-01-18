import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTask = () => {
  const axiosPublic = useAxiosPublic();

  const { data: task = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['task'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tasks');
      return res.data;
    },
  });

  return [task, loading, refetch];
};

export default useTask;
