import Table from "rc-table";
import DeleteButton from "./DeleteButton";

export const Rctable = ({ aircraft, setAircraftSearch }) => {
    let data = [];
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 10,
            className: "tblColumn",
        },
        {
            title: "Marca",
            dataIndex: "marca",
            key: "marca",
            width: 10,
            className: "tblColumn",
        },
        {
            title: "Modelo",
            dataIndex: "modelo",
            key: "modelo",
            width: 10,
            className: "tblColumn",
        },
        {
            title: "Ano",
            dataIndex: "ano",
            key: "ano",
            width: 10,
            className: "tblColumn",
        },
        {
            title: "Vendido",
            dataIndex: "vendido",
            key: "vendido",
            width: 10,
            className: "tblColumn",
        },
        {
            title: "Excluir",
            dataIndex: "excluir",
            key: "excluir",
            width: 10,
            className: "tblColumn",
        },
    ];

    if (aircraft.length) {
        data = aircraft.map((a, key) => {
            const formatData = {
                id: a.id,
                marca: a.brand,
                modelo: a.name,
                ano: a.year,
                key: key,
                vendido: a.sold ? "Sim" : "Não",
                excluir: (
                    <DeleteButton
                        id={a.id}
                        aircraftSearch={aircraft}
                        setAircraftSearch={setAircraftSearch}
                    />
                ),
            };
            return formatData;
        });
    }

    return <Table columns={columns} data={data} tableLayout="auto" />;
};
