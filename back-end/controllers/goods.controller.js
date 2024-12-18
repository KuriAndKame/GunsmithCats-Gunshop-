const express = require('express')
const control = express()
const db = require('../db')

class GoodsController{
    async createGoods(req, res){
        const body = req.body
        const newGood = await db.query(`INSERT INTO goods (nameofgood, typeofgood, price, count, photo) VALUES (${body.nameofgood}, ${body.typeofgood}, ${body.price}, ${body.count}) RETURNING *`)
        res.json(newGood.rows[0])
    }

    async getGoods(req,res){
        const goods = await db.query(`Select * from goods`)
        res.json(goods.rows)
    }

    async getOneGood(req,res){
        const id = req.query.id
        const good = await db.query(`Select * from goods where id = $1`, [id])
        res.json(good.rows[0])
    }

    async updateGood(req, res){
        const {id, nameofgood, typeofgood, price, count} = req.body
        const good = await db.query(`UPDATE goods SET nameofgood = '$1', typeofgood = '$2', price = $3, count = $4  where id = $5 RETURNING *`, 
            [nameofgood,typeofgood, price, count, id]
        )
        res.json(good.rows[0])
    }

    async deleteGood(req, res){
        const id = req.query.id
        const good = await db.query(`DELETE FROM goods where id = $1`, [id])
        res.json(good.rows[0])
    }
}

module.exports = new GoodsController()