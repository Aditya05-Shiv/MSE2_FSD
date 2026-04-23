function ItemList({ items, user, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div className="panel empty-state">
        <h3>No items found</h3>
        <p>Try a different search or add a new lost/found entry.</p>
      </div>
    );
  }

  return (
    <div className="item-list">
      {items.map((item) => {
        const canManage = user?.id === item.user?._id;

        return (
          <article key={item._id} className="panel item-card">
            <div className="item-card-top">
              <div>
                <span className={`badge badge-${item.type.toLowerCase()}`}>{item.type}</span>
                <h3>{item.itemName}</h3>
              </div>
              <p className="item-date">
                {new Date(item.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <p className="item-description">{item.description}</p>

            <div className="meta-grid">
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Contact:</strong> {item.contactInfo}
              </p>
              <p>
                <strong>Reported By:</strong> {item.user?.name || "Unknown"}
              </p>
              <p>
                <strong>Email:</strong> {item.user?.email || "Unavailable"}
              </p>
            </div>

            {canManage ? (
              <div className="action-row">
                <button className="secondary-btn" onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button className="danger-btn" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default ItemList;
