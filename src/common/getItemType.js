export default function GetItemType(name) {
  var exportItems = {
    "Armor debris": "01_Debris",
    "Hull debris": "01_Debris",
    "Module debris": "01_Debris",
    "Weapon debris": "01_Debris",
    "Metal ore": "03_Ore",
    "RE ore": "03_Ore",
    "Silicon ore": "03_Ore",
    Stardust: "03_Ore",
    Ice: "03_Ore",
    "He-3": "04_T1",
    Hydrogen: "04_T1",
    Metal: "04_T1",
    Oxygen: "04_T1",
    Silicon: "04_T1",
    "RE element": "04_T1",
    Chip: "05_T2",
    Crystal: "05_T2",
    Fuel: "05_T2",
    "Ti alloy": "05_T2",
    "Nuclear fuel": "T3",
    Nanomaterial: "T3",
    "Photonic crystal": "T3",
    "Quantum chip": "T3",
    "Complex 1": "02_Rock",
    "Complex 2": "02_Rock",
    "Complex 3": "02_Rock",
    "Complex 4": "02_Rock",
    "Complex 5": "02_Rock",
    "Ice rock": "02_Rock",
    "Metal rock": "02_Rock",
    "Mix-ice": "02_Rock",
    "Mix-metal": "02_Rock",
    "Mix-RE": "02_Rock",
    "Mix-silicon": "02_Rock",
    "Mix-stardust": "02_Rock",
    "P-ice": "02_Rock",
    "P-metal": "02_Rock",
    "P-RE": "02_Rock",
    "P-silicon": "02_Rock",
    "P-stardust": "02_Rock",
    "RE rock": "02_Rock",
    "R-ice": "02_Rock",
    "R-metal": "02_Rock",
    "R-RE": "02_Rock",
    "R-silicon": "02_Rock",
    "R-stardust": "02_Rock",
    "Silicon rock": "02_Rock",
    "Star rock": "02_Rock"
  };

  return exportItems[name] || "00_Hull/Module";
}
