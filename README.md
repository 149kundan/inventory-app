# MERN Inventory Management System

A full-stack inventory management application built with the **MERN stack**:

- **MongoDB** – database for users, products, and stock movements  
- **Express + Node.js** – REST API with authentication and business logic  
- **React** – frontend UI with protected routes and forms

## Features

- User registration & login with **JWT authentication**
- **Product management**: add, edit, delete products with pricing and reorder level
- **Stock IN / OUT** movements with automatic update of product stock
- **Validation** to prevent negative stock
- **Dashboard** with:
  - total number of products  
  - total stock value  
  - low-stock products list  
  - recent stock movements
- Protected routes & logout functionality

## Tech Stack

- **Frontend:** React, React Router, Axios, Vite  
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt  
- **Database:** MongoDB

## Running locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in a second terminal)
cd frontend
npm install
npm run dev
