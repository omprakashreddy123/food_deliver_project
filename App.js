import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Payment from "./components/Payment";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("home");

  // 🔍 SEARCH
  const [search, setSearch] = useState("");

  // 🍔 FOOD DATA
const [foods] = useState([
  { id: 1, name: "Pizza", price: 200, image: "https://images.pexels.com/photos/30849268/pexels-photo-30849268/free-photo-of-delicious-pepperoni-pizza-on-wooden-table.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: 2, name: "Burger", price: 120, image: "https://i0.wp.com/thenutritionadventure.com/wp-content/uploads/2017/07/PourHouseAmericanBurger.jpg?resize=5236%2C3490" },
  { id: 3, name: "Biryani", price: 250, image: "https://png.pngtree.com/thumb_back/fw800/background/20240328/pngtree-mutton-biryani-meal-in-a-plate-on-table-image_15645442.jpg" },
  { id: 4, name: "Pasta", price: 180, image: "https://s.lightorangebean.com/media/20240914160809/Spicy-Penne-Pasta_-done.png" },
  { id: 5, name: "Fried Rice", price: 150, image: "https://wallpapers.com/images/hd/restaurant-style-fried-rice-kum3a6xr5g0nwnua.jpg" },
  { id: 6, name: "Noodles", price: 140, image: "https://lindseyeatsla.com/wp-content/uploads/2021/11/LindseyEats_Spicy_Garlic_Noodles-3.jpg" },
  { id: 7, name: "Sandwich", price: 100, image: "https://www.southernliving.com/thmb/UW4kKKL-_M3WgP7pkL6Pb6lwcgM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ham_Sandwich_011-1-49227336bc074513aaf8fdbde440eafe.jpg" },
  { id: 8, name: "Fries", price: 90, image: "https://images6.alphacoders.com/632/632951.jpg" },
  { id: 9, name: "Momos", price: 110, image: "https://i0.wp.com/passion2cook.com/wp-content/uploads/2023/03/paneer-momos-2.jpg?w=1920&ssl=1" },
  { id: 10, name: "Roll", price: 130, image: "https://wallpaperaccess.com/full/6905828.jpg" },
  { id: 11, name: "Paneer Tikka", price: 220, image: "https://img.freepik.com/premium-photo/solo-indian-paneer-tikka-white-background_893610-26913.jpg?w=2000" },
  { id: 12, name: "Chicken Curry", price: 260, image: "https://www.whiskaffair.com/wp-content/uploads/2021/10/Andhra-Chicken-Curry-2-3.jpg" },
  { id: 13, name: "Dal Rice", price: 120, image: "https://maninio.com/wp-content/uploads/2019/06/DSC_0870.jpg" },
  { id: 14, name: "Ice Cream", price: 80, image: "https://img.freepik.com/premium-photo/vanilla-ice-cream-chocolate-sundae-bowl-dessert-isolate-background-ai-generated-image_848903-2854.jpg" },
  { id: 15, name: "Cake", price: 150, image: "https://wallpapers.com/images/featured/cake-canqenmgl5mdxp0n.jpg" },
  { id: 16, name: "Donut", price: 70, image: "https://png.pngtree.com/background/20230617/original/pngtree-chocolate-donuts-with-sugar-sprinkles-and-chocolate-icing-in-3d-rendering-picture-image_3697589.jpg" },
  { id: 17, name: "Coffee", price: 60, image: "https://tse4.mm.bing.net/th/id/OIP.IzYjlH5ULgbULlPM8P0ONwHaE8?pid=Api&h=220&P=0" },
  { id: 19, name: "Cold Drink", price: 50, image: "https://tse2.mm.bing.net/th/id/OIP.6WWZuk2nw8Do9MEX4oLDBwHaHa?pid=Api&h=220&P=0" },
  { id: 20, name: "Juice", price: 90, image: "https://img.freepik.com/premium-photo/pineapple-juice-with-splashes-with-pineapple-fruit-isolated-white-background-studio-shot_741910-7870.jpg?w=2000" },
  { id: 21, name: "Milkshake", price: 120, image: "https://png.pngtree.com/png-clipart/20240809/original/pngtree-vanilla-milkshake-transparent-background-png-image_15734940.png" },
  { id: 22, name: "Pav Bhaji", price: 140, image: "https://tse3.mm.bing.net/th/id/OIP.lny37kkcws3qKX0ZCcYRBAHaEK?pid=Api&h=220&P=0" },
  { id: 23, name: "Chole Bhature", price: 160, image: "https://tse3.mm.bing.net/th/id/OIP.pUmQnkIngDk7X1QkX7FycwHaEK?pid=Api&h=220&P=0" },
  { id: 24, name: "Dosa", price: 110, image: "https://www.shutterstock.com/image-photo/homemade-dosa-dhosa-masala-plain-600nw-1597787986.jpg" },
  { id: 25, name: "Idli", price: 90, image: "https://www.thestatesman.com/wp-content/uploads/2019/04/idli.jpg" }
]);

  const [cart, setCart] = useState([]);

  // 🔍 FILTER
  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔐 LOGIN CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  // 🛒 LOAD CART
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) setCart(savedCart);
  }, []);

  // 💾 SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  // ➕ ADD
  const increaseQty = (food) => {
    const existing = cart.find(item => item.id === food.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === food.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  };

  // ➖ REMOVE
  const decreaseQty = (food) => {
    const existing = cart.find(item => item.id === food.id);

    if (!existing) return;

    if (existing.qty === 1) {
      setCart(cart.filter(item => item.id !== food.id));
    } else {
      setCart(cart.map(item =>
        item.id === food.id
          ? { ...item, qty: item.qty - 1 }
          : item
      ));
    }
  };

  // 🔐 LOGIN PAGE
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div>
      {/* NAVBAR */}
      <Navbar
        setPage={setPage}
        handleLogout={handleLogout}
        search={search}
        setSearch={setSearch}
      />

      {/* HOME */}
      {page === "home" && (
        <Home
          foods={filteredFoods}
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      )}

      {/* CART → PASS setPage */}
      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}

      {/* PAYMENT PAGE */}
      {page === "payment" && (
        <Payment
          cart={cart}
          setPage={setPage}
          setCart={setCart}
        />
      )}
    </div>
  );
}

export default App;