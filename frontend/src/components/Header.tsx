import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "./auth/AuthContext"
import styles from "../css/Header.module.css"
import { useNavigate } from "react-router-dom"

export default function Header() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  if (!auth) return null

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <header className={styles.header}>

      <div className={styles.userArea} ref={dropdownRef}>
        <span
          className={styles.username}
          onClick={() => setOpen(!open)}
        >
          Olá, {auth.user?.perfil?.nome || "Usuário"} ▼
        </span>

        {open && (
          <div className={styles.dropdown}>
            <button
              className={styles.logout}
              onClick={auth.logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.addButton}
          onClick={() => navigate("/Perfil")}
        >
          Meu Perfil
        </button>

        <button
          className={styles.addButton}
          onClick={() => navigate("/Lista")}
        >
          Lista
        </button>
        <button
          className={styles.addButton}
          onClick={() => navigate("/EditarSolicitacao")}
        >
          Minhas Solicitações
        </button>

        <button
          className={styles.addButton}
          onClick={() => navigate("/AdicionarSolicitacao")}
        >
          Adicionar Solicitação
        </button>

      </div>

    </header>
  );
}
