import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import airplane from "./assets/img/airplane.jpg";
import { Rctable } from "./RcTable";

export default function Home() {
    const [brand, setBrand] = useState("");
    const [aircraft, setAircraft] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [sold, setSold] = useState("");
    const [search, setSearch] = useState("");
    const [aircraftSearch, setAircraftSearch] = useState([]);
    const brands = ["Embraer", "Boeing", "Airbus"];
    const yearsArray = aircraftSearch && aircraftSearch.map((a) => a.year);
    const brandsArray = aircraftSearch && aircraftSearch.map((a) => a.brand);
    const filteredEmbraer =
        brandsArray && brandsArray.filter((b) => b === "Embraer");
    const filteredAirbus =
        brandsArray && brandsArray.filter((b) => b === "Airbus");
    const filteredBoeing =
        brandsArray && brandsArray.filter((b) => b === "Boeing");
    const filteredNineties =
        yearsArray && yearsArray.filter((year) => year >= 1990 && year < 2000);
    const filteredZeroTen =
        yearsArray && yearsArray.filter((year) => year >= 2000 && year < 2010);

    function handleSubmit(e) {
        e.preventDefault();
        if (brands.indexOf(brand) === -1) {
            alert("Nome da marca incorreto.");
            return;
        }
        const request = {
            name: aircraft,
            brand: brand,
            year: Number(year),
            description: description,
            sold: sold === "true" ? true : false,
        };
        const promise = axios.post("http://localhost:8080/aeronaves", request);
        promise.then(() => {
            alert("Aeronave registrada com sucesso.");
            getAllAircraft();
        });
        promise.catch((err) => {
            alert(err.message);
        });
    }

    function handleSearch() {
        const isId = /^\d+(?:\.\d+)?$/.test(search);
        if (isId) {
            const promiseId = axios.get(
                `http://localhost:8080/aeronaves/${search}`
            );
            promiseId.then((res) => {
                const isEqual =
                    JSON.stringify([res.data]) ===
                    JSON.stringify(aircraftSearch);
                if (!isEqual) {
                    const data = [res.data];
                    setAircraftSearch(data);
                }
            });
        } else {
            const promiseModel = axios.get(
                `http://localhost:8080/aeronaves/find?name=${search}`
            );
            promiseModel
                .then((res) => {
                    const isEqual =
                        JSON.stringify([res.data]) ===
                        JSON.stringify(aircraftSearch);
                    if (!isEqual) {
                        const data = [res.data];
                        setAircraftSearch(data);
                    }
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    }

    function getAllAircraft() {
        const promise = axios.get(`http://localhost:8080/aeronaves`);
        promise
            .then((res) => {
                const isEqual =
                    JSON.stringify(res.data) === JSON.stringify(aircraftSearch);
                if (!isEqual) {
                    setAircraftSearch(res.data);
                }
            })
            .catch((err) => {
                alert(err.message);
            });
    }

    useEffect(() => {
        if (!search) {
            getAllAircraft();
        } else {
            handleSearch();
        }
    }, [search, aircraftSearch]);

    return (
        <Container>
            <h1>Gestão de Aeronaves</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    placeholder="Marca"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <input
                    required
                    type="text"
                    placeholder="Aeronave"
                    value={aircraft}
                    onChange={(e) => setAircraft(e.target.value)}
                />
                <input
                    required
                    type="number"
                    placeholder="Ano"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <select
                    required
                    value={sold}
                    onChange={(e) => setSold(e.target.value)}
                >
                    <option value={""} disabled defaultValue={null} hidden>
                        Vendido
                    </option>
                    <option
                        value={true}
                        onChange={(e) => setSold(e.target.value)}
                    >
                        Sim
                    </option>
                    <option
                        value={false}
                        onChange={(e) => setSold(e.target.value)}
                    >
                        Não
                    </option>
                </select>
                <input
                    required
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Salvar</button>
            </Form>

            <SecondContainer>
                <p>
                    <span>Década 90: </span> {filteredNineties.length} aeronaves
                </p>
                <p>
                    <span>Década 00: </span> {filteredZeroTen.length} aeronaves
                </p>
                <p>
                    <span>Essa semana: </span>
                </p>

                <SearchInput
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisa por Modelo ou ID"
                ></SearchInput>
            </SecondContainer>
            <ThirdContainer>
                {aircraftSearch && (
                    <Rctable
                        aircraft={aircraftSearch}
                        setAircraftSearch={setAircraftSearch}
                    />
                )}
            </ThirdContainer>
            <FourthContainer>
                <span>Marcas</span>
                <p>
                    <span>Embraer:</span> {filteredEmbraer.length} aeronaves
                </p>
                <p>
                    <span>Boeing:</span> {filteredBoeing.length} aeronaves
                </p>
                <p>
                    <span>Airbus:</span> {filteredAirbus.length} aeronaves
                </p>
            </FourthContainer>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url(${airplane});
    font-family: "Roboto", sans-serif;
    h1 {
        font-size: 45px;
        font-weight: 400;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    img {
        width: 20px;
        height: 20px;
    }
`;

const SecondContainer = styled.div`
    width: 12%;
    margin-top: 30px;
    padding-right: 175px;
    position: relative;
    font-size: 19px;
    :nth-child(3) {
        position: absolute;
        right: 0px;
        top: 19px;
    }
    p {
        margin-top: 2px;
    }
    span {
        font-weight: 700;
    }
`;

const ThirdContainer = styled.div`
    font-size: 17px;
    color: white;
    margin-top: 10px;
    background-color: #ffffff;
    line-height: 22px;
    border-radius: 8px;
    .tblColumn {
        color: black;
        padding-left: 20px;
        padding-right: 30px;
    }
`;

const FourthContainer = styled.div`
    width: 12%;
    margin-top: 30px;
    padding-right: 175px;
    color: #f0ffff;
    font-size: 19px;
    p {
        margin-top: 2px;
    }
    span {
        font-weight: 700;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    :nth-child(3) {
        width: 100px;
    }
    input {
        display: flex;
        width: 300px;
        justify-content: center;
        margin-bottom: 5px;
        height: 25px;
        border-style: solid;
        border-radius: 8px;
        font-family: "Roboto", sans-serif;
    }
    ::placeholder {
        padding-left: 4px;
    }
    select {
        width: 100px;
        height: 25px;
        border-style: solid;
        border-radius: 8px;
        font-family: "Roboto", sans-serif;
        position: absolute;
        right: 0px;
        bottom: 45px;
    }
    button {
        position: absolute;
        right: 0px;
        top: 145px;
        width: 80px;
        border-style: solid;
        border-radius: 8px;
        font-family: "Roboto", sans-serif;
        cursor: pointer;
    }
`;

const SearchInput = styled.input`
    margin-top: 10px;
    margin-bottom: 10px;
    height: 25px;
    border-style: solid;
    border-radius: 7px;
    width: 200px;
    font-family: "Roboto", sans-serif;
`;
