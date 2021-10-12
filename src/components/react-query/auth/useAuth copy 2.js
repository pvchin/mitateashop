import { axiosInstance } from "../axiosInstance";
import { useCustomToast } from "../../helpers/useCustomToast";
import { useUsers } from "../users/useUsers";

export function useAuth() {
  const SERVER_ERROR = "There was an error contacting the server.";
  const toast = useCustomToast();
  const { clearUser, updateUser } = useUsers();

  async function authServerCall(urlEndpoint, email, password) {
    try {
      const { data, status } = await axiosInstance({
        url: urlEndpoint,
        method: "POST",
        data: { email, password },
        headers: { "Content-Type": "application/json" },
      });

      if (status === 400) {
        toast({ title: data.message, status: "warning" });
        return;
      }

      if (data?.user?.token) {
        toast({
          title: `Logged in as ${data.user.email}`,
          status: "info",
        });

        // update stored user data
        updateUser(data.user);
      }
    } catch (errorResponse) {
      toast({
        // title: errorResponse?.response?.data?.message || SERVER_ERROR,
        title: errorResponse || SERVER_ERROR,
        status: "error",
      });
    }
  }

  async function signin(email, password) {
    authServerCall("/signin", email, password);
  }
  async function signup(email, password) {
    authServerCall("/user", email, password);
  }

  function signout() {
    // clear user from stored user data
    clearUser();
    toast({
      title: "Logged out!",
      status: "info",
    });
  }

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
}
