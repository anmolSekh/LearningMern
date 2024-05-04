import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
    <tr>
        <td>{props.record.name}</td>
        <td>{props.record.position}</td>
        <td>{props.record.level}</td>
        <td>
            <Link className="btn btn-link" to={`/edit/${props.record._id}`}>edit</Link>
            <button className="btn btn-link"
                onClick={()=>{
                    props.deleteRecord(props.record._id);
                }}
            >
                Delete 
            </button>
        </td>
    </tr>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    //Fetch records from db
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/record/`)

            if (!response.ok) {
                const message = `An error occured ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);

    //This method will delete a record
    async function deleteRecord(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    //map records to tables
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record = {record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />

            );
        });
    }
    return (
        <div>
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop:20 }}>
                <thread>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thread>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}