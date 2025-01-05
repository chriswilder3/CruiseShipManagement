import React, { useState } from "react";

function AdminManageItems() {
  const [formFields, setFormFields] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedService(selectedValue);

    switch (selectedValue) {
      case "Catering":
        setFormFields([
          { name: "itemName", label: "Item Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
        ]);
        break;

      case "Stationery":
        setFormFields([
          { name: "itemName", label: "Item Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
        ]);
        break;

      case "Movies":
        setFormFields([
          { name: "title", label: "Title", type: "text" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "posterUrl", label: "Poster URL", type: "text" },
        ]);
        break;

      case "Beauty Salon":
        setFormFields([
          { name: "serviceName", label: "Service Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
        ]);
        break;

      case "Fitness Center":
        setFormFields([
          { name: "serviceName", label: "Service Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
          { name: "equipmentType", label: "Equipment Type", type: "text" },
        ]);
        break;

      case "Partyhall":
        setFormFields([
          { name: "packageName", label: "Package Name", type: "text" },
          { name: "price", label: "Price", type: "number" },
          { name: "duration", label: "Duration", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "imageUrl", label: "Image URL", type: "text" },
          {
            name: "packageCategory",
            label: "Package Category",
            type: "select",
            options: [
              "Birthday Package",
              "Wedding Package",
              "Corporate Event Package",
            ],
          },
        ]);
        break;

      default:
        setFormFields([]);
    }
  };

  const renderFormFields = () => {
    return formFields.map((field) => {
      if (field.type === "textarea") {
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Enter ${field.label}`}
            ></textarea>
          </div>
        );
      } else if (field.type === "select") {
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <select
              id={field.name}
              name={field.name}
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      } else {
        return (
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={`Enter ${field.label}`}
              className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-purple-900 text-white">
      <div className="p-3 w-3/4">
        
        <h1 className="text-3xl font-bold mb-6 poppins text-indigo-300">Manage Items/Services </h1>

          
        <div className="flex flex-col space-y-4 w-3/4 justify-center mx-auto items-center">
          
            <div className="flex flex-col space-y-4 w-1/3">
                <button
                  className="w-full py-2 px-4 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Existing Items
                </button>
                <button
                  className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Update Existing Items
                </button>
            </div>

          <div className="p-3 bg-white rounded-lg shadow-lg text-gray-900 w-4/5">
            <h2 className="text-lg font-semibold mb-4 text-sky-600">Add New Item</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="servicetype" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Service
                </label>
                <select
                  name="servicetype"
                  id="servicetype"
                  onChange={handleServiceChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a service</option>
                  <option value="Beauty Salon">Beauty Salon</option>
                  <option value="Fitness Center">Fitness Center</option>
                  <option value="Partyhall">Partyhall</option>
                  <option value="Catering">Catering</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Movies">Movies</option>
                </select>
              </div>

              <div>{renderFormFields()}</div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default AdminManageItems;
