const StatCard = ({ title, value }) => {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#f4f4f4",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <h2>{value}</h2>
    </div>
  );
};

export default StatCard;
