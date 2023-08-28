import styled from "styled-components";
import axios from "axios";

export default function DeleteButton({
    id,
    aircraftSearch,
    setAircraftSearch,
}) {
    function handleDelete() {
        const promise = axios.delete(`http://localhost:8080/aeronaves/${id}`);
        promise
            .then(() => {
                alert("Registro removido com sucesso!");
                getAllAircraft();
            })
            .catch((err) => {
                alert(err.message);
            });
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

    return <StyledDeleteButton onClick={handleDelete}>X</StyledDeleteButton>;
}

const StyledDeleteButton = styled.button`
    width: 20px;
    border-style: none;
    cursor: pointer;
`;
