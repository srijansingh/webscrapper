const request = require('request-promise');
const cheerio = require('cheerio');
const data = [];

module.exports = {
    flipkart : () => {
        flipkartHeader = async () => {
            const result = await request.get('https://www.flipkart.com/search?q=jeans&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off/');
            const $ = await cheerio.load(result);

            $('.IIdQZO').each((i,el)=> {
                const id = $(el).attr('data-tkid');
                const brand = $(el).find('._2B_pmu').text();
                const name = $(el).find('._2mylT6').text();
                const image = $(el).find('._1A8_B6').html();
                const price  = $(el).find('._1vC4OE').text()
                const mrp = $(el).find('._3auQ3N').text();
                const link = $(el).find('._3dqZjq').attr('href');
                
                datas = {i,id,brand,name,image,price,mrp,link}
                console.log(datas)
                data.push(datas)

            });

            return data;
        }

        const main = async () => {
            const flipHead = await flipkartHeader();
            console.log('Flipkart data : ' + flipHead.length);
        }

        main();
    }
}