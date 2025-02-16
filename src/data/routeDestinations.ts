interface RouteDestination {
  inbound: string;
  outbound: string;
}

export const routeDestinations: { [key: string]: RouteDestination } = {
  "501": {
    inbound: "UNC Charlotte Station",
    outbound: "LYNX I-485 Station"
  },
  "510": {
    inbound: "French St Station (CityLynx)",
    outbound: "Sunnyside Station (CityLYNX)"
  },
  "1": {
    inbound: "Charlotte Transportation Center",
    outbound: "Callabridge Commons"
  },
  "2": {
    inbound: "LYNX Scaleybark Station",
    outbound: "Thriftwood & Freedom"
  },
  "3": {
    inbound: "Albemarle & Lawyers Park",
    outbound: "Center & Kentucky"
  },
  "4": {
    inbound: "Charlotte Transportation Center",
    outbound: "Sugar Creek Station"
  },
  "5": {
    inbound: "Charlotte Transportation Center",
    outbound: "Airport Terminal"
  },
  "6": {
    inbound: "Charlotte Transportation Center",
    outbound: "Carolinas Medical Center"
  },
  "7": {
    inbound: "Charlotte Transportation Center",
    outbound: "Harris Corners Parkway / Northlake Mall"
  },
  "8": {
    inbound: "Charlotte Transportation Center",
    outbound: "Little Rock Scott Futrell"
  },
  "9": {
    inbound: "Charlotte Transportation Center",
    outbound: "Albemarle & Lawyers Park"
  },
  "10": {
    inbound: "Charlotte Transportation Center",
    outbound: "New Renaissance & burnette"
  },
  "11": {
    inbound: "Charlotte Transportation Center",
    outbound: "Walmart University Pointe"
  },
  "12": {
    inbound: "LYNX I-485 Station",
    outbound: "Rosethorne & Pressley"
  },
  "13": {
    inbound: "Sugar Creek Station",
    outbound: "Braden & Milan"
  },
  "14": {
    inbound: "Charlotte Transportation Center",
    outbound: "Arboretum Shopping Center"
  },
  "15": {
    inbound: "Charlotte Transportation Center",
    outbound: "Cotswold Shopping Center"
  },
  "16": {
    inbound: "Charlotte Transportation Center",
    outbound: "CMC-Steelecroft"
  },
  "17": {
    inbound: "Charlotte Transportation Center",
    outbound: "Mathews-Independence Pointe P&R"
  },
  "18": {
    inbound: "Rosa Parks Place CTC",
    outbound: "Callabridge Commons"
  },
  "19": {
    inbound: "Charlotte Transportation Center",
    outbound: "SouthPart CTC/Carolina Place Mall"
  },
  "20": {
    inbound: "Charlotte Transportation Center",
    outbound: "Quail Corners Shopping Ctr"
  },
  "21": {
    inbound: "Charlotte Transportation Center",
    outbound: "Sugar Creek & Harris"
  },
  "22": {
    inbound: "Charlotte Transportation Center",
    outbound: "JW Clay Park and Ride"
  },
  "23": {
    inbound: "Charlotte Transportation Center",
    outbound: "CPCC Cato Campus"
  },
  "24": {
    inbound: "LYNX Woodlawn Station",
    outbound: "LYNX Arrowood Station"
  },
  "26": {
    inbound: "Charlotte Transportation Center",
    outbound: "Rosa Parks Place CTC"
  },
  "27": {
    inbound: "Charlotte Transportation Center",
    outbound: "Mathews-Mint Hill & Independence Pointe"
  },
  "28": {
    inbound: "Southpark CTC",
    outbound: "Eastland CTC"
  },
  "29": {
    inbound: "Walmart Independence",
    outbound: "JW Clay Park and Ride"
  },
  "30": {
    inbound: "Carrowmore & Thornton",
    outbound: "Southpark CTC"
  },
  "34": {
    inbound: "Charlotte Transportation Center",
    outbound: "Paw Creek Shopping Center"
  },
  "35": {
    inbound: "Charlotte Transportation Center",
    outbound: "Amazon Packaging Center/Amazon - Tuckaseegee"
  },
  "39": {
    inbound: "Old Concord Road Station",
    outbound: "Billingsley & Randolph"
  },
  "40x": {
    inbound: "Johnson Wales Way",
    outbound: "Lawyers & NC 51"
  },
  "41x": {
    inbound: "4rd & McDowell",
    outbound: "CMC-Steelcroft"
  },
  "42": {
    inbound: "LYNX I-485 Station",
    outbound: "Southpoint Business Park"
  },
  "43": {
    inbound: "LYNX Sharon Rd West Station",
    outbound: "Ballantyne"
  },
  "46x": {
    inbound: "Johnson and Wales Way",
    outbound: "Cambridge Commons"
  },
  "47x": {
    inbound: "JW Clay Park and Ride",
    outbound: "JW Clay Park and Ride/Metrolina Greenhouse"
  },
  "48x": {
    inbound: "3rd & McDowell",
    outbound: "Northcross Park and Ride"
  },
  "50": {
    inbound: "University City Blvd Station",
    outbound: "Mallard Creek Park and Ride"
  },
  "51": {
    inbound: "CPCC Levine/Matthews-Independence Pointe P&R",
    outbound: "Carolina Place Mall"
  },
  "52x": {
    inbound: "Johnson and Wales Way",
    outbound: "Margret Wallace"
  },
  "53x": {
    inbound: "3rd & McDowell/Charlotte Transportation Center",
    outbound: "Ridge Rd Park and Ride/Johnson Oehler"
  },
  "54": {
    inbound: "University City Blvd Station",
    outbound: "Concord Mills"
  },
  "55": {
    inbound: "LYNX Sharon Rd West Station",
    outbound: "Westlake & Display/Charlotte Premium Outlets"
  },
  "56": {
    inbound: "LYNX Arrowood Station",
    outbound: "Charlotte Premium Outlets"
  },
  "57": {
    inbound: "SouthPark CTC",
    outbound: "Forest Point Dr & Arrowood Rd"
  },
  "58": {
    inbound: "LYNX I-485 Station",
    outbound: "Carolina Place Mall"
  },
  "59": {
    inbound: "Walmart Huntersville",
    outbound: "JW Clay Park and Ride"
  },
  "60": {
    inbound: "LYNX Tyvola Station",
    outbound: "Airport Terminal"
  },
  "61x": {
    inbound: "Johnson and Wales Way",
    outbound: "Waverly Shopping Center"
  },
  "62x": {
    inbound: "Johnson and Wales Way/Charlotte Transportation Center",
    outbound: "St. Matthew Church Park and Ride"
  },
  "63x": {
    inbound: "3rd & McDowell",
    outbound: "Huntersville-Gateway Park and Ride"
  },
  "64x": {
    inbound: "Johnson and Wales Way",
    outbound: "John & Trade (Matthews)"
  },
  "74x": {
    inbound: "Johnson and Wales Way/Charlotte Transportation Center",
    outbound: "Union Towne Center"
  },
  "77x": {
    inbound: "3rd & McDowell",
    outbound: "Davidson Gateway Park and Ride"
  },
  "82x": {
    inbound: "3rd & McDowell/Charlotte Transportation Center",
    outbound: "White Street Park and Ride"
  },
  "85x": {
    inbound: "3rd & McDowell/Charlotte Transportation Center",
    outbound: "Gastonia Transportation Center"
  },
  "88x": {
    inbound: "3rd & McDowell",
    outbound: "Riverbend Park and Ride"
  },
  "97": {
    inbound: "Huntersville-Gateway Park and Ride",
    outbound: "Griffith & Jackson"
  },
  "98": {
    inbound: "Huntersville-Gateway Park and Ride",
    outbound: "Walmart Huntersville"
  },
  "99": {
    inbound: "Griffith & Jackson",
    outbound: "Northlake Mall"
  },
  "211": {
    inbound: "Sugar Creek Station",
    outbound: "Tryon & Tom Hunter"
  },
  "221": {
    inbound: "Eastland CTC",
    outbound: "Walmart Independence"
  },
  "222": {
    inbound: "Eastland CTC",
    outbound: "Target on Albemarle Road"
  },
  "235": {
    inbound: "Nobles Avenue",
    outbound: "Ashley Rd & Alleghany St"
  },
  "290": {
    inbound: "Griffith & Jackson",
    outbound: "Concord Rd"
  }
};