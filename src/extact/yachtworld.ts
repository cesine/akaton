export const matchers = {
  location: /(location|located).*\n.*\n/gi,
  price: undefined,
  length: /(\d\d'|length).*\n.*\n/gi,
  beam: undefined,
  draft: undefined,
  engine: undefined,
  autopilot: /(autopilot|windvane|wind.+vane).*\n.*\n/gi,
  battery: undefined,
  solarPower: /(solar|wind.+turbine|hydro.+generator).*\n.*\n/gi,
  mainsail: undefined,
  genoa: undefined,
  jib: undefined,
  spinnaker: undefined,
  rigging: undefined,
  waterTank: /water.+ tank.*\n.*\n/gi,
  fuelTank: /(fuel|diesel).* tank.*\n.*\n/gi,
  bimini: /(bimini|hardtop|dodger|spray-hood).*\n.*\n/gi,
  dinghy: /(dinghy|tender).*\n.*\n/gi,
  year: /\W(19|20)\d\d\W/,
};
