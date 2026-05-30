"use client";

import { useParams } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import css from "./NoteDetailsClient.module.css";

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();

  const { data } = useQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
    refetchOnMount: false,
  });

  return (
    data && (
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{data.title}</h2>
            </div>
            <p className={css.tag}>{data.tag}</p>
            <p className={css.content}>{data.content}</p>
            <p className={css.date}>{data.createdAt}</p>
          </div>
        </div>
      </main>
    )
  );
}
