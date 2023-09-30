import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import audio from "../audio/alert.mp3"

function Categories({ swal }) {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [catEdit, setCatEdit] = useState(null);
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/categories");
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handelSave = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      console.error("Name is empty. Please enter a name.");
      return;
    }
    try {
      const data = {
        name,
        parentCategory,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values.split(","),
        })),
      };
      if (catEdit) {
        data.id = catEdit._id;
        await axios.put("http://localhost:5000/api/categories", data);
      } else {
        await axios.post("http://localhost:5000/api/categories", data);
      }
      setName("");
      setParentCategory("");
      setProperties([]);
      setCatEdit(null);
      fetchData();
    } catch (error) {
      console.error("Error while sending the POST request:", error);
    }
  };

  function handelEdit(category) {
    setCatEdit(category);
    setName(category.name);
    setParentCategory(category?.parent?._id || "");
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  function deleteCategory(category) {
    const alertSound = new Audio(audio);
    alertSound.play();
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete '${category.name}'`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5000/api/categories/${category._id}`);
            fetchData();
          } catch (error) {
            console.error("Error deleting category:", error);
          }
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handelPropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index].name = newName;
      return updatedProperties;
    });
  }

  function handelPropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index].values = newValues;
      return updatedProperties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return prev.filter((p, pIndex) => pIndex !== indexToRemove);
    });
  }

  return (
    <div>
      <h1>Categories</h1>
      <label>
        {catEdit ? `Edit Category '${catEdit.name}'` : "Create New Category "}
      </label>
      <form onSubmit={handelSave}>
        <div className="flex gap-1">
          <input
            type="text"
            className=""
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className=""
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">No parent category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mb-2"
            onClick={addProperty}
          >
            Add New Property
          </button>
          {properties.map((property, index) => (
            <div className="flex gap-1 mb-2" key={index}>
              <input
                className="mb-0"
                type="text"
                placeholder="property name (example: color)"
                value={property.name}
                onChange={(e) =>
                  handelPropertyNameChange(index, property, e.target.value)
                }
              />
              <input
                className="mb-0"
                type="text"
                placeholder="values, comma, separated"
                value={property.values}
                onChange={(e) =>
                  handelPropertyValuesChange(index, property, e.target.value)
                }
              />
              <button
                type="button"
                className="btn-default"
                onClick={() => removeProperty(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {catEdit && (
            <button
              type="button"
              className="btn-default py-2"
              onClick={() => {
                setCatEdit(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-2">
            Save
          </button>
        </div>
      </form>
      {!catEdit && (
        <table className="table-basic">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => handelEdit(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);