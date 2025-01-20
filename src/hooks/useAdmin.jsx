import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; // assuming you have this for secure API calls

const useAdmin = () => {
    const axiosSecure = useAxiosSecure(); // Secure Axios instance

    // Query to fetch the user role (admin status) based on user email
    const { data: role, isLoading } = useQuery({
        queryKey: ["role"], // Query key (used for caching)
        queryFn: async () => {
           // const response = await axiosSecure.get("/users/role"); // Adjust your API endpoint
            return response.data?.role; 
        },
        refetchOnWindowFocus: false, // Optionally disable refetching when window is focused
        retry: false, 
    });

    if (isLoading) {
        return ["", true]; // Return an empty role and loading state
    }

    return [role, isLoading]; // Return the role and loading state
};

export default useAdmin;
