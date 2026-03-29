
import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  // React Router gives you the error object via useRouteError()
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    // HTTP errors (404, 403, 500 etc.)
    if (error.status === 404) message = "Page not found.";
    else if (error.status === 403) message = "You don't have access.";
    else message = `Error ${error.status}: ${error.statusText}`;
  } else if (error instanceof Error) {
    // JavaScript runtime errors
    message = error.message;
  }

  return (
    <div style={{ textAlign: "center", padding: "4rem" }}>
      <h1>Oops!</h1>
      <p>{message}</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
