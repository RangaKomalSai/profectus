import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Preference {
  company: string;
  preferenceNumber: number;
}

const Table: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<Preference[] | null>(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // Make a GET request to fetch the preferences of the logged-in user
        const response = await axios.get<{ preferences: Preference[] }>(
          "http://localhost:5000/api/preferences",
          { withCredentials: true }
        );
        setPreferences(response.data.preferences);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const handleClick = () => {
    navigate("/student-dashboard");
  };

  return (
    <div className="container mx-auto flex flex-col items-center rounded-2xl">
      {preferences && preferences.length > 0 ? (
        <table className="table bg-white border-collapse rounded-2xl shadow-md w-2/3 my-8 overflow-hidden">
          <thead className="table__head bg-gray-200 font-outfit">
            <tr className="table__row">
              <th className="Preference py-4 flex justify-center px-2 text-center">
                Preference No
              </th>
              <th className="Company py-4">Company Name</th>
            </tr>
          </thead>
          <tbody className="table__body font-roboto">
            {preferences.map(({ company, preferenceNumber }) => (
              <tr className="table__row hover:bg-gray-100" key={company}>
                <td
                  className="table__body__text table__body__text--name px-6 py-4 text-center"
                  data-title="Preference no"
                >
                  {preferenceNumber}
                </td>
                <td
                  className="table__body__text table__body__text--country px-16 py-4 text-center"
                  data-title="Company name"
                >
                  {company}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col justify-center items-center mb-8 gap-4 text-center border border-opacity-30 transition-colors duration-500 ease-in-out rounded-lg hover:border-opacity-100 p-6 bg-red-200 w-3/4 lg:w-1/2">
          <p className="text-xl mb-4 font-roboto font-bold tracking-wider">
            You didn't apply yet!
          </p>

          <button
            onClick={handleClick}
            className="bg-orange-600 relative h-10 w-32 md:h-12 md:w-40 rounded-lg text-white overflow-hidden font-medium shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 before:hover:w-40 hover:before:opacity-80 "
          >
            <span className="relative z-100 font-bold font-outfit tracking-wider">
              Explore
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
