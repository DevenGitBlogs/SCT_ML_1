document.getElementById("predictionForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const resultDiv = document.getElementById("result");
  resultDiv.textContent = "⏳ Predicting price...";
  
  const data = {
    GrLivArea: +document.getElementById("GrLivArea").value,
    BedroomAbvGr: +document.getElementById("BedroomAbvGr").value,
    FullBath: +document.getElementById("FullBath").value,
    GarageArea: +document.getElementById("GarageArea").value,
    YearBuilt: +document.getElementById("YearBuilt").value,
    OverallQual: +document.getElementById("OverallQual").value
  };

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error("Server error");

    const result = await response.json();

    if (result.price) {
      resultDiv.innerHTML = `✅ Estimated Price: <strong>$${result.price.toLocaleString()}</strong>`;
    } else {
      resultDiv.innerHTML = `⚠️ Error: ${result.error || "Unknown error"}`;
    }
  } catch (err) {
    resultDiv.innerHTML = `❌ Failed to fetch prediction. Please try again later.`;
    console.error(err);
  }
});
