import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@material-tailwind/react';
export const RestaurantCard = ({ restaurant }) => {
  if (!restaurant || restaurant.length === 0) {
    return <p>No restaurants available or data is loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Restaurants List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Cuisine Type</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Owner Email</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>

          <TableRow key={restaurant._id}>
            <TableCell>{restaurant.name}</TableCell>
            <TableCell>{restaurant.address}</TableCell>
            <TableCell>{restaurant.cuisineType}</TableCell>
            <TableCell>{restaurant.phoneNumber}</TableCell>
            <TableCell>{restaurant.rating}</TableCell>
            <TableCell>{restaurant.ownerEmail}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </div>
  );
};
export const MenuCard = ((menu) => {

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={menu?.image} alt="menu" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{menu.name}</h3>
        <p>Restaurant name : {menu.restaurantName}</p>
        <p>Description: {menu.description}</p>
        <p>Price: {menu.price}</p>
        <p>Available: {menu.available}</p>
        <Link to={`/menu-details/${menu?._id}`}>
          <button className="btn btn-primary">More Details</button>
        </Link>
      </div>
    </div>
  );
})

export const CartCards = ({ item, handleRemove ,totalPrices}) => {


  return (
    <div className="flex flex-wrap justify-center">
      <div className="card card-compact bg-base-100 w-96 shadow-xl m-4">
        <div className="card-body">
          <h2 className="card-title">User Cart</h2>

          <img src={item?.menuId?.image} alt="cart-item" className="w-24 h-20" />

          <div  className="cart-item">

            <p>{item?.menuId?.name} </p>
            <p>{item?.menuId?.price}</p>
          </div>
          
          <button className="btn btn-secondary" onClick={()=>handleRemove(item?._menuId)}>Remove</button>
        </div>
       </div>
       <div>
       <p>Total price : {totalPrices} </p>
       </div>
     </div>
     
  );
};