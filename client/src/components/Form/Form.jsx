import axios from "axios";
import { React, useState } from "react";
import { Block, Wrapper, Input, Select, Button } from "./style";

export const Form = ({ addData }) => {
    const [data, setData] = useState({
        name: "Noname",
        type: "Custom",
        price: 1,
    });

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post("/app", data);
        addData();
    };

    return (
        <>
            <h3>&#129297; Create new rent</h3>

            <Wrapper onSubmit={submitHandler}>
                <Block>
                    Bike name
                    <Input
                        onChange={(event) =>
                            setData({ ...data, name: event.target.value })
                        }
                        style={{ width: "250px" }}
                    />
                </Block>
                <Block>
                    Bike type
                    <Select
                        onChange={(event) =>
                            setData({ ...data, type: event.target.value })
                        }
                        style={{ width: "250px" }}
                    >
                        <option defaultValue="Mountain">Mountain</option>
                        <option value="Electric">Electric</option>
                        <option value="Roadrace">Roadrace</option>
                    </Select>
                </Block>
                <Block>
                    Rent Price
                    <Input
                        onChange={(event) =>
                            setData({ ...data, price: +event.target.value })
                        }
                        style={{ width: "100px" }}
                    />
                </Block>
                <Block>
                    &nbsp;
                    <Button type="submit" style={{ background: "#50c878" }}>
                        Submit rent
                    </Button>
                </Block>
            </Wrapper>
        </>
    );
};
