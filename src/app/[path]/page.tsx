"use client";
import { db } from "@/firebase/config";
import { RealtimeNote } from "@/types/realtime-note";
import { onValue, ref, set } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const [path, setPath] = useState<string>("");
  const [note, setNote] = useState<RealtimeNote | null>(null);

  const saveNote = useCallback(async (note: RealtimeNote) => {

    const noteRef = ref(db, `notes/${path}`);
    await set(noteRef, note)
      .then(() => {
        console.log("Note saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving note: ", error);
      });
  }, [path]);

  const loadNote = (noteId: string) => {
    const noteRef = ref(db, 'notes/' + noteId);
  
    onValue(noteRef, (snapshot) => {
      if (snapshot.exists()) {
        setNote({content: snapshot.val().content, lastUpdated: snapshot.val().lastUpdated} as RealtimeNote);
      } else {
        console.log('No data available');
        setNote({content: '', lastUpdated: Date.now()} as RealtimeNote);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({
      content: e.target.value || '',
      lastUpdated: Date.now(),
    } as RealtimeNote);
  };

  useEffect(() => {
    const resolvePath = async () => {
      const { path } = await params;
      setPath(path);
      loadNote(path);
    };
    resolvePath();
  }, [params]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (note) {
        saveNote(note);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [note, saveNote]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center font-work-sans">
      <textarea value={note?.content} onChange={handleChange} className="w-full h-full border-2 border-border focus:outline-none resize-none" />
    </div>
  );
}
