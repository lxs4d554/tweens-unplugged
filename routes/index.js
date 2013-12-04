
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
			"displayed" : false
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
