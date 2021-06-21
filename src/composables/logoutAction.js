import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const logout = async () => {
  error.value = null;
  try {
    await projectAuth.signOut();
  } catch (err) {
    error.value = err.message;
  }
};

const logoutAction = () => {
  return { logout, error };
};

export default logoutAction;
