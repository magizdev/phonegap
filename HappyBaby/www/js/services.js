angular.module('happybaby.services', [])
.factory('DB', function($q, DB_CONFIG) {
  var self = this;
  self.db = null;
   
  self.init = function() {
    //self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); //in production
    self.db = window.openDatabase(DB_CONFIG.name, '1.0', DB_CONFIG.name, 10000000);
     
    angular.forEach(DB_CONFIG.tables, function(table) {
      var columns = [];
       
      angular.forEach(table.columns, function(column) {
        columns.push(column.name + ' ' + column.type);
      });
       
      var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
      self.query(query);
      console.log('Table ' + table.name + ' initialized');
    });
  };
   
  self.query = function(query, bindings) {
    bindings = typeof bindings !== 'undefined' ? bindings : [];
    var deferred = $q.defer();
     
    self.db.transaction(function(transaction) {
      transaction.executeSql(query, bindings, function(transaction, result) {
        deferred.resolve(result);
      }, function(transaction, error) {
        deferred.reject(error);
      });
    });
     
    return deferred.promise;
  };
   
  self.fetchAll = function(result) {
    var output = [];
     
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  };
   
  self.fetch = function(result) {
    return result.rows.item(0);
  };
   
  return self;
})
.factory('Profile', function(DB) {
  var self = this;
  var birthday = new XDate(2014, 1, 1);
  var profile = {'birthday': birthday};

  self.getAge = function(date) {
    var xdate = new XDate(date);
    xdate.clearTime();
    return birthday.diffDays(xdate);
  };

  self.load = function() {
    return DB.query('select * from profile').then(function(result) {
      console.log(result.rows.length);
      if(result.rows.length == 1){
        var profile = DB.fetch(result);
        profile.birthday = new XDate(profile.birthday);
        return profile;
      } else {
        return {};
      }
    })
  };

  self.update = function(profile) {
    DB.query('insert into profile(name, birthday, gender, birthWeight, birthHeight) values(?, ?, ?, ?, ?)', 
      [profile.name, profile.birthday.getTime(), profile.gender, profile.birthWeight, profile.birthHeigh]).then(function(result){

      }, function(err) {
        console.log(err);
      });
  }
  return self;
})
.factory('GrowthIndex', function(DB, Profile) {
  var self = this;
  self.WEIGHT = 0;
  self.HEIGHT = 1;

  self.addWeight = function(date, value) {
    var intDate = date.getTime();
    DB.query('insert into growthindex(date, giType, giValue) values(?,?,?)', [intDate, self.WEIGHT, value]);
  };

  self.getWeightChartData = function() {
    console.log('in self.getWeightChartData');
    return DB.query('select * from growthindex where giType = ? order by date', [self.WEIGHT]).then(function(result) {
      console.log('lalala');
      var rowdata = DB.fetchAll(result);
      var labels = [];
      var series = [];
      console.log(rowdata);
      for(var i=0; i< rowdata.length; i++){
        console.log(rowdata[i]);
        console.log(rowdata[i].date);
        var age = Profile.getAge(rowdata[i].date);
        var value = rowdata[i].giValue;

        labels.push(age);
        series.push(value);
      }

      var chartData = {};
      chartData.labels = labels;
      chartData.series = [];
      chartData.series.push(series);
      console.log(chartData);
      return chartData;
    }, function(err){
      console.log(err);
    });
  }

  return self;
});
