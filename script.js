const indiaFactors = {
  transport: {
    car_petrol: 0.185,
    car_diesel: 0.21,
    bus: 0.089,
    metro: 0.05,
    train_electric: 0.04,
    bike: 0.07,
    walk: 0,
  },
  electricity: 0.82, // kg CO₂ per kWh
  diet_per_meat_meal: 1.2, // kg CO₂ per meat-based meal
  garbage: 0.45, // kg CO₂ per kg of waste
  clothing: 2.5, // kg CO₂ per item
  housing: {
    apartment_small: 2.0,
    apartment_large: 3.0,
    house: 4.0,
    villa: 5.5,
  },
  costPerKgCO2: 3.0, // ₹ per kg CO₂
};

function calculateIndianCarbon() {
  const mode = document.getElementById("transport").value;
  const km = parseFloat(document.getElementById("distance").value);
  const electricity = parseFloat(document.getElementById("electricity").value);
  const meatMeals = parseFloat(document.getElementById("meatMeals").value);
  const garbage = parseFloat(document.getElementById("garbage").value);
  const housing = document.getElementById("housing").value;
  const clothing = parseFloat(document.getElementById("clothing").value);

  const transportCO2 = km * indiaFactors.transport[mode];
  const electricityCO2 = (electricity / 30) * indiaFactors.electricity;
  const dietCO2 = (meatMeals / 7) * indiaFactors.diet_per_meat_meal;
  const garbageCO2 = garbage * indiaFactors.garbage;
  const clothingCO2 = (clothing / 30) * indiaFactors.clothing;
  const housingCO2 = indiaFactors.housing[housing];

  const totalCO2 = transportCO2 + electricityCO2 + dietCO2 + garbageCO2 + clothingCO2 + housingCO2;
  const estimatedCost = totalCO2 * indiaFactors.costPerKgCO2;

  const dietType = meatMeals === 0 ? "Vegetarian" : (meatMeals <= 7 ? "Flexitarian" : "Non-Vegetarian");




  let advice = "";
if (totalCO2 < 5) {
  advice = "Great job! Your carbon footprint is relatively low.";

} else if (totalCO2 < 10) {
  advice = "Moderate emissions. There's still room to reduce.";
  
} else {
  advice = "High emissions. Consider reviewing your lifestyle choices.";
  
}
  document.getElementById("result").innerHTML = `
    <strong>Estimated Daily CO₂ Emissions:</strong> ${totalCO2.toFixed(2)} kg<br>
    <strong>Estimated Carbon Cost:</strong> ₹${estimatedCost.toFixed(2)} per day<br>
    <strong>Diet Type:</strong> ${dietType}<br>
    <strong><em>${advice}</em></strong>
  `;

}
