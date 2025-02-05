import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col self-center items-center justify-center pt-6 p-10 m-2 min-h-[96vh] min-w-[96vw] overflow-hidden">
      <ThemeToggle />
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg mb-4">Sorry, the page you're looking for doesn't exist.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/login")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;