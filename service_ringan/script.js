const servicePricing = {

  baseCost: {
    honda: 25000,
    yamaha: 25000,
    suzuki: 25000,
    kawasaki: 30000,
    vespa: 35000,
    vespa: 40000,
    other: 25000,
  },


  components: {
    oil: {
      mineral: 50000,
      semi: 80000,
      full: 120000,
    },
    oilFilter: 30000,
    airFilter: 40000,
    sparkPlug: 20000,
    brakePads: 80000,
    chainService: 60000,
  },


  packages: {
    basic: ["oil", "oilFilter"],
    full: ["oil", "oilFilter", "airFilter", "sparkPlug"],
  },
};


const serviceForm = document.getElementById("serviceForm");
const motorBrand = document.getElementById("motorBrand");
const serviceTypeRadios = document.getElementsByName("serviceType");
const customComponents = document.getElementById("customComponents");
const componentChecks = document.querySelectorAll(".component-check");
const oilType = document.getElementById("oilType");
const calculateBtn = document.getElementById("calculateBtn");
const resultSection = document.getElementById("result");
const costDetails = document.getElementById("costDetails");
const totalCost = document.getElementById("totalCost");
const backBtn = document.getElementById("backBtn");
const bookBtn = document.getElementById("bookBtn");


serviceTypeRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.value === "custom") {
      customComponents.style.display = "block";
    } else {
      customComponents.style.display = "none";
    }
  });
});


calculateBtn.addEventListener("click", function () {

  if (!motorBrand.value) {
    alert("Silakan pilih merk motor terlebih dahulu");
    return;
  }


  const selectedBrand = motorBrand.value;
  const selectedOilType = oilType.value;
  const selectedServiceType = document.querySelector(
    'input[name="serviceType"]:checked'
  ).value;


  let total = servicePricing.baseCost[selectedBrand];
  let costItems = [];


  costItems.push({
    name: "Biaya Jasa Service",
    cost: servicePricing.baseCost[selectedBrand],
  });


  if (selectedServiceType === "basic") {
    servicePricing.packages.basic.forEach((component) => {
      let cost = 0;
      if (component === "oil") {
        cost = servicePricing.components.oil[selectedOilType];
      } else {
        cost = servicePricing.components[component];
      }

      total += cost;
      costItems.push({
        name: getComponentName(component),
        cost: cost,
      });
    });
  } else if (selectedServiceType === "full") {
    servicePricing.packages.full.forEach((component) => {
      let cost = 0;
      if (component === "oil") {
        cost = servicePricing.components.oil[selectedOilType];
      } else {
        cost = servicePricing.components[component];
      }

      total += cost;
      costItems.push({
        name: getComponentName(component),
        cost: cost,
      });
    });
  } else if (selectedServiceType === "custom") {
    componentChecks.forEach((checkbox) => {
      if (checkbox.checked) {
        let cost = 0;
        if (checkbox.value === "oil") {
          cost = servicePricing.components.oil[selectedOilType];
        } else {
          cost = servicePricing.components[checkbox.value];
        }

        total += cost;
        costItems.push({
          name: getComponentName(checkbox.value),
          cost: cost,
        });
      }
    });
  }


  displayResults(costItems, total);


  resultSection.style.display = "block";


  resultSection.scrollIntoView({ behavior: "smooth" });
});


function displayResults(costItems, total) {

  costDetails.innerHTML = "";


  costItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
            <span>${item.name}</span>
            <span>Rp ${item.cost.toLocaleString("id-ID")}</span>
        `;
    costDetails.appendChild(listItem);
  });


  totalCost.textContent = `Rp ${total.toLocaleString("id-ID")}`;
}


function getComponentName(componentKey) {
  const componentNames = {
    oil: "Ganti Oli Mesin",
    oilFilter: "Ganti Filter Oli",
    airFilter: "Ganti Filter Udara",
    sparkPlug: "Ganti Busi",
    brakePads: "Ganti Kampas Rem",
    chainService: "Service Rantai & Sproket",
  };

  return componentNames[componentKey] || componentKey;
}


backBtn.addEventListener("click", function () {
  resultSection.style.display = "none";
  document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
});


bookBtn.addEventListener("click", function () {
  alert(
    "Terima kasih! Tim kami akan segera menghubungi Anda untuk konfirmasi booking service."
  );
});
