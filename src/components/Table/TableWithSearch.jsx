import React, { useState, useEffect } from "react";

const TableWithSearch = ({ headers, data, searchableColumns = [], placeholder = "Cari...", rowsPerPage = 10 }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        Object.keys(item).some((key) =>
          searchableColumns.includes(key) &&
          String(item[key]).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
    setCurrentPage(1); // Reset halaman saat data berubah
  }, [search, data, searchableColumns]);

  // Menghitung data yang akan ditampilkan di halaman saat ini
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input-table"
        />
      </div>
      
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex}>
                  {React.isValidElement(value) ? value : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination-container">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Sebelumnya
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default TableWithSearch;