import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";


const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

function Navbar() {
  return (
    <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Image src="/public/images/logo.png" alt="Dev by Sam" width={100} height={50} />
        </div>
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Navbar;