import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
import "../log.css"

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useContext(AppContext);
  const [isModal, setIsModal] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formData.name, formData.email, formData.password);
    setIsModal(false);
    navigate("/login");
  };

  return (
    isModal && (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
        <div className="auth-modal">
          <div className="flex justify-between items-center mb-6">
            <h2 className="auth-title">Register</h2>
            <button className="auth-close" onClick={() => navigate("/")}>×</button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label htmlFor="name" className="auth-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="auth-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="auth-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-button">Register</button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <button onClick={() => navigate("/login")} className="auth-link">Login</button>
          </p>
        </div>
      </div>
    )
  );
};

export default Register;
