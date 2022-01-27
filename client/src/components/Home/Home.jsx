import axios from "axios";
import { React, useState, useEffect } from "react";
import { Bikes } from "../Bikes/Bikes";
import { Form } from "../Form/Form";
import MyBikes from "../MyBikes/MyBikes";

const Home = () => {
    const [data, setData] = useState([]);
    const [bikes, setBikes] = useState({
        rented: [],
        available: [],
    });
    const [sum, setSum] = useState(0);
    const [length, setLength] = useState(0);

    useEffect(() => {
        axios.get("/app").then((response) => setData(response.data));
    }, []);

    useEffect(() => {
        const rented = data.filter((bike) => bike.rented);
        const available = data.filter((bike) => !bike.rented);

        let sum = 0;
        rented.forEach((bike) => (sum += +bike.price));

        setBikes({ rented, available });
        setSum(sum);
        setLength(available.length);
    }, [data]);

    useEffect(() => {}, [bikes]);

    const addData = (data) => {
        axios.get("/app").then((response) => setData(response.data));
    };

    const updateData = (id, rented) => {
        let updatedBike;
        if (rented) {
            updatedBike = bikes.rented.filter((bike) => bike.id_bike === id);
        } else {
            updatedBike = bikes.available.filter((bike) => bike.id_bike === id);
        }
        updatedBike = updatedBike[0];

        if (updatedBike.rented) {
            const newRented = bikes.rented.filter(
                (bike) => bike !== updatedBike
            );
            updatedBike.rented = false;
            const newAvailable = [...bikes.available, updatedBike];
            setBikes({ rented: newRented, available: newAvailable });
        } else {
            const newAvailable = bikes.available.filter(
                (bike) => bike !== updatedBike
            );
            updatedBike.rented = true;
            const newRented = [...bikes.rented, updatedBike];
            setBikes({ rented: newRented, available: newAvailable });
        }
    };

    const deleteData = (id) => {
        let newAvailable = bikes.available.filter(
            (bike) => bike.id_bike !== id
        );
        setBikes({ ...bikes, available: newAvailable });
    };

    return (
        <>
            <h1>Awesome Bike Rental</h1>
            <Form addData={addData} />
            <MyBikes updateData={updateData} bikes={bikes.rented} sum={sum} />
            <Bikes
                updateData={updateData}
                deleteData={deleteData}
                bikes={bikes.available}
                length={length}
            />
        </>
    );
};

export default Home;
