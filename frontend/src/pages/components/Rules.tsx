import React, { useState } from "react";
import Cards from "./DashboardCard.tsx";
import { food_list } from "./food del assets/frontend_assets/assets.js";
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
    ...Array.from(new Set(food_list.map((item) => item.category))),
  ];

  const filteredFoodList =
    selectedCategory === "All"
      ? food_list
      : food_list.filter((item) => item.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  const handleAddToPreference = (name: string) => {
    if (preferences.hasOwnProperty(name)) {
      // Remove from preferences
      const updatedPreferences = { ...preferences };
      delete updatedPreferences[name];

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
      setPreferences((prev) => ({ ...prev, [name]: preferenceCount + 1 }));
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

        <div className={`md:flex ${showCategories ? "block" : "hidden"}`}>
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 m-2 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
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
        {filteredFoodList.map((item, index) => (
          <Cards
            key={index}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
            category={item.category}
            isAdded={preferences.hasOwnProperty(item.name)}
            preferenceNumber={preferences[item.name]}
            handleAddToPreference={handleAddToPreference}
            // Add the 'no-animation' class to the first three cards
            className={index < 3 ? "no-animation" : ""}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        {preferenceCount > 0 && (
          <p className="text-lg">
            Selected Preferences: {Object.keys(preferences).join(", ")}
          </p>
        )}
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg mx-auto relative">
            <button
              onClick={closeAlert}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <p className="text-center text-black text-base">
              You are only allowed to select up to 5 preferences.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rules;
