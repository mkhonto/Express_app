exports.show = function (req, res, next){
	req.getConnection(function(err, connection){
		if (err)
			return next(err);

	var usersQuery = "select id, name, email, password, role from users";
	   connection.query(usersQuery, function(err, users){
	   	if (err) return(err);

		res.render('regUser',{
			users : users
	    });

	  });
	   
	});

};