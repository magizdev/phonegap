angular.module('starter.config', [])
.constant('DB_CONFIG', {
	name: 'EasyTask',
	tables: [
		{
		name: 'tasks',
		columns: [
			{name: 'id', type: 'integer primary key'},
			{name: 'name', type: 'text'},
			{name: 'status', type: 'text'}
			]
		}
	]
}); 