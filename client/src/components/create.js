import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    //state properties of form
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
    });
    const navigate = useNavigate();

    //update state properties of form
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }

    //handle form submission
    async function onSubmit(e) {
        e.preventDefault();

        //add new record to db when post request sent to the create url
        const newPerson = { ...form };
        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPerson),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({ name: "", position: "", level: ""})
        navigate("/");

        //display of form that takes input from user
        return (
            <div>
                <h3>Create New Record</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm({name: e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="positionOptions"
                                id="positionIntern"
                                value="Intern"
                                checked={form.level === "Intern"}
                                onChange={(e) => updateForm({ level: e.target.value})}
                            />
                            <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="positionOptions"
                                id="positionJunior"
                                value="Junior"
                                checked={form.level === "Junior"}
                                onChange={(e) => updateForm({ level: e.target.value})}
                            />
                            <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="positionOptions"
                                id="positionSenior"
                                value="Senior"
                                checked={form.level === "Senior"}
                                onChange={(e) => updateForm({ level: e.target.value})}
                            />
                            <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create person"
                            className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}