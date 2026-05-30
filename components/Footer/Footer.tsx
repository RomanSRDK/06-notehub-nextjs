import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Roman Serdiuk</p>
          <p>
            {`Contact me: `}
            <Link href="mailto:roman.srdk@notehub.app">
              roman.srdk@notehub.app
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
