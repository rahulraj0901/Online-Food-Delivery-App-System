import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFoodForm = () => {
  const [categories, setCategories] = useState([]);

  const restaurant = JSON.parse(sessionStorage.getItem("active-restaurant"));
  const restaurant_jwtToken = sessionStorage.getItem("restaurant-jwtToken");

  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const resCategory = await retrieveAllCategories();
      if (resCategory) {
        setCategories(resCategory.categories);
      }
    };

    getAllCategories();
  }, []);

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    restaurantId: "",
  });

  const handleInput = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const saveFood = (e) => {
    e.preventDefault();
    if (restaurant === null) {
      toast.error("Restaurant Id is missing!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);
    formData.append("name", food.name);
    formData.append("description", food.description);
    formData.append("price", food.price);
    formData.append("quantity", food.quantity);
    formData.append("categoryId", food.categoryId);
    formData.append("restaurantId", restaurant.id);

    axios
      .post("http://localhost:8080/api/food/add", formData, {
        headers: {
          Authorization: "Bearer " + restaurant_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/home");
          }, 2000); // Redirect after 3 seconds
        } else if (!response.success) {
          toast.error(response.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        } else {
          toast.error("It Seems Server is down!!!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 2000); // Redirect after 3 seconds
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000); // Redirect after 3 seconds
      });
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4">
        <div class="card form-card shadow-lg" style={{ width: "45rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 class="card-title">Add Food</h5>
            </div>
            <div class="card-body text-color">
              <form className="row g-3">
                <div className="col-md-6 mb-3">
                  <label for="title" class="form-label">
                    <b>Food Title</b>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    name="name"
                    onChange={handleInput}
                    value={food.name}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label for="description" class="form-label">
                    <b>Food Description</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    onChange={handleInput}
                    value={food.description}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    <b>Category</b>
                  </label>

                  <select
                    name="categoryId"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label for="price" class="form-label">
                    <b>Food Price</b>
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    name="price"
                    onChange={handleInput}
                    value={food.price}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select 1st Image</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image1"
                    value={food.image1}
                    onChange={(e) => setSelectImage1(e.target.files[0])}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select 2nd Image</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image2"
                    value={food.image2}
                    onChange={(e) => setSelectImage2(e.target.files[0])}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select 3rd Image</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image3"
                    value={food.image3}
                    onChange={(e) => setSelectImage3(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text"
                    onClick={saveFood}
                  >
                    Add Food
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoodForm;
