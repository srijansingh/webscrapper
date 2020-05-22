const request = require('request-promise');
const cheerio = require('cheerio');
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;
const data = [];

const items = [
    'mobiles',
    'laptops',
    'redmi',
    'honor',
    'samsung',
    'vivo'
];

const Amazonlisting = require('../model/product');

module.exports = {
    amazon : () => {
                amazonHeader = async () =>{
                for(searchIndex=0; searchIndex <= items.length; searchIndex++){
                    for(index=0;index <=10; index++){
                        const result = await request.get(`https://www.amazon.in/s?k=${items[searchIndex]}&page=${index}`);
                        const $ = await cheerio.load(result);
                    
                        $('.s-asin').each((i,el)=> {
                            const title = $(el).find('h2 span').text();  
                            const price = $(el).find('.a-price-whole').text();
                            const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                            const image = $(el).find('.s-image').attr('src');
                            const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                            const item = items[searchIndex];
                            const datas = {i,title,price,rating,link,image,item };

                          
                            data.push(datas);
                            console.log(datas)
                            
                        });
                    }
                }
                    
                return data;
            }
            
         amazonDescription = async (amazonHead) =>{
            return await Promise.all(
                amazonHead.map(async product => {
                    const html = await request.get(product.link);
                    const $ = await cheerio.load(html);
        
                    product.allimage = $('.a-dynamic-image').attr('data-a-dynamic-image');
                    // product.id = $("#averageCustomerReviews").attr("data-asin");
                    product.description = $('#productDescription p').text().trim();
                    // product.title = $("#productTitle").text().trim();
                    product.brand = $("#bylineInfo").text();
                    // product.rating = $("#acrPopover").attr("title");
                    // product.ratingCount = $("#acrCustomerReviewText").text();
                    // product.mrp = $(".priceBlockStrikePriceString").text();
                    // product.price = $("#priceblock_ourprice").text();
                
                    const id = product.id;
                    const title = product.title;
                    const category = product.item;
                    const link = product.link;
                    const image = product.image;
                    const allimage = product.allimage;
                    const description = product.description;
                    const brand = product.brand;
                    const rating = product.rating;
                    const price = product.price;
                    const productDesc = {id,title,price,brand,description, rating,link,image, allimage};
                    
                        const productListing =new Amazonlisting(
                        {
                            id : id,
                            link:link,
                            brand: brand,
                            category: category,
                            title:title,
                            price:price,
                            rating:rating,
                            description:description,
                            image:image,
                            allimage:allimage,
                        }
                        
                        );

                        productListing.save()
                        .then((listing)=> {
                            console.log(listing)
                        })
                        .catch(err => {
                            console.log(err);
                        })

                    return product;
                })    
            )
        }
    
        
        const main = async () =>{
            const amazonHead = await amazonHeader();
            const amazonFullData = await amazonDescription(amazonHead);
            console.log("Total scrapped : " + amazonFullData.length);
            return amazonFullData;
        }

        main();
        
    }
}


