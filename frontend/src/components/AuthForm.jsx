function AuthForm({
  title,
  subtitle,
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel,
  error,
  footer,
}) {
  return (
    <div className="auth-card">
      <div className="auth-copy">
        <p className="eyebrow">AI308B MSE-2 Project</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <form className="auth-form" onSubmit={onSubmit}>
        {fields.map((field) => (
          <label key={field.name} className="field">
            <span>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              value={values[field.name]}
              onChange={onChange}
              placeholder={field.placeholder}
              required
            />
          </label>
        ))}

        {error ? <p className="error-text">{error}</p> : null}

        <button className="primary-btn" type="submit">
          {submitLabel}
        </button>

        <div className="auth-footer">{footer}</div>
      </form>
    </div>
  );
}

export default AuthForm;
