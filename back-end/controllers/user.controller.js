const express = require('express')
const control = express()
const db = require('../db')

class UserController{

    async createUser(req, res){
        const body = req.body
        const newUser = await db.query(`INSERT INTO users (email, password) values ('${body.email}', '${body.password}') RETURNING *`)
        res.json(newUser.rows[0])
    }

    async getUsers(req, res){
        const users = await db.query(`Select * from users`)
        res.json(users.rows)
    }

    async getOneUser(req, res){
        const id = req.params.id
        const user = await db.query(`Select * from users where user_id = $1`, [id])
        res.json(user.rows[0])
    }

    async updateUser(req, res){
        const user_id = req.params.id
        const body = req.body
        const user = await db.query(`UPDATE users SET email = '${body.email}', password = '${body.password}' where user_id = ${user_id} RETURNING *`, 
        )
        res.json(user.rows[0])
    }

    async deleteUser(req, res){
        const id = req.params.id
        const user = await db.query(`DELETE FROM users where user_id = ${id}`)
        res.json(user.rows[0])     
    }

}


module.exports = new UserController()