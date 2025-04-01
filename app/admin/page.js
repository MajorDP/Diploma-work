"use client";

import { useEffect, useState } from "react";
import { AdminDashboard } from "../_components/AdminDashboard";
import { PlatformForm } from "../_components/PlatformForm";
import { WebsiteScraper } from "../_components/WebsiteScraper";
import {
  createPlatform,
  deletePlatform,
  editPlatform,
  getPlatforms,
} from "../_services/platforms";
import Spinner from "../_components/Spinner";
import Error from "../_components/Error";

const Page = () => {
  //TODO: Validate user as admin, if not admin, send away
  useEffect(() => {
    async function getAllPlatforms() {
      const { platforms, error } = await getPlatforms();

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      setPlatforms(platforms);
      setIsLoading(false);
    }
    getAllPlatforms();
  }, []);

  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlatformForm, setShowPlatformForm] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(null);

  const selectForEdit = (index) => {
    setSelectedForEdit(platforms[index]);
    setShowPlatformForm(true);
  };

  const handleSubmitPlatform = async (platform, isEdit) => {
    if (!isEdit) {
      const { platform: newPlatform, error } = await createPlatform(platform);

      if (error) {
        setError(error.message);
        setShowPlatformForm(false);
        return;
      }

      setPlatforms([...platforms, newPlatform]);
      setShowPlatformForm(false);
    } else {
      const { platform: newPlatform, error } = await editPlatform(platform);

      if (error) {
        setError(error.message);
        setShowPlatformForm(false);
        return;
      }

      setPlatforms(
        platforms.map((p) => (p.id === newPlatform.id ? newPlatform : p))
      );

      setShowPlatformForm(false);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await deletePlatform(id);

    if (error) {
      setError(error.message);
      return;
    }
    setPlatforms(platforms.filter((platform) => platform.id !== id));
    //TODO: Validate admin again
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center">
        <Spinner />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center ">
        <Error message={error} />
      </div>
    );
  }
  return (
    <div className="min-w-[30rem] sm:w-auto">
      {showPlatformForm ? (
        <div className="space-y-4">
          <WebsiteScraper />
          <PlatformForm
            onSubmit={handleSubmitPlatform}
            onClose={() => setShowPlatformForm(false)}
            initialData={selectedForEdit}
          />
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center ">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
              Platform Management
            </h1>
            <button
              onClick={() => {
                setSelectedForEdit(null);
                setShowPlatformForm(true);
              }}
              className="px-4 py-2 bg-[#40a378] text-white rounded-lg hover:bg-[#66D2A3] cursor-pointer text-sm sm:text-base"
            >
              Add New Platform
            </button>
          </div>
          <AdminDashboard
            platforms={platforms}
            selectForEdit={selectForEdit}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
