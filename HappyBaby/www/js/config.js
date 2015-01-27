angular.module('happybaby.config', [])
.constant('DB_CONFIG', {
	name: 'happybaby',
	tables: [
		{
			name: 'profile',
			columns: [
				{name: 'name', type: 'text'},
				{name: 'birthday', type: 'integer'},
				{name: 'gender', type: 'integer'},
				{name: 'birthWeight', type: 'real'},
				{name: 'birthHeight', type: 'real'},
				{name: 'avatar', type: 'blob'}
				]
		},
		{
			name: 'growthindex',
			columns: [
				{name: 'id', type: 'integer primary key'},
				{name: 'date', type: 'integer'},
				{name: 'giType', type: 'integer'},
				{name: 'giValue', type: 'real'}
			]
		}
	]
}); 