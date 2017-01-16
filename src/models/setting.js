export default (sequelize, DataTypes) => {
	const item = sequelize.define('item',
		{
			title: {
		    type: DataTypes.STRING,
		    allowNull: false
		  },
			short: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			editor: {
				type: DataTypes.JSON,
				allowNull: false,
			},
		},

	);
	return item;
}
