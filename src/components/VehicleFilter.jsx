import { useEffect, useState } from "react";
import api from "../api/axios";
import "../components/css/VehicleFilter.css";

function VehicleFilter({ onSearch }) {

    const [vehicles, setVehicles] = useState([]);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [engine, setEngine] = useState("");
    const [fuel, setFuel] = useState("");


    useEffect(() => {

        getVehicles();

    }, []);


    const getVehicles = async () => {

        try {

            const res = await api.get("/vehicles");

            console.log("API VEHICLES :", res.data);

            setVehicles(res.data.vehicles || []);

        } catch (error) {

            console.log(error);

        }

    };


    // MARQUES

    const brands = [
        ...new Set(
            vehicles.map(v => v.brand)
        )
    ];


    // MODELES

    const models = [
        ...new Set(
            vehicles
                .filter(v => v.brand === brand)
                .map(v => v.model)
        )
    ];


    // ANNEES

    const years = [
        ...new Set(
            vehicles
                .filter(
                    v =>
                    v.brand === brand &&
                    v.model === model
                )
                .map(v => v.year)
        )
    ];


    // MOTORISATIONS

    const engines = [
        ...new Set(
            vehicles
                .filter(
                    v =>
                    v.brand === brand &&
                    v.model === model &&
                    v.year === Number(year)
                )
                .map(v => v.engine)
        )
    ];


    // CARBURANTS

    const fuels = [
        ...new Set(
            vehicles
                .filter(
                    v =>
                    v.brand === brand &&
                    v.model === model &&
                    v.year === Number(year) &&
                    v.engine === engine
                )
              .map(v => v.fuel?.trim())
        )
    ];


    const handleSearch = () => {


        const vehicle = vehicles.find(

            v =>
            v.brand === brand &&
            v.model === model &&
            v.year === Number(year) &&
            v.engine === engine &&
             v.fuel?.trim().toLowerCase() === fuel.trim().toLowerCase()

        );


        if(!vehicle){

            alert("Véhicule introuvable");

            return;

        }


        console.log("VEHICLE SELECTED :", vehicle);


        onSearch(vehicle._id);

    };



    return (

        <div className="vehicle-filter">


            <h3>
                <i className="fa-solid fa-car me-2" style={{color:"blue"}}></i>
            Trouver une pièce par véhicule
            </h3>



            <div className="vehicle-grid">


                <select
                value={brand}
                onChange={(e)=>{

                    setBrand(e.target.value);
                    setModel("");
                    setYear("");
                    setEngine("");
                    setFuel("");

                }}
                >

                    <option value="">
                        Marque
                    </option>

                    {
                        brands.map(b=>(

                            <option key={b}>
                                {b}
                            </option>

                        ))
                    }

                </select>



                <select
                value={model}
                onChange={(e)=>{

                    setModel(e.target.value);
                    setYear("");
                    setEngine("");
                    setFuel("");

                }}
                >

                    <option value="">
                        Modèle
                    </option>

                    {
                        models.map(m=>(

                            <option key={m}>
                                {m}
                            </option>

                        ))
                    }

                </select>



                <select
                value={year}
                onChange={(e)=>{

                    setYear(e.target.value);
                    setEngine("");
                    setFuel("");

                }}
                >

                    <option value="">
                        Année
                    </option>

                    {
                        years.map(y=>(

                            <option key={y}>
                                {y}
                            </option>

                        ))
                    }

                </select>




                <select
                value={engine}
                onChange={(e)=>{

                    setEngine(e.target.value);
                    setFuel("");

                }}
                >

                    <option value="">
                        Motorisation
                    </option>


                    {
                        engines.map(e=>(

                            <option key={e}>
                                {e}
                            </option>

                        ))
                    }

                </select>



            <select
  className="fuel-select"
  value={fuel}
  onChange={(e)=>setFuel(e.target.value)}
>
  <option value="">
    Carburant
  </option>

  {
    fuels.map(f=>(
      <option key={f}>
        {f}
      </option>
    ))
  }

</select>


            </div>



            <button
            className="btn-search-vehicle"
            onClick={handleSearch}
            >

                🔍 Rechercher

            </button>


        </div>

    );

}

export default VehicleFilter;