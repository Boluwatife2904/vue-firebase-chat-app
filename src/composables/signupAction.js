import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;
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
    return response;
  } catch (err) {
    error.value = err.message;
  }
};

const signupAction = () => {
  return { error, signup };
};

export default signupAction;
