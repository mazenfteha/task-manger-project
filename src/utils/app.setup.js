const express =require('express');

module.exports = (app) => {
    app.use(express.static('../public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
}