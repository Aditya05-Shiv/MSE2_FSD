import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import ItemForm, { initialValues } from "../components/ItemForm.jsx";
import ItemList from "../components/ItemList.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function DashboardPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [formData, setFormData] = useState(initialValues);
  const [editingItemId, setEditingItemId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchItems = async (searchValue = "", typeValue = "") => {
    try {
      const endpoint =
        searchValue || typeValue
          ? `/items/search?name=${encodeURIComponent(searchValue)}&type=${encodeURIComponent(
              typeValue,
            )}`
          : "/items";

      const { data } = await api.get(endpoint);
      setItems(data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearMessages();

    try {
      if (editingItemId) {
        await api.put(`/items/${editingItemId}`, formData);
        setSuccess("Item updated successfully");
      } else {
        await api.post("/items", formData);
        setSuccess("Item added successfully");
      }

      setFormData(initialValues);
      setEditingItemId("");
      fetchItems(search, filterType);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save item");
    }
  };

  const handleEdit = (item) => {
    clearMessages();
    setEditingItemId(item._id);
    setFormData({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      date: item.date.slice(0, 10),
      contactInfo: item.contactInfo,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    clearMessages();

    try {
      await api.delete(`/items/${id}`);
      setSuccess("Item deleted successfully");
      fetchItems(search, filterType);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete item");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    clearMessages();
    fetchItems(search, filterType);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page-shell dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Campus Lost & Found</p>
          <h1>Welcome, {user?.name}</h1>
          <p>Report items, search existing entries, and manage the ones you posted.</p>
        </div>
        <button className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-grid">
        <ItemForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isEditing={Boolean(editingItemId)}
          onCancel={() => {
            setEditingItemId("");
            setFormData(initialValues);
          }}
        />

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Search</p>
              <h2>Find Lost or Found Entries</h2>
            </div>
          </div>

          <form className="search-bar" onSubmit={handleSearch}>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by item name"
            />
            <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
              <option value="">All Types</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
            <button className="primary-btn" type="submit">
              Search
            </button>
          </form>

          {error ? <p className="error-text">{error}</p> : null}
          {success ? <p className="success-text">{success}</p> : null}
        </section>
      </div>

      <section>
        <div className="section-title">
          <div>
            <p className="eyebrow">Reported Items</p>
            <h2>All Lost & Found Entries</h2>
          </div>
        </div>

        <ItemList items={items} user={user} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </div>
  );
}

export default DashboardPage;
