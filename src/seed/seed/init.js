import models from '../models';

import initReports from './initReports';
import initSetting from './initSetting';
console.log('Init Seeding...');

models.sequelize.sync({ force: true }).then( () => {
	initReports();
	initSetting();
});
