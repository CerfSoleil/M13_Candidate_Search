import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <div>
        <Link to= "/">Home</Link>
      </div>
      <div>
        <Link to="/SavedCandidates">Bookmarked Candidates</Link>
      </div>
    </nav>
  )
};

export default Nav;
