import { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import '../styles/AdminProduct.css'
import api from "../api/axios";
function AdminProducts() {

    const token = localStorage.getItem("token");
const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editImages, setEditImages] = useState([]);

    // =========================
    // GET PRODUCTS
    // =========================
 const fetchProducts = useCallback(async () => {

    try {

        const res = await api.get(
            `/products?search=${search}`
        );


        console.log(
            "ADMIN PRODUCTS:",
            res.data
        );


        setProducts(
            res.data.products || []
        );


    } catch(err) {

        console.log(
            "ERROR FETCH:",
            err.response?.data || err.message
        );

    }


}, [search]);



useEffect(()=>{

    fetchProducts();

},[fetchProducts]);
    // =========================
    // DELETE PRODUCT
    // =========================
    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm("Supprimer ce produit ?");

        if (!confirmDelete) return;

        try {

            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchProducts();

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    // =========================
    // UPDATE PRODUCT
    // =========================
    const updateProduct = async () => {

        try {

            const formData = new FormData();

            formData.append("name", editingProduct.name || "");
              formData.append("description", editingProduct.description || "");
            formData.append("price", editingProduct.price || 0);
            formData.append("stock", editingProduct.stock || 0);
        
            for (let i = 0; i < editImages.length; i++) {
                formData.append("images", editImages[i]);
            }

            await api.put(
                `/products/${editingProduct._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setEditingProduct(null);
            setEditImages([]);

            fetchProducts();

            alert("Produit mis à jour");

        } catch (err) {
            console.log("UPDATE ERROR:", err.response?.data || err.message);
        }
    };
  

    return (

        <div className="container-fluid admin-products">
            <div className="row">
<div className="row">

    <div className="col-md-5 pt-3">

        <div className="input-group">

            <span className="input-group-text">

                <i className="fa-solid fa-magnifying-glass"></i>

            </span>

            <input
                type="text"
                className="form-control"
                placeholder="Rechercher par nom ou SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </div>

    </div>

</div>
                {/* SIDEBAR */}
                <div className="col-md-2 pt-5">
                    <Sidebar />
                </div>

                {/* CONTENT */}
                <div className="col-md-10 p-4">

                    <h2 className="mb-4">Admin - Products</h2>

                    {/* DEBUG (à enlever après) */}
                    {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
<div className="products-table-wrapper">
                    <table className="table table-striped table-hover">

                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>sku</th>
                                <th>Category</th>
                                 <th>stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((p) => (

                                <tr key={p._id}>

                                    <td>
                                        <img
                                            src={
                                                p?.images?.length > 0
                                                    ? `http://localhost:5000/uploads/${p.images[0]}`
                                                    : "https://via.placeholder.com/60"
                                            }
                                            alt={p?.name || "product"}
                                            width="60"
                                            height="60"
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "8px"
                                            }}
                                        />
                                    </td>

                                    <td>{p.name}</td>
                                      <td>{p.description}</td>
                                    <td>{p.sku}</td>
                                    <td>{p.category?.name}</td>
                                        <td>{p.stock}</td>

                                    <td>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteProduct(p._id)}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            className="btn btn-warning btn-sm ms-2"
                                            onClick={() => setEditingProduct(p)}
                                        >
                                            Edit
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                    </div>

                    {/* ================= MODAL EDIT ================= */}
                    {editingProduct && (

                        <div className="modal d-block"
                            style={{ background: "rgba(0,0,0,0.5)" }}>

                            <div className="modal-dialog">

                                <div className="modal-content p-3">

                                    <h4>Edit Product</h4>

                                    {/* IMAGE PREVIEW */}
                                    <img
                                        src={
                                            editingProduct?.images?.length > 0
                                                ? `http://localhost:5000/uploads/${editingProduct.images[0]}`
                                                : "https://via.placeholder.com/100"
                                        }
                                        width="100"
                                        className="mb-3 rounded"
                                        alt=""
                                    />

                                    <input
                                        className="form-control mb-2"
                                        value={editingProduct.name}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                name: e.target.value
                                            })
                                        }
                                    />
                                       <input
                                        className="form-control mb-2"
                                        value={editingProduct.description}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                description: e.target.value
                                            })
                                        }
                                    />

                                    <input
                                        className="form-control mb-2"
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                price: e.target.value
                                            })
                                        }
                                    />

                                    <input
                                        className="form-control mb-2"
                                        value={editingProduct.stock}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                stock: e.target.value
                                            })
                                        }
                                    />

                                    {/* NEW IMAGES */}
    <input
    type="file"
    multiple
    className="form-control mb-2"
    onChange={(e) => setEditImages(Array.from(e.target.files))}
/>
                                    <div className="d-flex justify-content-end gap-2">

                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setEditingProduct(null)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="btn btn-success"
                                            onClick={updateProduct}
                                        >
                                            Save
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>
        </div>

    );
}

export default AdminProducts;