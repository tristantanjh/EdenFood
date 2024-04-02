const regions = ["North", "Northeast", "East", "West", "Central"];
const pickupLocations = [
  {
    region: "North",
    locations: [
      {
        id: 1,
        name: "102 YISHUN AVE 5, S760102",
        position: { lat: 1.430700, lng: 103.828820 },
      },
      {
        id: 2,
        name: "268 WOODLANDS CENTRE ROAD, S738931",
        position: { lat: 1.441070, lng: 103.769070 },
      },
      {
        id: 3,
        name: "678A WOODLANDS AVENUE 6, S731678",
        position: { lat: 1.440410, lng: 103.801520 },
      },
    ],
  },
  {
    region: "Northeast",
    locations: [
      {
        id: 1,
        name: "15 HOUGANG AVENUE 3, S538840",
        position: { lat: 1.362690, lng: 103.891820 },
      },
      {
        id: 2,
        name: "10 HOUGANG AVENUE 7, S530010",
        position: { lat: 1.363320192016653, lng: 103.8948225673747 },
      },
      {
        id: 3,
        name: "546 SERANGOON ROAD, S218168",
        position: { lat: 1.3140876328329143, lng: 103.85711692507167 },
      },
    ],
  },
  {
    region: "East",
    locations: [
      {
        id: 1,
        name: "Blk 22 EUNOS CRESCENT, S400022",
        position: { lat: 1.3248534765737643, lng: 103.90195120970395 },
      },
      {
        id: 2,
        name: "204 BEDOK NORTH STREET 1, S460204",
        position: { lat: 1.326750385101299, lng: 103.93028860000001 },
      },
      {
        id: 3,
        name: "449 TAMPINES STREET 42, S520449",
        position: { lat: 1.3570629370867016, lng: 103.9510849576708 },
      },
    ],
  },
  {
    region: "West",
    locations: [
      {
        id: 1,
        name: "2 JURONG EAST, S609601",
        position: { lat: 1.3349379700910333, lng: 103.74687443381144 },
      },
      {
        id: 2,
        name: "272B JURONG WEST STREET 24, S642272",
        position: { lat: 1.3505957986442818, lng: 103.70500505388092 },
      },
      {
        id: 3,
        name: "HILLVIEW INDUSTRIAL ESTATE 40, S669248",
        position: { lat: 1.365, lng: 103.756 },
      },
    ],
  },
  {
    region: "Central",
    locations: [
      {
        id: 1,
        name: "218 ORCHARD ROAD, S238851",
        position: { lat: 1.301612906460955, lng: 103.83878833236729 },
      },
      {
        id: 2,
        name: "137 TELOK AYER ST, S068602",
        position: { lat: 1.282, lng: 103.848 },
      },
      {
        id: 3,
        name: "267 BEACH ROAD, S199545",
        position: { lat: 1.302, lng: 103.861 },
      },
    ],
  },
];

export { regions, pickupLocations };