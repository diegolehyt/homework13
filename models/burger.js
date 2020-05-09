const orm = require('../config/orm')

class Burger {
  constructor ({ name, devour = false }) {
    this.name = name
    this.devour = devour
  }
  // orm
  static async findAll () {
    const rows = await orm.findAllBurger()
    return rows
  }

  static async findById (id) {
    const rows = await orm.findByBurgerId(id)

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
    const result = await orm.createBurger(this.name, this.devour)
    this.id = result.insertId
    return this
  }

  async update () {
    // ensure devour is a valid Boolean
    this.devour = fixBool(this.devour)
    await orm.updateBurger(this.name, this.devour, this.id)
    return this
  }

  async delete () {
    await orm.deleteBurger(this.id)
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
