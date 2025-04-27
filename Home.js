import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Home() {
  //read operation
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getHome = async () => {
      try {
        let res = await axios.get("http://localhost:8081/api/get");
        console.log("res----------->", res);
        setData(res?.data?.data);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getHome();
  }, []);

  console.log("data", data);
  //edit operaation
  const [user, setUser] = useState([]);

  const handleClick = async (id) => {
    navigate("/form", { state: { id } });
  };
  //del operations
  const handleDelete = async (del) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) {
      return;
    }

    try {
      let res = await axios.post("http://localhost:8081/api/delete", {
        value: del,
      });
      window.location.reload();
      console.log("--res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100 p-4">
      <div
        className="bg-white rounded shadow p-4 w-100"
        style={{ maxWidth: "1200px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">USER MANAGEMENT SYSTEM</h2>
          <a href="/form" className="btn btn-success">
            + Add User
          </a>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user?.name}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.email}</td>
                    <td>{user?.age}</td>
                    <td>{user?.gender}</td>
                    <td>{user?.salary}</td>
                    <td>
                      <button
                        onClick={() => handleClick(user?.id)}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user?.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-muted">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
