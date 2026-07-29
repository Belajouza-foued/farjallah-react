import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/AdminDeliveryNotes.css";


function AdminDeliveryNotes() {


    const [deliveries, setDeliveries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const token = localStorage.getItem("token");



    // =========================
    // GET DELIVERY NOTES
    // =========================

    const getDeliveries = async()=>{

        try{

            const res = await api.get(
                "/delivery",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            console.log("DELIVERY RESPONSE :",res.data);


            if(res.data.success){

                setDeliveries(
                    res.data.deliveries || []
                );

            }


        }catch(error){

            console.log(
                "DELIVERY ERROR :",
                error.response?.data || error.message
            );

        }finally{

            setLoading(false);

        }

    };



    useEffect(()=>{

        getDeliveries();

    },[]);





    // =========================
    // SEARCH
    // =========================

    const filteredDeliveries = deliveries.filter(delivery=>{


        const text = search.toLowerCase();


        return (

            delivery.deliveryNumber
            ?.toLowerCase()
            .includes(text)


            ||

            delivery.customer?.firstName
            ?.toLowerCase()
            .includes(text)


            ||

            delivery.customer?.lastName
            ?.toLowerCase()
            .includes(text)

        );


    });





    // =========================
    // PDF
    // =========================


    const downloadPDF = async(id)=>{


        try{


            const response = await api.get(

                `/delivery/${id}/pdf`,

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },

                    responseType:"blob"
                }

            );



            const blob = new Blob(
                [response.data],
                {
                    type:"application/pdf"
                }
            );


            const url =
            window.URL.createObjectURL(blob);



            const link =
            document.createElement("a");


            link.href=url;


            link.download="bon-livraison.pdf";


            document.body.appendChild(link);


            link.click();


            link.remove();


            window.URL.revokeObjectURL(url);



        }catch(error){


            console.log(
                "PDF ERROR :",
                error.response?.data || error.message
            );

        }


    };





    if(loading){

        return(

            <div className="delivery-loading">

                Chargement des bons de livraison...

            </div>

        );

    }





    return(

        <div className="admin-delivery">


            <div className="delivery-header">


                <div>

                    <h2>
                        🚚 Gestion des bons de livraison
                    </h2>


                    <p>
                        Suivi des livraisons clients
                    </p>


                </div>




                <input

                    type="text"

                    className="delivery-search"

                    placeholder="🔍 Rechercher un bon ou client..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />


            </div>





            <div className="delivery-stats">


                <div className="delivery-card">

                    <h4>
                        Total bons
                    </h4>

                    <strong>
                        {deliveries.length}
                    </strong>

                </div>




                <div className="delivery-card">

                    <h4>
                        Montant total
                    </h4>


                    <strong>

                    {
                        deliveries.reduce(
                            (sum,item)=>
                            sum + item.total,
                            0
                        )
                    }

                    DT

                    </strong>


                </div>




                <div className="delivery-card">

                    <h4>
                        Livrés
                    </h4>


                    <strong>

                    {
                        deliveries.filter(
                            item=>
                            item.status==="delivered"
                        ).length
                    }

                    </strong>


                </div>


            </div>







            <div className="delivery-table-container">


                <table className="delivery-table">


                    <thead>

                        <tr>

                            <th>
                                Bon
                            </th>


                            <th>
                                Client
                            </th>


                            <th>
                                Total
                            </th>


                            <th>
                                Statut
                            </th>


                            <th>
                                Date
                            </th>


                            <th>
                                Action
                            </th>


                        </tr>


                    </thead>




                    <tbody>


                    {
                        filteredDeliveries.map(delivery=>(


                            <tr key={delivery._id}>


                                <td>
                                    {delivery.deliveryNumber}
                                </td>




                                <td>

                                {
                                    delivery.customer?.firstName

                                    ?

                                    `${delivery.customer.firstName} ${delivery.customer.lastName || ""}`

                                    :

                                    "Client inconnu"
                                }

                                </td>




                                <td>

                                    {delivery.total} DT

                                </td>





                                <td>

                                    <span
                                    className={
                                        `delivery-status ${delivery.status}`
                                    }
                                    >

                                    {delivery.status}

                                    </span>

                                </td>





                                <td>

                                {
                                    new Date(
                                        delivery.createdAt
                                    )
                                    .toLocaleDateString("fr-FR")
                                }

                                </td>





                                <td>

                                    <button

                                    className="btn-delivery-pdf"

                                    onClick={()=>
                                        downloadPDF(delivery._id)
                                    }

                                    >

                                    📄 PDF

                                    </button>

                                </td>



                            </tr>


                        ))
                    }


                    </tbody>


                </table>


            </div>



        </div>


    );


}


export default AdminDeliveryNotes;