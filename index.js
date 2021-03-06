const fetch = require('node-fetch')
// const urls = ['https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
// 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
// 'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
// 'https://ft-tech-test/403']

/**
 * Function to get data from multiple urls
 * @param {array} urls - Urls
 * @returns {promise}
 */
var requestMultipleUrls = function (urls) {
    return Promise.all(urls.map((url) => {
        return fetch(url)
    .then((response) => Promise.all([
            response,
            response.json()
        ]))
        .then(([response, data]) => {
            if (response.ok) {
                return {
                status: response.status,
                statusText: response.statusText,
                promise: data,
                url: response.url
                }
            }
        })
        .catch((err) => {
            return err.message;
        })
    }))
    }
    //requestMultipleUrls(urls).then(data => console.log(data));
    module.exports = requestMultipleUrls;
