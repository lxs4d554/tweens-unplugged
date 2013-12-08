
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'CRUD Example' });
};

exports.samplegroup = function(db) {
    return function(req, res) {
        var collection = db.get('artcollection');
        collection.find({},{},function(e,docs){
            res.render('samplegroup', {title: "CRUD Example",
                "samplegroup" : docs
            });
        });
    };
};

exports.addsample = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var title = req.body.title;
        var medium = req.body.medium;
		var artist = req.body.artist;
		
        // Set our collection
        var collection = db.get('artcollection');

        // Submit to the DB
        collection.insert({
            "title" : title,
            "medium" : medium,
			"artist" : artist,
			"displayed" : "no"
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("samplegroup");
                // And forward to success page
                res.redirect("samplegroup");
            }
        });

    }
}
 
exports.newsample = function(req, res){
  res.render('newsample', { title: 'CRUD Example - Create' });
};

exports.editsample = function(db){
	return function(req, res) {
	
		var collection= db.get('artcollection');
		collection.find({"_id": req.params.id}, {}, 
			function(e, docs) {
				res.render('editsample', { title: 'Find' + docs.length, "editsample" : docs });
			});
		
	};
};

exports.update = function(db){
	return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var title = req.body.title;
        var medium = req.body.medium;
		var artist = req.body.artist;
		var displayed = req.body.displayed;
		var id = req.body.id;
		
        // Set our collection
        var collection = db.get('artcollection');

        // Submit to the DB
        collection.update({"_id": id},{
            "title" : title,
            "medium" : medium,
			"artist" : artist,
			"displayed" : displayed
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
				//res.location("samplegroup");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("samplegroup");
                // And forward to success page
                res.redirect("samplegroup");
            }
        });

    }
};

exports.deletesample = function(db){
	return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        
		var id = req.body.id2;
		
        // Set our collection
        var collection = db.get('artcollection');

        // Submit to the DB
       collection.remove({"_id": id}
	   , function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
				//res.location("samplegroup");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("samplegroup");
                // And forward to success page
                res.redirect("samplegroup");
            }
        });

    }
};




