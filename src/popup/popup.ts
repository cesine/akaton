interface Field {
  key: string,
  descriptions: string[],
}

interface ExtractText {
  _id: string,
  _rev: string,
  title: string,
  fields: Field[],
  text: string,
  url: string,
}

function extractText(): Promise<ExtractText> {
  return new Promise((resolve, reject) => {
    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    if (!chrome.tabs) {
      resolve({ "_id": "test_1979_20O'Day%2030%20Sloop%20for%20sale%20-%20YachtWorld", "_rev": "17-4286152788a2b82475fcd14ed364eb7d", "title": "1979 O'Day 30 Sloop for sale - YachtWorld", "url": "file:///Users/gchiodo/Downloads/1979%20O'Day%2030%20Sloop%20for%20sale%20-%20YachtWorld.html", "fields": [{ "key": "location", "descriptions": ["Located In: West Chazy, NY\n"] }, { "key": "price", "descriptions": ["Price: Can$  14,000 Tax Paid (US$ 11,178) \n", "price is based on today's currency conversion rate. \n"] }, { "key": "length", "descriptions": ["Length: 30'\n"] }, { "key": "beam", "descriptions": null }, { "key": "draft", "descriptions": null }, { "key": "engine", "descriptions": ["Engine/Fuel Type: Single / diesel\n"] }, { "key": "autopilot", "descriptions": null }, { "key": "battery", "descriptions": null }, { "key": "solarPower", "descriptions": null }, { "key": "mainsail", "descriptions": null }, { "key": "genoa", "descriptions": null }, { "key": "jib", "descriptions": null }, { "key": "spinnaker", "descriptions": null }, { "key": "rigging", "descriptions": null }, { "key": "waterTank", "descriptions": null }, { "key": "fuelTank", "descriptions": null }, { "key": "bimini", "descriptions": null }, { "key": "dinghy", "descriptions": null }, { "key": "year", "descriptions": [" 1979 ", "19"] }], "text": "Boats\nResearch\nServices\nJyI=\nUnited States (change)\nHome  Boats For Sale  Sail  O'Day  Irish Dancer\n1979 O'Day 30\nUS$ 11,178*\nWest Chazy, New York\n Share\nInterested in this boat?\nTel: 418-800-8506\n\nSend Email\nDescription View Full Specifications\n \nAvailable now\nYear:\n1979\nLength:\n30'\nEngine/Fuel Type:\nSingle / diesel\n \nLocated In:\nWest Chazy, NY\nHull Material:\nFiberglass\nYW#:\n79440-3725989\n \nCurrent Price:\nCan$  14,000 Tax Paid (US$ 11,178) \nSale Pending\n\nEn eaux douce depuis 10 ans, ce O'day sera vous séduire avec sa quille relevable idéal pour les mouillage restreint. \n\n \n\nIn fresh water since the last 10 years with centerboard will be a nice boat for your pleasure\n\n\n\n\n\n\n\nPlease contact VSF YACHT at 418-265-1709\n\n\nInterested in this boat?\nTel: 418-800-8506\n\nSend Email\nOther Boats from VSF Yacht Services\n1985 O'day 35\nUS$43,114\nLévis, QC, Canada\n1984 Catalina 30\nUS$21,557\nWest Chazy, NY, United States\n2014 Jeanneau Sun Odyssey 409\nUS$198,802\nPlattsburgh, NY, United States\n2014 Beneteau 38\nUS$192,849\nSale Pending\n2006 Beneteau 423\nUS$158,882\nPlattsburgh, NY, United States\n2008 Hunter 41 DS\nUS$142,914\nWest Chazy, NY, United States\nView all Boats from VSF Yacht Services\nServices\nFinance\nBoat Warranty\nVisit Website\n*This price is based on today's currency conversion rate.\n\n\nTel: 418-800-8506\n\nVSF Yacht Services\n\n301 rue Dupont # 10\nBeaupre, QC G0A 1E0\nCanada\n\n\nname\nemail\nphone (optional)\nmessage\nlightbox filling\nContact Broker\n  PRINT THIS BOAT      EMAIL A FRIEND\n\n\nContact Us Help About Us Media Kit Membership Cookies Do Not Sell My Personal Information\nYachtWorld, 1221 Brickell Avenue, Miami, Florida 33131, USA\ncopyright © 2021 Boats Group All Rights Reserved. | terms of use | privacy | AdChoices\n\n\n\n\nC\nCookie Control\nX\n\nWe have placed cookies on your device to help make this website better.\n\nYou can use this tool to change your cookie settings. Otherwise, we’ll assume you’re OK to continue.\n\nSome of the cookies we use are essential for the site to work.\n\nWe also use some non-essential cookies to collect information for making reports and to help us improve the site. The cookies collect information in an anonymous form.\n\nTo control third party cookies, you can also adjust your browser settings.\n\nTurn cookies Off\nI'm fine with this\nInformation and Settings\nAbout our cookies" });
      return;
    }

    chrome.tabs.query(queryInfo, ([{ id, url }]) => {
      console.log('url is ', url);
      chrome.tabs.sendMessage(id, {
        extract: true,
      },
        (msg) => {
          // Callbck to update the UI
          // if msg is undefined https://stackoverflow.com/questions/54126343
          // /how-to-fix-unchecked-runtime-lasterror-the-message-port-closed-before-a-respon
          console.log('result message:', msg);
          const result = msg ? JSON.parse(msg) : {};
          if (result.message) {
            reject(result);
            return;
          }
          resolve(result);
        });
    });

    chrome.browserAction.setBadgeText({ text: '1' });
  });
}

export {
  extractText,
};
