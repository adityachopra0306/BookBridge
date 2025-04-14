    import { useEffect, useRef, useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { FaBookOpen, FaUserCircle } from "react-icons/fa";
    import "./HomeStyle.css";
    import { books } from "./data";

    export default function Home({ isLoggedIn, onLogout }) {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = container.offsetWidth / 3;
            if (container.scrollLeft + scrollAmount >= container.scrollWidth) {
            container.scrollTo({ left: 0, behavior: "smooth" });
            } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    const closeModal = () => {
        setSelectedBook(null);
    };

    return (
        <div className="d-flex flex-column min-vh-100 site-wrapper">
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top px-3">
            <Link className="navbar-brand d-flex align-items-center" to="/">
            <FaBookOpen className="text-primary me-2" />
            <strong>BookBridge</strong>
            </Link>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                <button className="nav-link nav-link-btn">Donate</button>
                </li>
                <li className="nav-item">
                <Link className="nav-link nav-link-btn" to="/academics">
                    Academic Books
                </Link>
                </li>
                <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle d-flex align-items-center nav-link-btn" data-bs-toggle="dropdown">
                    <FaUserCircle className="me-1" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {isLoggedIn ? (
                    <>
                        <li>
                        <span className="dropdown-item">Welcome, User</span>
                        </li>
                        <li>
                        <button className="dropdown-item" onClick={onLogout}>
                            Logout
                        </button>
                        </li>
                    </>
                    ) : (
                    <li>
                        <button className="dropdown-item" onClick={() => navigate("/login")}>
                        Login
                        </button>
                    </li>
                    )}
                </ul>
                </li>
            </ul>
            </div>
        </nav>

        {/* HERO */}
        <div className="hero-section text-center text-white">
            <div className="hero-overlay">
            <h1 className="hero-heading">From Your Shelf, to Their Future.</h1>
            <p className="hero-subheading">BookBridge</p>
            </div>
        </div>

        {/* BOOKS SCROLL */}
        <div className="main-content container py-5">
            <h3 className="section-title">Available Books</h3>
            <div className="scroll-row mt-3" ref={scrollRef}>
            {books.map((book) => (
                <button key={book.id} className="book-card-btn" onClick={() => handleBookClick(book)}>
                <img src={book.cover} className="book-cover" alt={book.title} />
                <div className="mt-2 fw-bold">{book.title}</div>
                <div className="text-muted">{book.author}</div>
                </button>
            ))}
            </div>
        </div>

        {/* MODAL */}
        {selectedBook && (
    <div className="popup-overlay" onClick={closeModal}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={closeModal}>×</button>
        <div className="popup-body">
            <img src={selectedBook.cover} className="popup-book-cover" alt={selectedBook.title} />
            <div className="popup-book-details">
            <h3>{selectedBook.title}</h3>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Category:</strong> {selectedBook.category}</p>
            <p><strong>Donor:</strong> {selectedBook.donorName}</p>
            <p><strong>Email:</strong> {selectedBook.email}</p>
            <p><strong>Location:</strong> {selectedBook.location}</p>
            <p className="modal-summary">
                This book is a generous donation to inspire and educate readers through BookBridge.
            </p>
            </div>
        </div>
        </div>
    </div>
    )}


        {/* FOOTER */}
        <footer className="text-center py-3 mt-auto">
            <div className="text-muted">&copy; {new Date().getFullYear()} BookBridge. All rights reserved.</div>
        </footer>
        </div>
    );
    }
