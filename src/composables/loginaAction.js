import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref(null);
const isLoading = ref(false);

const login = async (email, password) => {
  error.value = null;
  try {
    isLoading.value = true;
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );
    if(!response) {
      throw new Error("Error logging you in...")
    }
    error.value = null;
    isLoading.value = false;
    return response;
  } catch (err) {
    error.value = err.message;
    isLoading.value = false;
  }
};

const loginAction = () => {
  return { error, login, isLoading };
};

export default loginAction;
