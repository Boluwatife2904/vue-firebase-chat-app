import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isLoading = ref(false);

  const addDocument = async (document) => {
    isLoading.value = true;
    error.value = null;
    try {
      await projectFirestore.collection(collection).add(document);
      isLoading.value = false;
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteDocument = async (id) => {
    await projectFirestore
      .collection(collection)
      .doc(id)
      .delete();
  };

  return { error, addDocument, deleteDocument, isLoading };
};

export default useCollection;
