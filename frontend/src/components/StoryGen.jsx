import React, { useState } from "react";

export default function StoryGen() {
    const [customName, setCustomName] = useState("");
    const [unit, setUnit] = useState("us"); // "us" or "uk"

    const testLog = () => {
        console.log("Custom Name:", customName);
        console.log("Unit Selected:", unit);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Commit 1: Input + Radio Test</h2>

            <input
                type="text"
                placeholder="Enter custom name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                style={{ padding: "6px", marginRight: "10px" }}
            />

            <label>
                <input
                    type="radio"
                    name="unit"
                    value="us"
                    checked={unit === "us"}
                    onChange={() => setUnit("us")}
                />
                US Units
            </label>
            <label style={{ marginLeft: "10px" }}>
                <input
                    type="radio"
                    name="unit"
                    value="uk"
                    checked={unit === "uk"}
                    onChange={() => setUnit("uk")}
                />
                UK Units
            </label>

            <div>
                <button
                    onClick={testLog}
                    style={{
                        marginTop: "10px",
                        padding: "8px 14px",
                        background: "#2196f3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Log for Test
                </button>
            </div>
        </div>
    );
}
