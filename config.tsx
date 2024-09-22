const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No hay token");
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export default getAuthConfig;
