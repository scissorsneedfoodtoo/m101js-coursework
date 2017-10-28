// simple solution, since it's unlikely that a document will have a bestPicture object at all if the movie didn't win or wasn't nominated
db.hwscratch.find({"awards.oscars.award": "bestPicture"}).pretty()

// more complicated solution which matches only the movies that were nominated for bestPicture
db.hwscratch.find({"awards.oscars": {$elemMatch: {"award": "bestPicture", "result": "nominated"}}}).pretty().count()
