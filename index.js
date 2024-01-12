const axios = require("axios");
const cheerio = require("cheerio");

async function getHTMLPage(url) {
  const { data } = await axios.get(url);
  return data;
}

function extractData(html, page) {
  const $ = cheerio.load(html);
  const error = $("#my-message").html();
  if (error) {
    return error;
  }
  let claim_code;
  if (page === 1) {
    claim_code = $("#card-number").html();
  } else {
    claim_code = $(".mb-1.card-number").html();
  }
  return claim_code;
}

async function crawller(url, page) {
  try {
    const html = await getHTMLPage(url);
    const data = extractData(html, page);
    if (data.includes("Something went wrong")) {
      console.log(
        "The page did not load properly please contact support. help@giftlov.com"
      );
    } else {
      console.log(`Claim Code for Certificate ${page} is ${data}`);
    }
  } catch (error) {
    console.error(`Failed to crawl "${url}": ${error.message}`);
  }
}

crawller(
  "https://distribution.giftlov.com/api/Orders/95ccc5cc-dec2-480f-a0b9-37233c064133/49f5520479158e085a8d10000cc7740a0834bbde49493a0493415cae2a57ad6a/o/15642927?r=5.611925132178843",
  1
);
crawller(
  "https://distribution.giftlov.com/api/Orders/78a01bfa-b803-4ccd-8f99-5de87bfbc8a7/669f317a91995af3a8fb6d5cf6cec4066033bc8ca4e305d19b5d1229c461a3f9/o/13188160?&token=03AFcWeA6mwLhPaYDImE3GLBgckqU8aSBJ1wB9f4v4ofwZ-d3DXy0I6W_TFnYB6J_U7bjo-wQuYW2ECC2bJPd7Mw0uuO7Axku54gRVZrAWe4oZLT5u0mVfdXRpVJgSUjiXFJ_A0pHB92JrJpcDCk9XxfJJLCASfaXzn7kqdLzzl8v3P8FWauWnpRtkIcYeRzChXtVV2CT9mZElmHEAqae7H-LeJfsMEaKng1C_btDbcnOK-hKELUkOV3Ssk0Pfn4OHqb7POuiGIjJ53gElin3BgvhUbddQAAxbkNGpBnbsZsdlKTSl1dQGskZeLttAm1ZHy3Xn-3P55KV7xVCy45ruvIi8RTbc-q9iPKGK3lznEfWAc9_FWZ9b67ajwgFuHEALV4POFmznQFxuYDIVaElD3xnB-6t_CZTpvnU5WgLBTqFpsHCNtkH1ZGw3nvELg5ymQlucMnmoE-XvczHwLwt8iqGxS2NbOmFQMsHlWrpDorxrQ14Tmu_6a9cUqo1VzViaB4LOU5Lw3hAwPhaQY2UtAS6dPVyUi7RWWqIB6sunuauulVKl_cVXZcI",
  2
);
