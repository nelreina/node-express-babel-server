import express from 'express';
const api = express.Router();
import models from '../models';

const Items = models['item'];

const saveItem = (id, data ) => new Promise((resolve, reject) =>{
  if (id) {
    Items.findOne( { where: { id } })
    .then( item => item.update(data))
    .then( result => resolve(result) )
    .catch( err => reject(err))
  } else {
    Items.create(data)
    .then( result => resolve(result) )
    .catch( err => reject(err))
  }
})

api.get('/', (req, res) => {
	Items.findAll()
		.then( items => res.json(items))
		.catch( err => {
			console.log(err);
			res.status(500).json({error: 'Unable to get all items'})
		})
});

api.get('/:id', (req, res) => {
	const { id } = req.params;
	Items.findOne({ where: { id } })
	.then( item => res.json(item))
	.catch( err => {
		console.log(err);
		res.status(500).json({ error: 'Unable to get item with id: ' + id })
	})
});

api.put('/', (req, res) => {
  saveItem(null, req.body)
  .then( item => res.json(item))
  .catch( err => {
    console.log(err);
    res.status(500).json({ error: 'Unable to insert item '})
  })
});

api.post('/:id', (req, res) => {
  const { id } = req.params;
  saveItem(id, req.body)
    .then( item => res.json(item))
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to update item with id: ' + id })
    })
});

module.exports = api