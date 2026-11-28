import { useState } from "react";
import "./SignUpSheet.css";

export default function SignUpSheet({
  isOpen = true,
  onClose,
  onSubmit,
  onSocialAuth,
  onSwitchToSignIn,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: true,
  });

  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!formData.acceptedTerms) {
      setErrorMessage("Please accept the Terms and Conditions to continue.");
      return;
    }

    setErrorMessage("");
    if (onSubmit) {
      onSubmit(formData);
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  }

  return (
    <div
      className={`sheet-backdrop ${isOpen ? "open" : ""}`}
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        className="signup-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Sign Up"
      >
        <h2 className="signup-title">Sign Up</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">Full name</label>
            <div className="input-wrapper">
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Tunde Adebanjo"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <span className="input-icon" aria-hidden="true">
                👤
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="TundeAdebanjo@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="input-icon" aria-hidden="true">
                ✉️
              </span>
            </div>
          </div>

          <div class="input-group">
            <label htmlFor="phone">Phone</label>
            <div className="input-wrapper">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0810 222 3344"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <span className="input-icon" aria-hidden="true">
                📞
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper active-field">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="input-icon" aria-hidden="true">
                🔒
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper active-field">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="input-icon" aria-hidden="true">
                🔒
              </span>
            </div>
          </div>

          {errorMessage && (
            <p className="error-message" role="alert">
              {errorMessage}
            </p>
          )}

          <label className="terms-row">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />
            <span>
              Accept <a href="#terms">Terms</a> and{" "}
              <a href="#conditions">Conditions</a>
            </span>
          </label>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="social-section">
          <p className="social-label">Or continue with</p>
          <div className="social-icons">
            <button
              type="button"
              aria-label="Continue with Google"
              onClick={() => onSocialAuth && onSocialAuth("google")}
            >
              G
            </button>
            <button
              type="button"
              aria-label="Continue with Apple"
              onClick={() => onSocialAuth && onSocialAuth("apple")}
            >
              Apple
            </button>
            <button
              type="button"
              aria-label="Continue with Facebook"
              onClick={() => onSocialAuth && onSocialAuth("facebook")}
            >
              f
            </button>
          </div>
        </div>

        <p className="signin-footer">
          Already have an account?{" "}
          <a
            href="#signin"
            onClick={(event) => {
              if (onSwitchToSignIn) {
                event.preventDefault();
                onSwitchToSignIn();
              }
            }}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
