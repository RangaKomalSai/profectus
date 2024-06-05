import React, { useState } from "react";
import Cards from "./DashboardCard.tsx"; // Adjusted the import to ensure correct path

import company_list from "./assets/assets"; // Make sure the correct path is used for assets
import { FaFilter } from "react-icons/fa";
import Table from "./Table.tsx"; // Import the Table component

const Rules: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<{ [key: string]: number }>({});
  const [preferenceCount, setPreferenceCount] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const categories = [
    "All",
    ...Array.from(new Set(company_list.map((item) => item.domain))),
  ];

  const filteredcompany_list =
    selectedCategory === "All"
      ? company_list
      : company_list.filter((item) => item.domain === selectedCategory);

  const handleCategoryClick = (domain: string) => {
    setSelectedCategory(domain);
    setShowCategories(false);
  };

  const handleAddToPreference = (company_name: string) => {
    if (preferences.hasOwnProperty(company_name)) {
      // Remove from preferences
      const updatedPreferences = { ...preferences };
      delete updatedPreferences[company_name];

      // Update preference numbers
      const newPreferences: { [key: string]: number } = {};
      let count = 1;
      for (const key in updatedPreferences) {
        newPreferences[key] = count++;
      }

      setPreferences(newPreferences);
      setPreferenceCount((prev) => prev - 1);
    } else if (preferenceCount < 5) {
      // Add to preferences
      setPreferences((prev) => ({ ...prev, [company_name]: preferenceCount + 1 }));
      setPreferenceCount((prev) => prev + 1);
    } else {
      // Show alert
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div id="rules" className="pt-24 pb-16">
      <div className="flex justify-center mb-8">
        <button
          className="md:hidden px-4 py-2 m-2 bg-gray-200 rounded"
          onClick={() => setShowCategories(!showCategories)}
        >
          <FaFilter />
        </button>

        <div
          className={`md:flex font-poppins flex-wrap justify-center ${
            showCategories ? "block" : "hidden"
          }`}
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 m-2  ${
                selectedCategory === category
                  ? "bg-[#4255b3] text-white"
                  : "bg-gray-200"
              } rounded`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <Table preferences={preferences} />
      </div>
      <div className="w-[85%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto gap-8">
        {filteredcompany_list.map((item, index) => (
          <Cards
            key={index}
            image={item.image}
            name={item.company_name}
            job_title={item.job_title}
            description={item.job_description}
            domain={item.domain}
            mode={item.mode}
            stipend={item.stipend}
            number_of_fellows={typeof item.number_of_fellows === "number" ? item.number_of_fellows : null} // Ensure number_of_fellows is number or null
            website_link={item.website_link}
            city={item.city}
            isAdded={preferences.hasOwnProperty(item.company_name)}
            preferenceNumber={preferences[item.company_name]}
            handleAddToPreference={handleAddToPreference}
          />
        ))}
      </div>
    </div>
  );
};

export default Rules;
