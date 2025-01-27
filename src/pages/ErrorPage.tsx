import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section>
      <h1>404: Page Not Found</h1>
      <h1> ¯\_(ツ)_/¯</h1>
      <Link to="/">Return Home</Link>
    </section>
  );
}

export default ErrorPage;
