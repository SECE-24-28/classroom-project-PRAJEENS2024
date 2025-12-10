import React from "react";

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <table border="2" style={{ marginTop: 10 }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rollno</th>
          <th>Class</th>
          <th>Section</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No users yet
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={user.rollno ?? index}>
              <td>{user.name}</td>
              <td>{user.rollno}</td>
              <td>{user.class}</td>
              <td>{user.section}</td>
              <td>
                <button onClick={() => onEdit(user.rollno)}>EDIT</button>
                <button onClick={() => onDelete(user.rollno)} style={{ marginLeft: 6 }}>
                  DELETE
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}