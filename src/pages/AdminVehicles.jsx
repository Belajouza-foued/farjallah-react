import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/AdminVehicles.css";


function AdminVehicles() {


    const [vehicles, setVehicles] = useState([]);

    const [loading, setLoading] = useState(true);


    const [form, setForm] = useState({

        brand:"",
        model:"",
        year:"",
        engine:""

    });


    const [editId, setEditId] = useState(null);



    const token = localStorage.getItem("token");



    // =========================
    // GET VEHICLES
    // =========================

    const getVehicles = async()=>{

        try{


            const res = await api.get(
                "/vehicles"
            );


            console.log(
                "VEHICLES :",
                res.data
            );


            if(res.data.success){

                setVehicles(
                    res.data.vehicles
                );

            }


        }catch(error){

            console.log(
                error.response?.data || error.message
            );


        }finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        getVehicles();

    },[]);





    // =========================
    // INPUT CHANGE
    // =========================

    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };





    // =========================
    // CREATE / UPDATE
    // =========================

    const submitVehicle = async(e)=>{


        e.preventDefault();



        try{


            if(editId){


                await api.put(

                    `/vehicles/${editId}`,

                    form,

                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }

                );


                alert("Véhicule modifié");


            }else{


                await api.post(

                    "/vehicles",

                    form,

                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }

                );


                alert("Véhicule ajouté");


            }



            setForm({

                brand:"",
                model:"",
                year:"",
                engine:""

            });


            setEditId(null);


            getVehicles();



        }catch(error){


            console.log(
                "SAVE ERROR :",
                error.response?.data || error.message
            );


        }


    };






    // =========================
    // EDIT
    // =========================

    const editVehicle=(vehicle)=>{


        setForm({

            brand:vehicle.brand,

            model:vehicle.model,

            year:vehicle.year,

            engine:vehicle.engine

        });


        setEditId(vehicle._id);


    };







    // =========================
    // DELETE
    // =========================

    const deleteVehicle = async(id)=>{


        if(!window.confirm("Supprimer ce véhicule ?"))
            return;



        try{


            await api.delete(

                `/vehicles/${id}`,

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            getVehicles();



        }catch(error){


            console.log(
                error.response?.data || error.message
            );


        }


    };





    if(loading){

        return <h3>Chargement...</h3>;

    }





    return (

        <div className="admin-vehicles">



            <h2>
                🚗 Gestion des véhicules
            </h2>





            <form
            className="vehicle-form"
            onSubmit={submitVehicle}
            >



                <input

                    type="text"

                    name="brand"

                    placeholder="Marque (Toyota)"

                    value={form.brand}

                    onChange={handleChange}

                />



                <input

                    type="text"

                    name="model"

                    placeholder="Modèle (Corolla)"

                    value={form.model}

                    onChange={handleChange}

                />



                <input

                    type="number"

                    name="year"

                    placeholder="Année"

                    value={form.year}

                    onChange={handleChange}

                />



                <input

                    type="text"

                    name="engine"

                    placeholder="Motorisation (1.6 Essence)"

                    value={form.engine}

                    onChange={handleChange}

                />





                <button className="btn-save">

                    {
                    editId
                    ?
                    "Modifier"
                    :
                    "Ajouter"
                    }

                </button>


            </form>









            <table className="vehicle-table">


                <thead>

                    <tr>

                        <th>
                            Marque
                        </th>

                        <th>
                            Modèle
                        </th>

                        <th>
                            Année
                        </th>

                        <th>
                            Moteur
                        </th>

                        <th>
                            Actions
                        </th>


                    </tr>

                </thead>




              <tbody>

{
    vehicles.map((vehicle) => (

        <tr key={vehicle._id}>

            <td>
                {vehicle.brand}
            </td>

            <td>
                {vehicle.model}
            </td>

            <td>
                {vehicle.year}
            </td>

            <td>
                {vehicle.engine}
            </td>

            <td>

                <button
                    className="btn-edit"
                    onClick={() => editVehicle(vehicle)}
                >
                    ✏️
                </button>


                <button
                    className="btn-delete"
                    onClick={() => deleteVehicle(vehicle._id)}
                >
                    🗑️
                </button>

            </td>

        </tr>

    ))
}

</tbody>



            </table>



        </div>

    );


}


export default AdminVehicles;