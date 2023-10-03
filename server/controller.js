const houses = require('./db.json')

let upcomingHouseID = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        console.log(+req.params.id)
        let index = houses.findIndex(house => house.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        let newHouse = {
            id: upcomingHouseID,
            address: address,
            price: +price,
            imageURL
        }

        houses.push(newHouse)
        upcomingHouseID = upcomingHouseID + 1
    },

    updateHouse: (req, res) => {
        const {type} = req.body
        let index = houses.findIndex(house => house.id === +req.params.id)

        if (type === 'minus' && houses[index].price > 0) {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else {
            res.status(400).send('invalid price')
        }
    }
}