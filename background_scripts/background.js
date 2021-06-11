const mediumFilters = {
    urls: ['*://medium.com/*'],
    types: ['main_frame']
}


function fixMediumLink(requestDetails) {
    const mediumUrl = new URL(requestDetails.url)
    mediumUrl.protocol = "https:"
    const redirectUrl = mediumUrl.searchParams.get('redirectUrl')
    
    if (redirectUrl) {
        return {
            redirectUrl: redirectUrl
        };
    }


    const paths = mediumUrl.pathname.split('/').slice(1);

    if (paths.length < 2) {
        return;
    }

    let subdomain = paths[0];

    subdomain = subdomain.replace('@', '');
    mediumUrl.pathname = paths.slice(1).join('/');

    mediumUrl.host =`${subdomain}.${mediumUrl.host}`
    return {
        redirectUrl: mediumUrl.href
    };
}


chrome.webRequest.onBeforeRequest.addListener(fixMediumLink, mediumFilters, ["blocking"])