"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDebounce } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import Loading from "../loading";

import css from "./page.module.css";

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 800);

  const { isPending, data } = useQuery({
    queryKey: ["notes", { page: currentPage, search: debouncedSearch }],
    queryFn: () => fetchNotes({ page: currentPage, search: debouncedSearch }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [data]);

  //MODAL WINDOW
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //MODAL WINDOW

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    setcurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox inputValue={searchText} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            onPageChange={setcurrentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isPending && <Loading />}
      {data && data.notes.length > 0 && <NoteList allNotes={data.notes} />}
      <Toaster />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
