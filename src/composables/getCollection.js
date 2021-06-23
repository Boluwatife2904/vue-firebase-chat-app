import { ref } from "vue";
import { formatDistanceToNow } from "date-fns";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const error = ref(null);
  const isLoading = ref(false);
  const documents = ref(null);
  const rooms = ref([]);

  isLoading.value = true;
  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results.map((document) => {
        let time = formatDistanceToNow(document.createdAt.toDate());
        return { ...document, createdAt: time };
      });
      documents.value.forEach((document) => {
        if (rooms.value.indexOf(document.room) === -1) {
          rooms.value.push(document.room);
        }
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

  return { error, isLoading, documents, rooms };
};

export default getCollection;
