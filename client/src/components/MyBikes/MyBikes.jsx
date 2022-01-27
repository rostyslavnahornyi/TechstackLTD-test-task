import React from "react";
import { WrapperBike, Button } from "./style";
import axios from "axios";

const clickHandler = (event, id) => {
    axios.put(`/app/${id}`);
};

const MyBikes = ({ bikes, updateData, sum }) => {
    const Bike = ({ id, name, type, price, rented }) => {
        return (
            <WrapperBike>
                <div>
                    {name} / {type} / ${price}
                </div>
                <div>
                    <Button
                        onClick={(e) => {
                            clickHandler(e, id);
                            updateData(id, rented);
                        }}
                        style={{ background: "crimson" }}
                    >
                        Cancel rent
                    </Button>
                </div>
            </WrapperBike>
        );
    };

    return (
        <>
            <h3>&#129297; Your rent (Total: ${sum})</h3>
            <div>
                {bikes.map((bike) => (
                    <Bike
                        key={bike.id_bike}
                        id={bike.id_bike}
                        name={bike.name}
                        type={bike.type}
                        price={bike.price}
                        rented={bike.rented}
                    />
                ))}
            </div>
        </>
    );
};

export default MyBikes;
