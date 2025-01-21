
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    return [users, refetch]
};

export default useUsers;