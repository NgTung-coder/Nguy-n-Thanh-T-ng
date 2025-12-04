import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- CSS Styles ---
const styles = `
:root {
    --primary-dark: #0a0118;
    --secondary-dark: #1a0f2e;
    --accent-purple: #6b2d8f;
    --accent-gold: #d4af37;
    --accent-violet: #8b4ad9;
    --text-light: #e8e1f0;
    --text-muted: #a89bb8;
    --card-bg: #1f1331;
    --hover-glow: rgba(107, 45, 143, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Crimson Text', serif;
    background: var(--primary-dark);
    color: var(--text-light);
    overflow-x: hidden;
    position: relative;
}

/* Animated background pattern */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 50%, rgba(107, 45, 143, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(139, 74, 217, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
    animation: bgShift 20s ease-in-out infinite;
}

@keyframes bgShift {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
}

/* Header */
header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(10, 1, 24, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(107, 45, 143, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.2rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}

.logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: var(--text-light);
}

.logo-icon {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-violet));
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    box-shadow: 0 0 20px rgba(107, 45, 143, 0.5);
    animation: logoGlow 3s ease-in-out infinite;
}

@keyframes logoGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(107, 45, 143, 0.5); }
    50% { box-shadow: 0 0 30px rgba(139, 74, 217, 0.8); }
}

.logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--accent-gold), var(--accent-violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

nav {
    display: flex;
    gap: 2rem;
    align-items: center;
}

nav a {
    color: var(--text-light);
    text-decoration: none;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 0;
}

nav a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-gold);
    transition: width 0.3s ease;
}

nav a:hover {
    color: var(--accent-gold);
}

nav a:hover::after {
    width: 100%;
}

.header-actions {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.search-btn, .user-btn {
    background: transparent;
    border: 1px solid var(--accent-purple);
    color: var(--text-light);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.search-btn:hover, .user-btn:hover {
    background: var(--accent-purple);
    box-shadow: 0 0 15px rgba(107, 45, 143, 0.5);
    transform: translateY(-2px);
}

.live-chat-btn {
    background: linear-gradient(135deg, var(--accent-purple), var(--accent-violet));
    border: none;
    color: white;
    padding: 0.6rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(107, 45, 143, 0.3);
}

.live-chat-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(107, 45, 143, 0.5);
}

/* Hero Section */
.hero {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 2rem;
    text-align: center;
    position: relative;
    z-index: 1;
}

.hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--text-light), var(--accent-gold), var(--accent-violet));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: heroTextAppear 1s ease-out;
}

@keyframes heroTextAppear {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero p {
    font-size: 1.3rem;
    color: var(--text-muted);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
    animation: heroTextAppear 1s ease-out 0.2s both;
}

/* Filter Bar */
.filter-bar {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 0 2rem;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--accent-purple) var(--secondary-dark);
}

.filter-btn {
    background: var(--card-bg);
    border: 1px solid var(--accent-purple);
    color: var(--text-light);
    padding: 0.7rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    white-space: nowrap;
    font-weight: 600;
    transition: all 0.3s ease;
    font-family: 'Space Mono', monospace;
    font-size: 0.9rem;
}

.filter-btn:hover, .filter-btn.active {
    background: var(--accent-purple);
    box-shadow: 0 0 20px rgba(107, 45, 143, 0.4);
    transform: translateY(-2px);
}

/* Main Content */
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 3rem;
    position: relative;
    z-index: 1;
}

.main-content {
    min-width: 0;
}

/* Card Grid */
.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.card {
    background: var(--card-bg);
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(107, 45, 143, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    position: relative;
    animation: cardAppear 0.6s ease-out both;
}

.card.hidden {
    display: none;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
.card:nth-child(5) { animation-delay: 0.5s; }
.card:nth-child(6) { animation-delay: 0.6s; }

@keyframes cardAppear {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(107, 45, 143, 0.4);
    border-color: var(--accent-violet);
}

.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, transparent, rgba(139, 74, 217, 0.1));
    opacity: 0;
    transition: opacity 0.4s ease;
}

.card:hover::before {
    opacity: 1;
}

.card-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, var(--secondary-dark), var(--accent-purple));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    position: relative;
    overflow: hidden;
}

.card-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
}

.card:hover .card-image::before {
    left: 100%;
}

.card-content {
    padding: 1.5rem;
}

.card-category {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: var(--accent-gold);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.8rem;
    font-weight: 700;
}

.card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 1rem;
    color: var(--text-light);
}

.card-description {
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: 1rem;
}

.card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(107, 45, 143, 0.2);
}

.card-time {
    font-family: 'Space Mono', monospace;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.card-actions {
    display: flex;
    gap: 1.5rem;
    align-items: center;
}

.action-btn {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--text-muted);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    cursor: pointer;
    background: none;
    border: none;
    font-family: 'Space Mono', monospace;
}

.action-btn:hover {
    color: var(--accent-gold);
    transform: scale(1.1);
}

/* Sidebar */
.sidebar {
    position: sticky;
    top: 100px;
    height: fit-content;
}

.sidebar-section {
    background: var(--card-bg);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(107, 45, 143, 0.2);
    animation: cardAppear 0.8s ease-out;
}

.sidebar-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--accent-gold);
}

.join-us {
    text-align: center;
}

.join-us p {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.social-links {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.social-btn {
    background: var(--secondary-dark);
    border: 1px solid var(--accent-purple);
    color: var(--text-light);
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-btn:hover {
    background: var(--accent-purple);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(107, 45, 143, 0.4);
}

.email-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.email-input {
    flex: 1;
    background: var(--secondary-dark);
    border: 1px solid var(--accent-purple);
    color: var(--text-light);
    padding: 0.8rem 1rem;
    border-radius: 10px;
    font-family: 'Crimson Text', serif;
    font-size: 1rem;
}

.email-input::placeholder {
    color: var(--text-muted);
}

.submit-btn {
    background: var(--accent-gold);
    border: none;
    color: var(--primary-dark);
    padding: 0.8rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 700;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
}

.ad-banner {
    background: linear-gradient(135deg, var(--secondary-dark), var(--accent-purple));
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    border: 1px solid var(--accent-violet);
}

/* Footer */
footer {
    background: var(--secondary-dark);
    border-top: 1px solid rgba(107, 45, 143, 0.3);
    padding: 3rem 2rem;
    margin-top: 5rem;
    position: relative;
    z-index: 1;
}

.footer-content {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
}

.footer-section h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: var(--accent-gold);
}

.footer-links {
    list-style: none;
}

.footer-links li {
    margin-bottom: 0.8rem;
}

.footer-links a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: var(--accent-gold);
}

.footer-bottom {
    text-align: center;
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(107, 45, 143, 0.2);
    color: var(--text-muted);
}

/* Mobile Menu Toggle */
.menu-toggle {
    display: none;
    background: transparent;
    border: 1px solid var(--accent-purple);
    color: var(--text-light);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .container {
        grid-template-columns: 1fr;
    }
    
    .sidebar {
        position: static;
    }
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero p {
        font-size: 1.1rem;
    }
    
    .menu-toggle {
        display: flex;
    }
    
    nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--secondary-dark);
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;
        display: none;
        border-top: 1px solid rgba(107, 45, 143, 0.3);
    }
    
    nav.active {
        display: flex;
    }
    
    .cards-grid {
        grid-template-columns: 1fr;
    }
    
    .header-content {
        flex-wrap: wrap;
    }
    
    .logo-text {
        font-size: 1.3rem;
    }
}

/* Loading Animation */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(107, 45, 143, 0.3);
    border-radius: 50%;
    border-top-color: var(--accent-gold);
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Scroll to top button */
.scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--accent-purple);
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 20px rgba(107, 45, 143, 0.4);
    transition: all 0.3s ease;
    z-index: 1000;
}

.scroll-top.visible {
    display: flex;
}

.scroll-top:hover {
    background: var(--accent-gold);
    transform: translateY(-5px);
}
`;

// --- Components ---

interface CardProps {
  id: number;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  initialLikes: number;
  initialBookmarks: number;
  initialComments: number;
  likeEmoji: string;
}

const Card: React.FC<CardProps> = ({
  id,
  category,
  categoryLabel,
  title,
  description,
  time,
  icon,
  initialLikes,
  initialBookmarks,
  initialComments,
  likeEmoji,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const likeBtnRef = useRef<HTMLButtonElement>(null);
  const bookmarkBtnRef = useRef<HTMLButtonElement>(null);

  const formatCount = (count: number) => {
    return count > 999 ? (count / 1000).toFixed(1) + 'k' : count;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
      if (likeBtnRef.current) {
        likeBtnRef.current.style.transform = 'scale(1.3)';
        setTimeout(() => {
          if (likeBtnRef.current) likeBtnRef.current.style.transform = 'scale(1)';
        }, 200);
      }
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bookmarked) {
      setBookmarks(prev => prev + 1);
      setBookmarked(true);
      if (bookmarkBtnRef.current) {
        bookmarkBtnRef.current.style.color = 'var(--accent-gold)';
        bookmarkBtnRef.current.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(() => {
          if (bookmarkBtnRef.current) bookmarkBtnRef.current.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
      }
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert('Comment feature coming soon! 💬');
  };

  return (
    <article className="card" data-category={category}>
      <div className="card-image">{icon}</div>
      <div className="card-content">
        <div className="card-category">{categoryLabel}</div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-meta">
          <span className="card-time">{time}</span>
          <div className="card-actions">
            <button className="action-btn" onClick={handleLike} ref={likeBtnRef}>
              {likeEmoji} <span>{formatCount(likes)}</span>
            </button>
            <button className="action-btn" onClick={handleBookmark} ref={bookmarkBtnRef}>
              ⭐ <span>{formatCount(bookmarks)}</span>
            </button>
            <button className="action-btn" onClick={handleComment}>
              💬 <span>{formatCount(initialComments)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const App = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Data
  const cardsData: CardProps[] = [
    {
      id: 1,
      category: 'unsolved',
      categoryLabel: 'Unsolved Mysteries',
      title: 'The Dyatlov Pass Incident: What Really Happened?',
      description: 'Nine experienced hikers mysteriously died in the Ural Mountains in 1959. Their tent was cut from the inside, and they fled in subzero temperatures...',
      time: '⏱ 2 hours ago',
      icon: '🏔️',
      initialLikes: 234,
      initialBookmarks: 89,
      initialComments: 156,
      likeEmoji: '😱'
    },
    {
      id: 2,
      category: 'paranormal',
      categoryLabel: 'Paranormal',
      title: 'The Bermuda Triangle: New Evidence Surfaces',
      description: 'Researchers discover unusual magnetic anomalies that could explain the mysterious disappearances of ships and planes in the infamous triangle...',
      time: '⏱ 5 hours ago',
      icon: '🌊',
      initialLikes: 512,
      initialBookmarks: 203,
      initialComments: 287,
      likeEmoji: '🤯'
    },
    {
      id: 3,
      category: 'true-crime',
      categoryLabel: 'True Crime',
      title: "The Zodiac Killer's Final Message Decoded",
      description: 'After 51 years, cryptographers finally crack the infamous 340-character cipher. What the message reveals will shock you...',
      time: '⏱ 8 hours ago',
      icon: '🕵️',
      initialLikes: 891,
      initialBookmarks: 456,
      initialComments: 634,
      likeEmoji: '😨'
    },
    {
      id: 4,
      category: 'ancient',
      categoryLabel: 'Ancient Mysteries',
      title: 'Lost City Found Deep in the Amazon Rainforest',
      description: 'LiDAR technology reveals massive ancient civilization hidden beneath dense jungle canopy, rewriting history of the Americas...',
      time: '⏱ 1 day ago',
      icon: '🏛️',
      initialLikes: 1200,
      initialBookmarks: 678,
      initialComments: 892,
      likeEmoji: '🤩'
    },
    {
      id: 5,
      category: 'conspiracy',
      categoryLabel: 'Conspiracies',
      title: "Pentagon's UFO Report: What They're Not Telling Us",
      description: 'Former government officials speak out about classified encounters with unidentified aerial phenomena that defy known physics...',
      time: '⏱ 2 days ago',
      icon: '🛸',
      initialLikes: 2100,
      initialBookmarks: 934,
      initialComments: 1500,
      likeEmoji: '👽'
    },
    {
      id: 6,
      category: 'paranormal',
      categoryLabel: 'Paranormal',
      title: 'Haunted Hospital Investigation Captures Unexplained Activity',
      description: 'Paranormal investigators document disturbing phenomena at abandoned asylum. The footage has scientists baffled...',
      time: '⏱ 3 days ago',
      icon: '🏚️',
      initialLikes: 876,
      initialBookmarks: 412,
      initialComments: 523,
      likeEmoji: '😱'
    }
  ];

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      // Show scroll top button
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Parallax hero
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        if (scrolled < 500) {
          heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroRef.current.style.opacity = (1 - (scrolled / 500)).toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLiveChat = () => alert('Live Chat feature coming soon! Join our community discussions. 💬');
  const handleSearch = () => {
    const query = prompt('🔍 Search mysteries:');
    if (query) alert(`Searching for: ${query}`);
  };
  const handleUser = () => alert('User profile features coming soon! 👤');
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector('input');
    alert(`Thank you for subscribing! 🎉\nWelcome to Mystery Chronicles: ${input?.value}`);
    (e.target as HTMLFormElement).reset();
  };
  const handleLoadMore = () => alert('Loading more mysterious stories... 🔮');
  const handleFollow = (platform: string) => alert(`Following us on ${platform}! 🎉`);

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'trending', label: '🔥 Trending' },
    { id: 'unsolved', label: '🔍 Unsolved Cases' },
    { id: 'paranormal', label: '👻 Paranormal' },
    { id: 'conspiracy', label: '🕵️ Conspiracies' },
    { id: 'true-crime', label: '🚨 True Crime' },
    { id: 'ancient', label: '🏛️ Ancient Mysteries' },
  ];

  const filteredCards = activeCategory === 'all' 
    ? cardsData 
    : cardsData.filter(card => card.category === activeCategory);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Header */}
      <header>
        <div className="header-content">
          <button className="menu-toggle" onClick={toggleMenu}>☰</button>
          
          <a href="#" className="logo">
            <div className="logo-icon">🔮</div>
            <span className="logo-text">Mystery</span>
          </a>
          
          <nav id="mainNav" className={isMenuOpen ? 'active' : ''}>
            <a href="#trending">Trending</a>
            <a href="#latest">Latest</a>
            <a href="#topics">Topics</a>
            <a href="#tags">Tags</a>
          </nav>
          
          <div className="header-actions">
            <button className="live-chat-btn" onClick={handleLiveChat}>
              💬 Live Chat
            </button>
            <button className="search-btn" onClick={handleSearch}>🔍</button>
            <button className="user-btn" onClick={handleUser}>👤</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <h1>Uncover the Unknown</h1>
        <p>Dive into the world's most enigmatic mysteries, unsolved cases, and paranormal phenomena. Where curiosity meets the unexplained.</p>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar">
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="container">
        {/* Main Content */}
        <main className="main-content">
          {/* Cards Grid */}
          <div className="cards-grid" id="cardsGrid">
            {filteredCards.map(card => (
              <Card key={card.id} {...card} />
            ))}
          </div>

          {/* Load More Button */}
          <div style={{ textAlign: 'center', margin: '3rem 0' }}>
            <button 
              className="filter-btn" 
              onClick={handleLoadMore} 
              style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
            >
              Load More Mysteries
            </button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Join Us Section */}
          <div className="sidebar-section join-us">
            <h2 className="sidebar-title">Join Our Community</h2>
            <p>Stay tuned to the world's most intriguing mysteries</p>
            
            <div className="social-links">
              <button className="social-btn" onClick={() => handleFollow('youtube')}>▶️</button>
              <button className="social-btn" onClick={() => handleFollow('twitter')}>🐦</button>
              <button className="social-btn" onClick={() => handleFollow('instagram')}>📷</button>
              <button className="social-btn" onClick={() => handleFollow('facebook')}>👍</button>
            </div>
            
            <form className="email-form" onSubmit={handleSubscribe}>
              <input type="email" className="email-input" placeholder="Your email" required />
              <button type="submit" className="submit-btn">→</button>
            </form>
            <small style={{ color: 'var(--text-muted)' }}>No spam, just mysteries! 🔮</small>
          </div>

          {/* Trending Topics */}
          <div className="sidebar-section">
            <h2 className="sidebar-title">🔥 Trending Topics</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { title: 'Bigfoot Sighting', discussions: '1,234' },
                { title: 'DB Cooper Case', discussions: '892' },
                { title: 'Atlantis Discovery', discussions: '756' }
              ].map((topic, i) => (
                <div 
                  key={i}
                  style={{ 
                    padding: '1rem', 
                    background: 'var(--secondary-dark)', 
                    borderRadius: '10px', 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease' 
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-purple)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'var(--secondary-dark)'}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{topic.title}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{topic.discussions} discussions</div>
                </div>
              ))}
            </div>
          </div>

          {/* Advertisement */}
          <div className="sidebar-section ad-banner">
            <div>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📚</div>
              <strong>Premium Mystery Content</strong>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Unlock exclusive investigations</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Mystery Chronicles</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Your premier destination for unexplained phenomena, unsolved mysteries, and the world's most intriguing enigmas.
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Explore</h3>
            <ul className="footer-links">
              <li><a href="#">Trending Stories</a></li>
              <li><a href="#">Latest Updates</a></li>
              <li><a href="#">All Topics</a></li>
              <li><a href="#">Popular Tags</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Community</h3>
            <ul className="footer-links">
              <li><a href="#">Submit a Story</a></li>
              <li><a href="#">Join Discussions</a></li>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Mystery Chronicles. All rights reserved. | Unraveling the unexplained since 2025 🔮</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`} 
        id="scrollTopBtn" 
        onClick={scrollToTop}
      >
        ↑
      </button>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);