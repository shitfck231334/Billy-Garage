const heavyServicePricing = {

  diagnosticFee: 75000,


  engineProblems: {
    overheat: 350000,
    noStart: 450000,
    engineNoise: 550000,
    lossPower: 400000,
    oilLeak: 300000,
    smoke: 500000,
  },


  electricalProblems: {
    battery: 200000,
    lighting: 250000,
    starter: 300000,
    charging: 350000,
    fullRewiring: 800000,
    ecu: 600000,
  },


  additionalServices: {
    emergency: 1.25, 
    warranty: 1.15, 
  },


  estimatedTime: {
    engine: {
      overheat: 2,
      noStart: 3,
      engineNoise: 4,
      lossPower: 2,
      oilLeak: 1,
      smoke: 3,
    },
    electrical: {
      battery: 1,
      lighting: 1,
      starter: 2,
      charging: 2,
      fullRewiring: 5,
      ecu: 3,
    },
  },
};


const heavyServiceForm = document.getElementById("heavyServiceForm");
const motorBrand = document.getElementById("motorBrand");
const engineType = document.getElementById("engineType");
const calculateBtn = document.getElementById("calculateBtn");
const resultSection = document.getElementById("result");
const costDetails = document.getElementById("costDetails");
const totalCost = document.getElementById("totalCost");
const estimatedTime = document.getElementById("estimatedTime");
const backBtn = document.getElementById("backBtn");
const consultBtn = document.getElementById("consultBtn");
const bookBtn = document.getElementById("bookBtn");


calculateBtn.addEventListener("click", function () {

  if (!motorBrand.value || !engineType.value) {
    alert("Silakan lengkapi informasi motor terlebih dahulu");
    return;
  }


  const selectedBrand = motorBrand.value;
  const selectedEngineType = engineType.value;


  let total = 0;
  let costItems = [];
  let maxDays = 0;


  costItems.push({
    name: "Biaya Diagnosa",
    cost: heavyServicePricing.diagnosticFee,
    included: false,
  });


  const engineCheckboxes = document.querySelectorAll(
    '.problems-grid input[type="checkbox"]'
  );
  let hasEngineProblems = false;

  engineCheckboxes.forEach((checkbox) => {
    if (
      checkbox.checked &&
      heavyServicePricing.engineProblems[checkbox.value]
    ) {
      const cost = heavyServicePricing.engineProblems[checkbox.value];
      total += cost;
      costItems.push({
        name: getProblemName(checkbox.value),
        cost: cost,
      });
      hasEngineProblems = true;


      const days = heavyServicePricing.estimatedTime.engine[checkbox.value];
      if (days > maxDays) maxDays = days;
    }
  });


  const electricalCheckboxes = document.querySelectorAll(
    '.problems-grid input[type="checkbox"]'
  );
  let hasElectricalProblems = false;

  electricalCheckboxes.forEach((checkbox) => {
    if (
      checkbox.checked &&
      heavyServicePricing.electricalProblems[checkbox.value]
    ) {
      const cost = heavyServicePricing.electricalProblems[checkbox.value];
      total += cost;
      costItems.push({
        name: getProblemName(checkbox.value),
        cost: cost,
      });
      hasElectricalProblems = true;


      const days = heavyServicePricing.estimatedTime.electrical[checkbox.value];
      if (days > maxDays) maxDays = days;
    }
  });


  if (!hasEngineProblems && !hasElectricalProblems) {
    alert("Silakan pilih minimal satu masalah yang akan diperbaiki");
    return;
  }


  total += heavyServicePricing.diagnosticFee;
  costItems[0].included = true;


  const emergencyChecked = document.getElementById("emergency").checked;
  const warrantyChecked = document.getElementById("warranty").checked;

  if (emergencyChecked) {
    const emergencyCost =
      total * (heavyServicePricing.additionalServices.emergency - 1);
    total *= heavyServicePricing.additionalServices.emergency;
    costItems.push({
      name: "Layanan Emergency (+25%)",
      cost: emergencyCost,
    });
  }

  if (warrantyChecked) {
    const warrantyCost =
      total * (heavyServicePricing.additionalServices.warranty - 1);
    total *= heavyServicePricing.additionalServices.warranty;
    costItems.push({
      name: "Garansi Extended 6 Bulan (+15%)",
      cost: warrantyCost,
    });
  }


  const sparepartsEstimation = total * 0.3;
  costItems.push({
    name: "Estimasi Sparepart",
    cost: sparepartsEstimation,
  });
  total += sparepartsEstimation;


  displayResults(costItems, total, maxDays);


  resultSection.style.display = "block";


  resultSection.scrollIntoView({ behavior: "smooth" });
});


function displayResults(costItems, total, maxDays) {

  costDetails.innerHTML = "";


  costItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";

    if (item.included === false) {
      listItem.innerHTML = `
                <span><s>${
                  item.name
                }</s> <small class="text-muted">(Gratis jika service dilakukan)</small></span>
                <span><s>Rp ${item.cost.toLocaleString("id-ID")}</s></span>
            `;
      listItem.style.color = "var(--text-secondary)";
    } else {
      listItem.innerHTML = `
                <span>${item.name}</span>
                <span>Rp ${item.cost.toLocaleString("id-ID")}</span>
            `;
    }

    costDetails.appendChild(listItem);
  });


  totalCost.textContent = `Rp ${Math.round(total).toLocaleString("id-ID")}`;


  if (maxDays > 0) {
    estimatedTime.textContent = `Estimasi Waktu: ${maxDays} hari kerja`;
  } else {
    estimatedTime.textContent = `Estimasi Waktu: Akan ditentukan setelah diagnosa`;
  }
}


function getProblemName(problemKey) {
  const problemNames = {

    overheat: "Perbaikan Mesin Overheat",
    noStart: "Perbaikan Mesin Susah Hidup",
    engineNoise: "Perbaikan Suara Mesin Berisik",
    lossPower: "Perbaikan Kehilangan Tenaga",
    oilLeak: "Perbaikan Kebocoran Oli",
    smoke: "Perbaikan Asap Berlebihan",

    battery: "Perbaikan Sistem Aki",
    lighting: "Perbaikan Sistem Penerangan",
    starter: "Perbaikan Sistem Starter",
    charging: "Perbaikan Sistem Pengisian",
    fullRewiring: "Rewiring Total Sistem Kelistrikan",
    ecu: "Perbaikan/Diagnosa ECU/CDI",
  };

  return problemNames[problemKey] || problemKey;
}


backBtn.addEventListener("click", function () {
  resultSection.style.display = "none";
  document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
});


consultBtn.addEventListener("click", function () {
  const selectedProblems = [];
  const engineCheckboxes = document.querySelectorAll(
    '.problems-grid input[type="checkbox"]:checked'
  );

  engineCheckboxes.forEach((checkbox) => {
    selectedProblems.push(getProblemName(checkbox.value));
  });

  const problemList = selectedProblems.join(", ");
  const message = `Halo, saya ingin konsultasi tentang service berat untuk masalah: ${problemList}`;

  alert(
    `Terima kasih! Tim teknisi kami akan menghubungi Anda untuk konsultasi lebih lanjut.\n\nMasalah yang akan dikonsultasikan:\n${problemList}`
  );
});


bookBtn.addEventListener("click", function () {
  const selectedBrand =
    document.getElementById("motorBrand").options[
      document.getElementById("motorBrand").selectedIndex
    ].text;
  const selectedEngineType =
    document.getElementById("engineType").options[
      document.getElementById("engineType").selectedIndex
    ].text;

  alert(
    `Booking service berat berhasil!\n\nMerk: ${selectedBrand}\nTipe Mesin: ${selectedEngineType}\n\nTim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi jadwal.`
  );
});
