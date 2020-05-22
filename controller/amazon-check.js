const request = require('request-promise');
const cheerio = require('cheerio');
const data = [];

module.exports = {
    amazon : () => {
            amazonHeader = async ()  =>{
                
                    const result = await request.get('https://www.amazon.in/s?k=shirts');
                    const $ = await cheerio.load(result);
                  
                    $('.s-asin').each((i,el)=> {
                        const id = $(el).attr('data-asin');
                        const brand = $(el).find('h5 .a-size-base-plus').text();
                        const name = $(el).find('h2 span').text();  
                        const price = $(el).find('.a-price-whole').text();
                        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                        const image = $(el).find('.s-image').attr('src');
                        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                        const datas = {id,brand,name,price,rating,image,link};
                        console.log(datas);
                        data.push(datas);
                        
                    });
                
            return data;
        }
     
         amazonDescription = async (amazonHead) =>{
            return await Promise.all(
                amazonHead.map(async product => {
                    const html = await request.get(product.link);
                    const $ = await cheerio.load(html);
        
                    product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
                    product.description = $('#productDescription p').text();
                
                    const id = product.id;
                    const link = product.link;
                    const allimage = product.allimage;
                    const description = product.description;
                    const productDesc = {id,link,allimage,description};
                    console.log(productDesc)
                    return product;
                })    
            )
        }
        
        const main = async () =>{
           
            const amazonHead = await amazonHeader();
            const amazonFullData = await amazonDescription(amazonHead);
            console.log("What a job you scrapped : " + amazonFullData.length);
          
        }

        main();
    } 
}