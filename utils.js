const fs = require('fs');
const request = require('request');

const getSortArr = (content) => {
    let sortString = content.match(/<!--[^)]+-->/g)[0];
    sortString = sortString.match(/\w[^)]+\n/g)[0];
    return sortString.split('\n').filter(item => item)
}

const buildPromise = function (item) {
    return new Promise(resolve => {
        request(item.cdn, (err, res, body) => {
            if (err) throw err;
            resolve({
                name: item.name,
                body: body
            })
        });
    })
}

const injectContent = (data, path) => {
    fs.appendFileSync(path, data, (err) => {
        if (err) throw err;
    });
}

const injectScript = (data, path) => {
    const templete = data.replace('<body>', '<body><script src="./main.js"></script>')
    fs.writeFile(path, templete, 'utf8', (err) => {
        if (err) throw err;
        console.log('success');
    })
}

module.exports = {
    getSortArr,
    buildPromise,
    injectScript,
    injectContent
}

