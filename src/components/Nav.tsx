import { Link } from 'react-router-dom';
import "../styles/nav.css"

const Nav = () => {
  return (
    <nav className="nav">
      <div>
        <Link className="nav-link" to= "/">Home</Link>
      </div>
      <div>
        <Link className="nav-link" to="/SavedCandidates">Bookmarked Candidates</Link>
      </div>
    </nav>
  )
};

export default Nav;
