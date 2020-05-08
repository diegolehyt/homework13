// Get the connection to the database
const DB = require('../config/connection')
const connection = new DB({ database: 'burgers_db' }).connection

class Burger {
  constructor ({ name, devour = false }) {
    this.name = name
    this.devour = devour
  }

  static async findAll () {
    const [rows] = await connection.query(`SELECT * FROM burgers;`)
    return rows
  }

  static async findById (id) {
    const [rows] = await connection.query(`SELECT * FROM burgers WHERE id = ?;`, [
      parseInt(id)
    ])

    let burger = null
    if (rows.length) {
      burger = new Burger(rows[0])
      burger.id = id
    }
    return burger
  }

  async save () {
    if (this.id) {
      return this.update()
    } else {
      return this.create()
    }
  }

  async create () {
    const sql = `INSERT INTO burgers (name, devour) VALUES (?, ?)`
    const [result] = await connection.query(sql, [this.name, this.devour])
    this.id = result.insertId
    return this
  }

  async update () {
    // ensure devour is a valid Boolean
    this.devour = fixBool(this.devour)
    const sql = `UPDATE burgers SET ? WHERE id = ?`
    await connection.query(sql, [
      { name: this.name, devour: this.devour },
      this.id
    ])
    return this
  }

  async delete () {
    const sql = `DELETE FROM burgers WHERE id = ?`
    await connection.query(sql, [this.id])
    return this
  }
}

function fixBool (prop) {
  if (prop === 'false') prop = false
  else if (prop === '0') prop = false
  else if (prop === 0) prop = false
  else if (prop === null) prop = false
  else if (prop === undefined) prop = false
  else prop = true
  return prop
}

module.exports = Burger
