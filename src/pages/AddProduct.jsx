import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AddProduct.css";

function AddProduct() {
const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
  
    useEffect(() => {

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

        } catch (err) {
            console.log(err);
        }

    };

    fetchCategories();

}, []);
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("sku", sku);
            formData.append("category", category);

            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i]);
            }

            await api.post("/products", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
         
            alert("Produit ajouté avec succès");

            navigate("/admin/products");

        } catch (err) {

            console.log(err);

            alert("Erreur lors de l'ajout du produit");

        }

    };

    return (

        <div className="container-fluid add-product">

            <div className="row">

                <div className="col-md-2 p-0">
                    <AdminSidebar />
                </div>

                <div className="col-md-10 p-4">

                    <h2 className="add-product__title mb-4">
                        Ajouter un produit
                    </h2>

                    <form className="add-product__form" onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">
                                Nom
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Prix
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    SKU
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={sku}
                                    onChange={(e) => setSku(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                              
<select
    className="form-select"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
>

    <option value="">
        Choisir une catégorie
    </option>

    {categories.map((cat) => (

        <option
            key={cat._id}
            value={cat._id}
        >
            {cat.name}
        </option>

    ))}

</select>

                            </div>

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Images
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                multiple
                                accept="image/*"
                                onChange={(e) => setImages(e.target.files)}
                            />

                        </div>

                        <button
                            className="add-product__submit"
                            type="submit"
                        >
                            Ajouter le produit
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddProduct;