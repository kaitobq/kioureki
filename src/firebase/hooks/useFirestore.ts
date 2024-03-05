import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { FirebaseApp } from "../FirebaseConfig";
import { injury } from "@/components/types/injury";

export const useFirestore = (data: string) => {
  const [documents, setDocuments] = useState<injury[]>([]);

  useEffect(() => {
    const firestore = FirebaseApp.firestore;
    const docRef = collection(firestore, data);
    const unsub = onSnapshot(docRef, (snapshot) => {
      let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setDocuments(results);
    });
    return () => unsub();
  }, [data]);

  return { documents };
};
