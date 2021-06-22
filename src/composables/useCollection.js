import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);

  const addDocument = (document) => {
    error.value = null;
    try {
      projectFirestore.collection(collection).add(document);
    } catch (err) {
      error.value = err.message;
    }
  };
  return { error, addDocument };
};

export default useCollection;
