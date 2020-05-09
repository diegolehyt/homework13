const DB = require('../config/connection')
const connection = new DB({ database: 'burgers_db' }).connection

const orm = {
    findAllBurger: async function () {
        const [rows] = await connection.query(`SELECT * FROM burgers;`)
        return rows
    },

    findByBurgerId: async function (id) {
        const [rows] = await connection.query(`SELECT * FROM burgers WHERE id = ?;`, [
            parseInt(id)
        ])
    
        return rows
    },

    createBurger: async function (nameB, devourB) {
        const sql = `INSERT INTO burgers (name, devour) VALUES (?, ?)`
        const [result] = await connection.query(sql, [nameB, devourB])
        return result
    },

    updateBurger: async function (nameB, devourB, idB) {
        const sql = `UPDATE burgers SET ? WHERE id = ?`
        const [result] = await connection.query(sql, [
          { name: nameB, devour: devourB },
          idB
        ])
        return result
    },

    deleteBurger: async function (idB) {
        const sql = `DELETE FROM burgers WHERE id = ?`
        const [result] = await connection.query(sql, [idB])
        return result
    }
}

module.exports = orm

