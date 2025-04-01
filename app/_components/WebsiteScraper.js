import { useState } from "react";
import { scrapeSite } from "../_services/scraper";
import Error from "./Error";

export const WebsiteScraper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [websiteLink, setWebsiteLink] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleScraping = async () => {
    setError("");
    setIsLoading(true);
    const { data, error } = await scrapeSite(websiteLink);

    if (error) {
      setError(error.message);
    } else {
      const blob = new Blob([data], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "scraped_data.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setWebsiteLink("");
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Scrape data</h2>
        {isOpen ? (
          <button
            className="px-2 py-1 h-fit bg-red-600 text-white text-sm rounded-lg hover:bg-red-800 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        ) : (
          <button
            className="px-2 py-1 h-fit bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-800 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Open
          </button>
        )}
      </div>

      {isOpen && (
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website link
            </label>
            <input
              type="text"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end items-center gap-2">
            {error && <Error message={error} />}
            <button
              className="px-6 py-2 bg-[#40a378] text-white rounded-lg hover:bg-[#66D2A3] cursor-pointer"
              disabled={!websiteLink}
              onClick={handleScraping}
            >
              {isLoading ? "Please wait..." : "Scrape data"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
