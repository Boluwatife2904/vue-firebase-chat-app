import { ref } from "vue";
import { projectAuth } from "@/firebase/config";

const error = ref(null);
const isLoading = ref(false);

const signup = async (email, password, displayName) => {
  error.value = null;
  isLoading.value = true;
  try {
    const response = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!response) {
      throw new Error("Couldn't complete the signup process!");
    }
    await response.user.updateProfile({ displayName });
    error.value = null;
    isLoading.value = false;
    return response;
  } catch (err) {
    error.value = err.message;
    isLoading.value = false;
  }
};

const signupAction = () => {
  return { error, signup, isLoading };
};

export default signupAction;
