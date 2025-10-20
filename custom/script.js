const customServicePricing = {

  packages: {
    basic: {
      min: 1500000,
      max: 3000000,
      time: "7-10 hari",
    },
    premium: {
      min: 3500000,
      max: 6000000,
      time: "14-21 hari",
    },
    full: {
      min: 7000000,
      max: 15000000,
      time: "21-30 hari",
    },
  },


  components: {
    customPaint: 1500000,
    airbrush: 2500000,
    frameMod: 3000000,
    performance: 2000000,
    lighting: 1200000,
    audio: 1800000,
  },


  additional: {
    emergency: 1.25, 
    designConsult: 500000,
  },
};


const customServiceForm = document.getElementById("customServiceForm");
const motorBrand = document.getElementById("motorBrand");
const motorType = document.getElementById("motorType");
const calculateBtn = document.getElementById("calculateBtn");
const resultSection = document.getElementById("result");
const costDetails = document.getElementById("costDetails");
const totalCost = document.getElementById("totalCost");
const estimatedTime = document.getElementById("estimatedTime");
const backBtn = document.getElementById("backBtn");
const consultBtn = document.getElementById("consultBtn");
const bookBtn = document.getElementById("bookBtn");


calculateBtn.addEventListener("click", function () {

  if (!motorBrand.value || !motorType.value) {
    alert("Silakan lengkapi informasi motor terlebih dahulu");
    return;
  }


  const selectedPackage = document.querySelector(
    'input[name="package"]:checked'
  );
  if (!selectedPackage) {
    alert("Silakan pilih paket custom terlebih dahulu");
    return;
  }


  let totalMin = 0;
  let totalMax = 0;
  let costItems = [];
  let estimatedDays = "";


  const packageData = customServicePricing.packages[selectedPackage.value];
  totalMin += packageData.min;
  totalMax += packageData.max;
  estimatedDays = packageData.time;

  costItems.push({
    name: `Paket ${
      selectedPackage.value.charAt(0).toUpperCase() +
      selectedPackage.value.slice(1)
    }`,
    costMin: packageData.min,
    costMax: packageData.max,
  });


  const componentCheckboxes = document.querySelectorAll(
    '.component-checkbox input[type="checkbox"]'
  );
  componentCheckboxes.forEach((checkbox) => {
    if (checkbox.checked && customServicePricing.components[checkbox.value]) {
      const cost = customServicePricing.components[checkbox.value];
      totalMin += cost;
      totalMax += cost;

      costItems.push({
        name: getComponentName(checkbox.value),
        costMin: cost,
        costMax: cost,
      });
    }
  });


  const emergencyChecked = document.getElementById("emergency").checked;
  const designConsultChecked = document.getElementById("designConsult").checked;

  if (emergencyChecked) {
    const emergencyCostMin =
      totalMin * (customServicePricing.additional.emergency - 1);
    const emergencyCostMax =
      totalMax * (customServicePricing.additional.emergency - 1);
    totalMin *= customServicePricing.additional.emergency;
    totalMax *= customServicePricing.additional.emergency;

    costItems.push({
      name: "Layanan Express (+25%)",
      costMin: emergencyCostMin,
      costMax: emergencyCostMax,
    });
  }

  if (designConsultChecked) {
    const designCost = customServicePricing.additional.designConsult;
    totalMin += designCost;
    totalMax += designCost;

    costItems.push({
      name: "Konsultasi Desain",
      costMin: designCost,
      costMax: designCost,
    });
  }


  displayResults(costItems, totalMin, totalMax, estimatedDays);


  resultSection.style.display = "block";


  resultSection.scrollIntoView({ behavior: "smooth" });
});


function displayResults(costItems, totalMin, totalMax, estimatedDays) {

  costDetails.innerHTML = "";


  costItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";

    if (item.costMin === item.costMax) {
      listItem.innerHTML = `
                <span>${item.name}</span>
                <span>Rp ${item.costMin.toLocaleString("id-ID")}</span>
            `;
    } else {
      listItem.innerHTML = `
                <span>${item.name}</span>
                <span>Rp ${item.costMin.toLocaleString(
                  "id-ID"
                )} - ${item.costMax.toLocaleString("id-ID")}</span>
            `;
    }

    costDetails.appendChild(listItem);
  });


  if (totalMin === totalMax) {
    totalCost.textContent = `Rp ${Math.round(totalMin).toLocaleString(
      "id-ID"
    )}`;
  } else {
    totalCost.textContent = `Rp ${Math.round(totalMin).toLocaleString(
      "id-ID"
    )} - ${Math.round(totalMax).toLocaleString("id-ID")}`;
  }


  estimatedTime.textContent = `Estimasi Waktu: ${estimatedDays}`;
}


function getComponentName(componentKey) {
  const componentNames = {
    customPaint: "Custom Paint/Desain Khusus",
    airbrush: "Airbrush Artwork",
    frameMod: "Modifikasi Rangka",
    performance: "Performance Upgrade",
    lighting: "Custom Lighting System",
    audio: "Audio System",
  };

  return componentNames[componentKey] || componentKey;
}


backBtn.addEventListener("click", function () {
  resultSection.style.display = "none";
  document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
});


consultBtn.addEventListener("click", function () {
  const selectedPackage = document.querySelector(
    'input[name="package"]:checked'
  );
  const packageName = selectedPackage
    ? selectedPackage.nextElementSibling.querySelector("h5").textContent
    : "Custom";

  alert(
    `Terima kasih! Tim desainer kami akan menghubungi Anda untuk konsultasi paket ${packageName}.`
  );
});


bookBtn.addEventListener("click", function () {
  const selectedBrand =
    document.getElementById("motorBrand").options[
      document.getElementById("motorBrand").selectedIndex
    ].text;
  const selectedType =
    document.getElementById("motorType").options[
      document.getElementById("motorType").selectedIndex
    ].text;
  const selectedPackage = document.querySelector(
    'input[name="package"]:checked'
  );
  const packageName = selectedPackage
    ? selectedPackage.nextElementSibling.querySelector("h5").textContent
    : "Custom";

  alert(
    `Booking custom service berhasil!\n\nMerk: ${selectedBrand}\nTipe: ${selectedType}\nPaket: ${packageName}\n\nTim kami akan menghubungi Anda dalam 1x24 jam untuk konsultasi lebih lanjut.`
  );
});
