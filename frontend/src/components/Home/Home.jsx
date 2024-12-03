import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import New from './NewBlog/New';
import MyBlog from './MyBlog/MyBlog';

const Home = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} /> {/* Default hero view */}
        <Route path="/new-post" element={<New />} /> {/* New post view */}
        <Route path="/my-posts" element={<MyBlog />} /> {/* My posts view */}
      </Routes>
    </>
  );
}

export default Home;
