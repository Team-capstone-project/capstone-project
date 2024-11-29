import React from "react";
import "./Preloader.css";

function Preloader () {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

 {/* const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  } */} // Efek loader untuk memuat data dll, langsung copas ke halaman yang ada data

export default Preloader;
