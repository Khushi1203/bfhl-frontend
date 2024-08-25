import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const parsedInput = JSON.parse(jsonInput);
            const res = await fetch('/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedInput)
            });
            const data = await res.json();
            setResponse(data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleCheckboxChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <div className="App">
            <h1 className="title">{response?.roll_number || 'BFHL - JSON Processor'}</h1>
            <form onSubmit={handleSubmit} className="form">
                <textarea
                    className="json-input"
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Enter JSON here (e.g., {"data": ["A", "1", "b"]})'
                    rows={5}
                />
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {error && <p className="error">{error}</p>}
            {response && (
                <div className="response-section">
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('alphabets')}
                                checked={selectedOptions.includes('alphabets')}
                            />
                            Alphabets
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('numbers')}
                                checked={selectedOptions.includes('numbers')}
                            />
                            Numbers
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('highest_lowercase_alphabet')}
                                checked={selectedOptions.includes('highest_lowercase_alphabet')}
                            />
                            Highest Lowercase Alphabet
                        </label>
                    </div>
                    <div className="response-output">
                        {selectedOptions.includes('alphabets') && (
                            <p><strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}</p>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>
                        )}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <p><strong>Highest Lowercase Alphabet:</strong> {JSON.stringify(response.highest_lowercase_alphabet)}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
