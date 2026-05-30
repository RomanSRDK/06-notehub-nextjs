import css from "./SearchBox.module.css";

interface SearchBoxProps {
  inputValue: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ inputValue, onChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
