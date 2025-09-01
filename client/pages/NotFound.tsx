import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        This page doesn’t exist.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
