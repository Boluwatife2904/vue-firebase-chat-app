import { ref, watchEffect } from "vue";
import { formatDistanceToNow } from "date-fns";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const error = ref(null);
  const isLoading = ref(false);
  const documents = ref(null);

  isLoading.value = true;
  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results.map((document) => {
        let time = formatDistanceToNow(document.createdAt.toDate());
        return { ...document, createdAt: time };
      });
      error.value = null;
      isLoading.value = false;
    },
    (err) => {
      error.value = err.message || "Could not load messages";
      documents.value = null;
      isLoading.value = false;
    }
  );

  watchEffect((onInvalidate) => {
    // Unsubscribing frm previous collection when component is unmounted
    onInvalidate(() => unsub());
  })

  return { error, isLoading, documents };
};

export default getCollection;
