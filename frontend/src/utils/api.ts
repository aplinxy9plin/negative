const URL = `http://${window.location.host}:8080`;

const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const register = async (username: string, password: string) => {
  try {
    const response = await fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const about = async () => {
  try {
    const response = await fetch(`${URL}/about`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return { status: response.status, data };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { login, register, about };
