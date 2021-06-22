import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const error = ref(null);
  const documents = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
      // const autoScrollBottom = () => {
      //   const chatContainer = document.querySelector("#messages");
      //   chatContainer.scrollTop = chatContainer.scrollHeight;
      // };
      // if (documents.value) {
      //   autoScrollBottom();
      // }
    },
    (err) => {
      error.value = err.message || "COuld not load messages";
      documents.value = null;
    }
  );

  return { error, documents };
};

export default getCollection;
