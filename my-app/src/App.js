import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [template, setTemplate] = useState("template1");
  const [savedCards, setSavedCards] = useState([]);
  const cardRef = useRef(null);
  const [student, setStudent] = useState({
    name: "",
    id: "",
    department: "",
    photo: "",
    allergies: "",
    rack: "",
    busRoute: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cards");
    if (stored) setSavedCards(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const updatedCards = [...savedCards, student];
    setSavedCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const link = document.createElement("a");
    link.download = `${student.name}_ID_Card.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadOldCard = async (card) => {
    const tempRef = document.createElement("div");
    tempRef.className = "p-6 w-80 rounded-xl shadow-lg text-center space-y-2 bg-danger-red text-blue-800";
    tempRef.innerHTML = `
      <img src="${card.photo}" alt="student" class="w-full h-40 object-cover rounded" />
      <h2 class="text-lg font-bold">${card.name}</h2>
      <p padding-right:140px><strong>ID:</strong> ${card.id}</p>
      <p><strong>Dept:</strong> ${card.department}</p>
      <p><strong>Allergies:</strong> ${card.allergies}</p>
      <p><strong>Rack:</strong> ${card.rack}</p>
      <p><strong>Bus:</strong> ${card.busRoute}</p>
    `;
    document.body.appendChild(tempRef);
    const canvas = await html2canvas(tempRef);
    const link = document.createElement("a");
    link.download = `${card.name}_ID_Card.png`;
    link.href = canvas.toDataURL();
    link.click();
    document.body.removeChild(tempRef);
  };

  const deleteCard = (index) => {
    const updatedCards = savedCards.filter((_, i) => i !== index);
    setSavedCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 space-y-8">
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Student ID Form
          </h2>

          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="template1">Classic Template</option>
            <option value="template2">Modern Template</option>
          </select>

          {["name", "id", "department", "photo", "allergies", "rack", "busRoute"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Generate ID Card
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div
            ref={cardRef}
            className={`p-6 w-80 rounded-xl shadow-lg text-center space-y-2 ${
              template === "template1"
                ? "bg-white text-blue-800"
                : "bg-gradient-to-br from-purple-600 to-pink-500 text-white"
            }`}
          >
          <img
  src={
    student.photo ||
    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTEyL3Jhd3BpeGVsb2ZmaWNlMl9waG90b19vZl95b3VuZ19pbmRpYW5fbWFuX3dpdGhfc3R1ZGVudF9iYWNrcGFja19mZDRjODAxYi05MjQxLTRiOTYtODM2Mi01ZWM1ZTBlYTAwMDUtbTRpNmdxcWcucG5n.png"
  }
  alt="student"
  className="w-full h-90 object-cover rounded"
/>
            <h2 className="text-lg font-bold">{student.name}</h2>
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Dept:</strong> {student.department}</p>
            <p><strong>Allergies:</strong> {student.allergies || "None"}</p>
            <p><strong>Rack:</strong> {student.rack}</p>
            <p><strong>Bus:</strong> {student.busRoute}</p>
            <QRCode value={JSON.stringify(student)} size={100} className="mx-auto"/>
          </div>

          <button
            onClick={downloadCard}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Download as PNG
          </button>
        </div>
      )}

      {savedCards.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h3 className="text-xl font-bold text-center mb-4 text-gray-800">Saved Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-4 space-y-2 flex flex-col justify-between"
              >
                <h4 className="font-semibold text-blue-700">{card.name}</h4>
                <p>ID: {card.id}</p>
                <p>Dept: {card.department}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => downloadOldCard(card)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => deleteCard(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

