import { useEffect, useState,useCallback } from "react";
import api from "../api/axios";
import "../styles/AdminInvoices.css";


function AdminInvoices() {


    const [invoices, setInvoices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");



    const token = localStorage.getItem("token");



    // =========================
    // GET INVOICES
    // =========================

 const getInvoices = useCallback(async () => {
    try {

        const res = await api.get("/admin/invoices", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("API RESPONSE :", res.data);

        if (res.data.success) {
            setInvoices(res.data.invoices ?? []);
        }

    } catch (error) {

        console.log("ERREUR :", error.response?.data || error.message);

    } finally {

        setLoading(false);

    }
}, [token]);



 useEffect(() => {
    getInvoices();
}, [getInvoices]);





    // =========================
    // SEARCH
    // =========================


    const filteredInvoices = invoices.filter(invoice=>{


        const text = search.toLowerCase();



        return (

            invoice.invoiceNumber
            ?.toLowerCase()
            .includes(text)

            ||

            invoice.customer?.firstName
            ?.toLowerCase()
            .includes(text)

            ||

            invoice.customer?.lastName
            ?.toLowerCase()
            .includes(text)

        );


    });





    // =========================
    // PDF
    // =========================


   const downloadPDF = async(id)=>{

    const token = localStorage.getItem("token");

    try{

        const response = await api.get(
            `/invoices/${id}/pdf`,
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


        const url = window.URL.createObjectURL(blob);


        const link = document.createElement("a");

        link.href = url;

        link.download = "facture.pdf";

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

        return (

            <div className="invoice-loading">

                Chargement des factures...

            </div>

        );

    }


console.log("Nombre de factures :", invoices.length);
console.log(invoices);


    return (


        <div className="admin-invoices">



            <div className="invoice-header">


                <div>

                    <h2>
                        📄 Gestion des factures
                    </h2>

                    <p>
                        Suivi des factures clients
                    </p>

                </div>




                <input

                    type="text"

                    className="invoice-search"

                    placeholder="🔍 Rechercher facture ou client..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />


            </div>







            <div className="invoice-stats">


                <div className="invoice-stat-card">

                    <h4>
                        Total factures
                    </h4>

                    <strong>
                        {invoices.length}
                    </strong>

                </div>




                <div className="invoice-stat-card">

                    <h4>
                        Montant total
                    </h4>

                    <strong>

                        {
                            invoices
                            .reduce(
                                (sum,item)=>sum+item.total,
                                0
                            )
                        }

                        DT

                    </strong>


                </div>




                <div className="invoice-stat-card">

                    <h4>
                        Factures payées
                    </h4>


                    <strong>

                        {
                            invoices.filter(
                                item=>item.status==="paid"
                            ).length
                        }

                    </strong>


                </div>



            </div>







            {/* DESKTOP TABLE */}


            <div className="invoice-table-container">


                <table className="invoice-table">


                    <thead>

                        <tr>

                            <th>
                                Facture
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
                                Actions
                            </th>


                        </tr>

                    </thead>

<tbody>

{
filteredInvoices.length === 0 ?

<tr>
    <td colSpan="6" style={{textAlign:"center"}}>
        Aucune facture trouvée
    </td>
</tr>

:

filteredInvoices.map(invoice => (

<tr key={invoice._id}>

    <td>{invoice.invoiceNumber}</td>

    <td>
        {invoice.customer
            ? `${invoice.customer.firstName} ${invoice.customer.lastName}`
            : "Client inconnu"}
    </td>

    <td>{invoice.total} DT</td>

    <td>{invoice.status}</td>

    <td>
        {new Date(invoice.createdAt).toLocaleDateString("fr-FR")}
    </td>

    <td>
        <button
            className="btn-pdf"
            onClick={() => downloadPDF(invoice._id)}
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








            {/* MOBILE CARDS */}


            <div className="invoice-mobile">


            {
                filteredInvoices.map(invoice=>(


                    <div
                    className="invoice-card-mobile"
                    key={invoice._id}
                    >


                        <h4>
                            {invoice.invoiceNumber}
                        </h4>



                        <p>

                        👤 

                        {
                        invoice.customer
                        ?
                        `${invoice.customer.firstName} ${invoice.customer.lastName}`
                        :
                        "Client inconnu"
                        }

                        </p>



                        <p>

                        💰 {invoice.total} DT

                        </p>



                        <p>

                        📅

                        {
                        new Date(invoice.createdAt)
                        .toLocaleDateString("fr-FR")
                        }

                        </p>



                        <button
                        className="btn-pdf"
                        onClick={()=>downloadPDF(invoice._id)}
                        >

                        📄 Télécharger PDF

                        </button>



                    </div>


                ))
            }


            </div>





        </div>


    );


}


export default AdminInvoices;