const getYieldForPlant = (plant, environmentFactors) => {
  if(!environmentFactors) {
    return plant.yield;
  } else if(environmentFactors.sun && !environmentFactors.wind) {
    const sunFactor = plant.factors.sun[environmentFactors.sun] / 100 + 1;
    return plant.yield * sunFactor;
  } else if(environmentFactors.wind && !environmentFactors.sun) {
    const windFactor = plant.factors.wind[environmentFactors.wind] / 100 + 1;
    return plant.yield * windFactor;
  } else if(environmentFactors.sun && environmentFactors.wind){
    const sunFactor = plant.factors.sun[environmentFactors.sun] / 100 + 1;
    const windFactor = plant.factors.wind[environmentFactors.wind] / 100 + 1;
    return plant.yield * sunFactor * windFactor;
  }
}

const getYieldForCrop = (input, environmentFactors) => {
  const yieldTotal = input.crop.yield * input.numCrops;

  if(!environmentFactors) {
    return yieldTotal;
  } else if(environmentFactors.sun && !environmentFactors.wind) {
    const sunFactor = input.crop.factors.sun[environmentFactors.sun] / 100 + 1;
    return yieldTotal * sunFactor; 
  } else if(environmentFactors.wind && !environmentFactors.sun) {
    const windFactor = input.crop.factors.wind[environmentFactors.wind] / 100 + 1;
    return yieldTotal * windFactor;
  } else if(environmentFactors.sun && environmentFactors.wind){
    const sunFactor = input.crop.factors.sun[environmentFactors.sun] / 100 + 1;
    const windFactor = input.crop.factors.wind[environmentFactors.wind] / 100 + 1;
    return yieldTotal * sunFactor * windFactor;
  }
}

const getTotalYield = (crops, environmentFactors) => {
  const cropsArray = crops.crops;
  const yieldPerCrop = cropsArray.map(crop => crop.crop.yield * crop.numCrops);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const totalYield = yieldPerCrop.reduce(reducer, 0);
  
  if(!environmentFactors) {
    return totalYield;
  } else if(environmentFactors.sun && !environmentFactors.wind) {
    const sunFactor = cropsArray.map(crop => crop.crop.factors.sun[environmentFactors.sun] / 100 + 1);
    return totalYield * sunFactor[0]; 
  } else if(environmentFactors.wind && !environmentFactors.sun) {
    const windFactor = cropsArray.map(crop => crop.crop.factors.wind[environmentFactors.wind] / 100 + 1);
    return Math.round((totalYield * windFactor[0])* 100) / 100; 
  } else if(environmentFactors.sun && environmentFactors.wind){
    const sunFactor = cropsArray.map(crop => crop.crop.factors.sun[environmentFactors.sun] / 100 + 1);
    const windFactor = cropsArray.map(crop => crop.crop.factors.wind[environmentFactors.wind] / 100 + 1);
    return Math.round((totalYield * sunFactor[0] * windFactor[0])* 100) / 100;
  }
}

const getCostsForCrop = plant => plant.costsPerPlant * plant.numOfPlantsPerCrop;


const getRevenueForCrop = (plant, environmentFactors) => {
  const saleprice = plant.salePrice;
  if(!environmentFactors) {
    return saleprice * plant.yield;
  } else if(environmentFactors.sun && !environmentFactors.wind) {
    const sunFactor = plant.factors.sun[environmentFactors.sun] / 100 + 1;
    return saleprice * plant.yield * sunFactor; 
  } else if(environmentFactors.wind && !environmentFactors.sun) {
    const windFactor = plant.factors.wind[environmentFactors.wind] / 100 + 1;
    return saleprice * plant.yield * windFactor;
  } else if(environmentFactors.sun && environmentFactors.wind){
    const sunFactor = plant.factors.sun[environmentFactors.sun] / 100 + 1;
    const windFactor = plant.factors.wind[environmentFactors.wind] / 100 + 1;
    return Math.round((saleprice * plant.yield * sunFactor * windFactor)* 100) / 100;
  }
}


const getProfitForCrop = (plant, environmentFactors) => {
    return getRevenueForCrop(plant, environmentFactors) - getCostsForCrop(plant);
}


const getTotalProfit = (crops, environmentFactors) => {
  const cropsArray = crops.crops;
  const profitArray = cropsArray.map(crop => {
    const plant = crop.crop;
    const numOfCrops = crop.numCrops;
    return getProfitForCrop(plant, environmentFactors) * numOfCrops;
  })
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const totalProfit = profitArray.reduce(reducer, 0);
  return totalProfit;
}


  module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
  }