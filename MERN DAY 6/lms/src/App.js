import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData({
      name,
      surname,
      dob,
      address,
      phone,
      email,
      zip,
    });
  };

  return (
    <div
      style={{
        background: "Gold",
        width: "550px",
        margin: "40px auto",
        padding: "30px",
        boxShadow: "0px 0px 20px gray",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        Registration Form For Sports
      </h2>

      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        
        {/* Row 1 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        {/* Row 2 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Sur Name:</label>
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        {/* Row 3 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Date Of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        {/* Row 4 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Address:</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        {/* Row 5 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Phone:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        {/* Row 6 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        {/* Row 7 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "inline-block", width: "140px" }}>Zip:</label>
          <input
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "5px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      {/* TABLE OUTPUT */}
      {submittedData && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ textAlign: "center" }}>Submitted Data</h3>

          <table
            border="1"
            width="100%"
            style={{ borderCollapse: "collapse", background: "white" }}
          >
            <tbody>
              <tr><td>Name</td><td>{submittedData.name}</td></tr>
              <tr><td>Sur Name</td><td>{submittedData.surname}</td></tr>
              <tr><td>Date Of Birth</td><td>{submittedData.dob}</td></tr>
              <tr><td>Address</td><td>{submittedData.address}</td></tr>
              <tr><td>Phone</td><td>{submittedData.phone}</td></tr>
              <tr><td>Email</td><td>{submittedData.email}</td></tr>
              <tr><td>Zip</td><td>{submittedData.zip}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
