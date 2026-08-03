import { useEffect, useState } from "react";
import api from "../api/axios";
import "../components/css/VehicleFilter.css";

function VehicleFilter({ onSearch }) {

    const [vehicles, setVehicles] = useState([]);

    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [engine, setEngine] = useState("");

    // ==========================
    // LOAD VEHICLES
    // ==========================

    useEffect(() => {

        getVehicles();

    }, []);

    const getVehicles = async () => {

        try {

            const res = await api.get("/vehicles");

            setVehicles(res.data.vehicles);

        } catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // FILTERS
    // ==========================

    const brands = [...new Set(
        vehicles.map(v => v.brand)
    )];

    const models = [...new Set(

        vehicles
            .filter(v => v.brand === brand)
            .map(v => v.model)

    )];

    const years = [...new Set(

        vehicles
            .filter(
                v =>
                    v.brand === brand &&
                    v.model === model
            )
            .map(v => v.year)

    )];

    const engines = [...new Set(

        vehicles
            .filter(
                v =>
                    v.brand === brand &&
                    v.model === model &&
                    v.year === Number(year)
            )
            .map(v => v.engine)

    )];

    // ==========================
    // SEARCH
    // ==========================

    const handleSearch = () => {

        const vehicle = vehicles.find(

            v =>
                v.brand === brand &&
                v.model === model &&
                v.year === Number(year) &&
                v.engine === engine

        );

        if (!vehicle) {

            alert("Véhicule introuvable");

            return;

        }

        onSearch(vehicle._id);

    };

    return (

        <div className="vehicle-filter">

            <h3>
                🚗 Trouver une pièce par véhicule
            </h3>

            <div className="vehicle-grid">

                <select
                    value={brand}
                    onChange={(e) => {

                        setBrand(e.target.value);

                        setModel("");
                        setYear("");
                        setEngine("");

                    }}
                >

                    <option value="">
                        Marque
                    </option>

                    {
                        brands.map(item => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item}

                            </option>

                        ))
                    }

                </select>

                <select
                    value={model}
                    onChange={(e) => {

                        setModel(e.target.value);

                        setYear("");
                        setEngine("");

                    }}
                >

                    <option value="">
                        Modèle
                    </option>

                    {
                        models.map(item => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item}

                            </option>

                        ))
                    }

                </select>

                <select
                    value={year}
                    onChange={(e) => {

                        setYear(e.target.value);

                        setEngine("");

                    }}
                >

                    <option value="">
                        Année
                    </option>

                    {
                        years.map(item => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item}

                            </option>

                        ))
                    }

                </select>

                <select
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
                >

                    <option value="">
                        Motorisation
                    </option>

                    {
                        engines.map(item => (

                            <option
                                key={item}
                                value={item}
                            >

                                {item}

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