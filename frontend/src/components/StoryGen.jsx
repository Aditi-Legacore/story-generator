import React, { useState, useEffect } from "react";

export default function StoryGen() {
    const [customName, setCustomName] = useState("");
    const [unit, setUnit] = useState("us"); // "us" or "uk"
    const [stories, setStories] = useState([]);
    const [currentStory, setCurrentStory] = useState("");

    useEffect(() => {
        fetch("/stories.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched stories:", data);
                setStories(data);
            })
            .catch((err) => console.error("Error loading stories:", err));
    }, []);

    const generateStory = () => {
        if (stories.length === 0) return;

        let story = stories[Math.floor(Math.random() * stories.length)];

        // This is a regular expression (regex).
        // /Bob/ matches the text "Bob".
        // The g flag = global → replace all occurrences, not just the first.
        if (customName.trim()) {
            story = story.replace(/Bob/g, customName);
        }

        if (unit === "uk") {
            story = story.replace(/(\d+)\s?°F/g, (_, f) => {
                const c = Math.round(((parseInt(f) - 32) * 5) / 9);
                return `${c}°C`;
            });

            story = story.replace(/(\d+)\s?pounds?/g, (_, lbs) => {
                const stones = (parseInt(lbs) / 14).toFixed(1);
                const kg = (parseInt(lbs) * 0.453592).toFixed(1);
                return `${stones} stone (${kg} kg)`;
            });
        }

        setCurrentStory(story);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Silly Story Generator 🎉</h2>
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
                    onClick={generateStory}
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
                    Generate Random Story
                </button>

                {currentStory && (
                    <p
                        style={{
                            marginTop: "20px",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            background: "#f9f9f9"
                        }}
                    >
                        {currentStory}
                    </p>
                )}
            </div>
        </div>
    );
}
