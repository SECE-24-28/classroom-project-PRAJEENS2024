import React, { useState } from "react";

export default function App() {
  const [mode, setMode] = useState("register"); 
  const [users, setUsers] = useState([]);

  // REGISTER STATE
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");

  // LOGIN STATE
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [currentUser, setCurrentUser] = useState(null);

  const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

  // REGISTER HANDLER
  const handleRegister = (e) => {
    e.preventDefault();
    setRegError("");

    if (!regName || !regEmail || !regPassword || !regConfirm) {
      setRegError("All fields required!");
      return;
    }
    if (!isValidEmail(regEmail)) {
      setRegError("Invalid email format.");
      return;
    }
    if (regPassword.length < 4) {
      setRegError("Password must be at least 4 characters.");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }
    if (users.some((u) => u.email === regEmail.toLowerCase())) {
      setRegError("Email already registered!");
      return;
    }

    setUsers((prev) => [
      ...prev,
      { name: regName, email: regEmail.toLowerCase(), password: regPassword },
    ]);

    setRegName("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirm("");

    setMode("login");
  };

  // LOGIN HANDLER
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const found = users.find(
      (u) =>
        u.email === loginEmail.trim().toLowerCase() &&
        u.password === loginPassword
    );

    if (!found) {
      setLoginError("Incorrect email or password.");
      return;
    }

    setCurrentUser(found);
    setLoginEmail("");
    setLoginPassword("");
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
    setMode("login");
  };

  // AFTER LOGIN UI
  if (currentUser) {
    return (
      <div style={newStyles.wrapper}>
        <div style={newStyles.card}>
          <h2>Welcome, {currentUser.name}</h2>
          <p style={{ marginBottom: 15 }}>Email: {currentUser.email}</p>

          <button style={newStyles.logoutBtn} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={newStyles.wrapper}>
      <div style={newStyles.card}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {mode === "register" ? "Create Account" : "Login"}
        </h2>

        {/* TAB BUTTONS */}
        <div style={newStyles.tabWrapper}>
          <button
            onClick={() => setMode("register")}
            style={mode === "register" ? newStyles.activeTab : newStyles.tab}
          >
            Register
          </button>
          <button
            onClick={() => setMode("login")}
            style={mode === "login" ? newStyles.activeTab : newStyles.tab}
          >
            Login
          </button>
        </div>

        {/* REGISTER */}
        {mode === "register" ? (
          <form onSubmit={handleRegister} style={newStyles.form}>
            <input
              placeholder="Full Name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              style={newStyles.input}
            />
            <input
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              style={newStyles.input}
            />
            <input
              placeholder="Password"
              type="password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              style={newStyles.input}
            />
            <input
              placeholder="Confirm Password"
              type="password"
              value={regConfirm}
              onChange={(e) => setRegConfirm(e.target.value)}
              style={newStyles.input}
            />

            {regError && <p style={newStyles.error}>{regError}</p>}

            <button style={newStyles.submitBtn}>Register</button>
          </form>
        ) : (
          // LOGIN
          <form onSubmit={handleLogin} style={newStyles.form}>
            <input
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={newStyles.input}
            />
            <input
              placeholder="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={newStyles.input}
            />

            {loginError && <p style={newStyles.error}>{loginError}</p>}

            <button style={newStyles.submitBtn}>Login</button>
          </form>
        )}

        <p style={{ textAlign: "center", marginTop: 10, fontSize: 13 }}>
          Registered Users: {users.length}
        </p>
      </div>
    </div>
  );
}
  
const newStyles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#adf2f8ff",
  },
  card: {
    width: 380,
    background: "#6939ecff",
    padding: 25,
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px 12px",
    fontSize: 15,
    borderRadius: 8,
    border: "1px solid #020202ff",
    outline: "none",
    background: "#f4c6f7ff",
  },
  submitBtn: {
    marginTop: 8,
    padding: "10px 12px",
    background: "#cebe31ff",
    color: "black",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
  },
  logoutBtn: {
    padding: "10px 12px",
    background: "#e53e3e",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 15,
  },
  tabWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid #ff0000ff",
    background: "#00ff91ff",
    cursor: "pointer",
  },
  activeTab: {
    padding: "6px 14px",
    borderRadius: 6,
    border: "1px solid #ff0000ff",
    background: "#00ff91ff",
    fontWeight: 600,
    cursor: "pointer",
  },
  error: {
    color: "#ed0f0fff",
    fontSize: 13,
  },
};
