let express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    app = express();

app.get('/', (req, res, next) => {
    superagent
        .get('http://web-aaronding.rhcloud.com/employee.html')
        .end((err, sres) => {
            if (err) {
                return next(err);
            }

            let $ = cheerio.load(sres.text),
                items = [];

            $('tr').each((ind, el) => {
                if (ind > 0) {
                    let $td = $(el).children('td');
                    items.push({
                        'First Name': $td.eq(0).text(),
                        'Last Name': $td.eq(1).text(),
                        'Extension': $td.eq(2).text(),
                        'Cell Number': $td.eq(3).text(),
                        'Alternative Number Emergency Only': $td.eq(4).text(),
                        'title': $td.eq(5).text(),
                        'E-mail Address': $td.eq(6).text()
                    });
                }
            });

            res.send(items);
        });
});

app.listen(4000, () => console.log('app is listening at port 4000'));
