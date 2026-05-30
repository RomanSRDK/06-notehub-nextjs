import { NewNote, Note } from "@/types/note";
import axios from "axios";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string = "",
  perPage: number = 12,
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: { page: page, search: search.trimStart(), perPage: perPage },
  });
  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${noteId}`);
  return data;
};
