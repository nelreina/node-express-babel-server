import models from '../models';

console.log('Init Seeding...');

models.sequelize.sync({ force: true }).then( () => {
	
});
