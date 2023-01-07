# loto-API

Cette simple API permet de récupérer les résultats du loto français.
Les résultats sont récupérés en scrappant [cette page](http://loto.akroweb.fr/loto-historique-tirages/) avec [cheerio](https://cheerio.js.org/).

Les résultats jusqu'en 2006 sont récupérés, ainsi la requête peut prendre quelques secondes avant de donner une réponse.
## Utilisation
> METHOD GET -> https://daga123-loto-api.onrender.com/getLotoData
## Format des données
```
	{
	"data" : [
			{
			"date" : "25 decembre 2022",
			"numbers" : ["17","20","26","35","40"],
			"chance" : "10"
			},
			{...},
			{...},
			{...},
			{...},
			{...},
		]
	}
```
