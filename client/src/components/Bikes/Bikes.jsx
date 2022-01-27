import React from "react";
import { WrapperBike, Buttons, Button } from "./style";
import axios from "axios";

const clickHandlerRent = (event, id) => {
    axios.put(`/app/${id}`);
};

const clickHandlerDelete = (event, id) => {
    axios.delete(`/app/${id}`);
};

export const Bikes = ({ bikes, updateData, deleteData, length }) => {
    const Bike = ({ id, name, type, price, rented }) => {
        return (
            <WrapperBike>
                <div>
                    {name} / {type} / ${price}
                </div>
                <Buttons>
                    <Button
                        onClick={(e) => {
                            clickHandlerRent(e, id);
                            updateData(id, rented);
                        }}
                        style={{ background: "darkblue" }}
                    >
                        Rent
                    </Button>
                    <Button
                        onClick={(e) => {
                            clickHandlerDelete(e, id);
                            deleteData(id);
                        }}
                        style={{ background: "crimson" }}
                    >
                        Delete
                    </Button>
                </Buttons>
            </WrapperBike>
        );
    };

    return (
        <>
            <h3>&#128690; Available bicycles ({length})</h3>
            <div>
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
            </div>
        </>
    );
};
