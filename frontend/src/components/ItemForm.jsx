const initialValues = {
  itemName: "",
  description: "",
  type: "Lost",
  location: "",
  date: "",
  contactInfo: "",
};

function ItemForm({ formData, setFormData, onSubmit, isEditing, onCancel }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialValues);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form className="panel item-form" onSubmit={onSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Item Details</p>
          <h2>{isEditing ? "Update Entry" : "Report an Item"}</h2>
        </div>
        {isEditing ? (
          <button type="button" className="secondary-btn" onClick={resetForm}>
            Cancel Edit
          </button>
        ) : null}
      </div>

      <div className="grid-two">
        <label className="field">
          <span>Item Name</span>
          <input
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Black wallet"
            required
          />
        </label>

        <label className="field">
          <span>Type</span>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add color, brand, or any identifying details"
          rows="4"
          required
        />
      </label>

      <div className="grid-two">
        <label className="field">
          <span>Location</span>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Library ground floor"
            required
          />
        </label>

        <label className="field">
          <span>Date</span>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label className="field">
        <span>Contact Info</span>
        <input
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          placeholder="9876543210 or email@example.com"
          required
        />
      </label>

      <button className="primary-btn" type="submit">
        {isEditing ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
}

export { initialValues };
export default ItemForm;
