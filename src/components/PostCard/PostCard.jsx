import React, { useState, useEffect } from 'react';
import { dataContent } from '../../assets/data/data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './PostCard.css';

const PostCard = () => {
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]); // Awalnya kosong

  // Filter postingan berdasarkan query pencarian
  const filterPosts = (query) => {
    return dataContent.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    // Jika tidak ada query pencarian aktif, tampilkan semua post
    if (activeQuery === '') {
      setFilteredPosts(dataContent);
    } else {
      // Filter postingan jika ada query aktif
      setFilteredPosts(filterPosts(activeQuery));
    }
  }, [activeQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setIsLoading(true); // Set loading ke true saat tombol Cari ditekan
    setVisiblePosts(4);  // Reset visible posts ke 4 saat mencari baru

    // Set active query untuk pencarian
    setActiveQuery(searchQuery);

    // Loading selama 1.5 detik
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Fungsi untuk memuat lebih banyak postingan
  const loadMorePosts = () => {
    const newVisiblePosts = visiblePosts + 4;
    setVisiblePosts(newVisiblePosts > filteredPosts.length ? filteredPosts.length : newVisiblePosts);
  };

  return (
    <div>
      <div className="search-section">
        <div className="search-bar">
          <input type="text" placeholder="Cari berdasarkan judul..." value={searchQuery} onChange={handleSearchChange} className="search-input" />
          <button className="search-button" onClick={handleSearchSubmit} disabled={isLoading}>
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
            ) : (
              <FontAwesomeIcon icon={faSearch} />
            )}
            {isLoading ? ' Sedang Mencari...' : 'Cari'}
          </button>
        </div>
      </div>

      <div className="card-post-container">
        {/* Tampilkan hasil pencarian hanya setelah selesai loading */}
        {isLoading ? (
          <p>Menunggu hasil pencarian...</p> // Menampilkan pesan selama loading
        ) : filteredPosts.length > 0 ? (
          filteredPosts.slice(0, visiblePosts).map((post) => (
            <div key={post.id} className="card-post">
              <img src={post.image} alt={post.title} className="card-post-image" />
              <div className="card-post-content">
                <span className={`badge ${post.gradeLevel.toLowerCase()}`}>{post.gradeLevel}</span>
                <h3 className="card-post-title">{post.title}</h3>
                <p className="card-post-date">{post.date}</p>
                <a href={post.url} className="card-post-link">Baca Materi</a>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Materi pembelajaran yang dicari tidak tersedia</p> // Pesan jika tidak ada hasil
        )}

        {filteredPosts.length > 0 && visiblePosts < filteredPosts.length && (
          <button className="load-more-button" onClick={loadMorePosts}>
            Muat Berikutnya
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
