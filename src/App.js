// import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';


const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json(); // Преобразование ответа в JSON

    if (response.ok) {
      console.log('User created successfully:', data);
      // alert('User created successfully');
      setName(name);
      setEmail(email);
    } else {
      alert(`Failed to create user `+ name + ` ` + email);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

const Items = () => {
  const [formData, setFormData] = useState({
      name: '',
      // description: '',
      price: 0,
      tax: 0
  });

  const handleSubmit = () => {
      fetch('http://localhost:8000/items/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error(error);
      });
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  return (
      <div>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {/* <input type="text" name="description" value={formData.description} onChange={handleChange} /> */}
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
          <input type="number" name="tax" value={formData.tax} onChange={handleChange} />
          <button onClick={handleSubmit}>Жмай нах</button>
      </div>
  );
};


// function App() {

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetch('http://localhost:8000/')
//       .then(response => response.json())
//       .then(data => setMessage(data.Hello));
//   }, []);

//   return (
//       <div>
//         <h1>{message}</h1>
//       </div>
//     );
// }

const App = () => {
  return (
    <div>
      <h1>User Management App</h1>
      <AddUserForm />
      <Items />
    </div>
  );
};


export default App;
