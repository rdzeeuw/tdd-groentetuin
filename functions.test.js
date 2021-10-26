const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit} = require('./functions');

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };
    

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };

        const crops = [{ crop: corn, numCrops: 0 }];

        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Get costs for crop", () => {
        const corn = {
            name: "corn",
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10
        };
        
        expect(getCostsForCrop(corn)).toBe(20);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop", () => {
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3
        };
        
        expect(getRevenueForCrop(corn)).toBe(30);
    });
});

describe("getProfitForCrop", () => {
    test("Get profit for crop", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
        };
        
        expect(getProfitForCrop(corn)).toBe(10);
    });
});

describe("getTotalProfit", () => {
    test("Get total profit for crops", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
        };

        const pumpkin = {
            name: "pumpkin",
            salePrice: 20,
            yield: 5,
            costsPerPlant: 3,
            numOfPlantsPerCrop: 10,
        };

        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 }
        ];

        
        expect(getTotalProfit({ crops })).toBe(190);
    });

});

// testing with environment factors-------------------

describe("getYieldForPlant", () => {

    test("Get yield for plant with low sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
            },
          };
    
        const environmentFactors = {
            sun: "low",
          };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
    });
    
    test("Get yield for plant with high sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
            },
          };
    
        const environmentFactors = {
            sun: "high",
          };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
    });

    test("Get yield for plant with medium wind", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              }
            }
          };
    
        const environmentFactors = {
            wind: "medium"
          };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(21);
    });

    test("Get yield for plant with high sun", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
            },
          };
    
        const environmentFactors = {
            sun: "high",
          };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
    });

    test("Get yield for plant with high sun and high wind", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
              sun: {
                low: -50,
                medium: 0,
                high: 50,
              },
              wind: {
                low: 0,
                medium: -30,
                high: -60,
              },
            },
          };
    
        const environmentFactors = {
            sun: "high",
            wind: "high"
          };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(18);
    });
});

// getYieldForCrop tests with environmetal factors ----------

describe("getYieldForCrop", () => {
    test("Get yield for crop, with high sun", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                  low: -50,
                  medium: 0,
                  high: 50,
                }
            },
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "high",
          };

        expect(getYieldForCrop(input, environmentFactors)).toBe(45);
    });

    test("Get yield for crop, with medium wind", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60,
                }
            },
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            wind: "medium",
          };

        expect(getYieldForCrop(input, environmentFactors)).toBe(21);
    });


    test("Get yield for crop, with low sun and medium wind", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "low",
            wind: "medium"
          };

        expect(getYieldForCrop(input, environmentFactors)).toBe(10.5);
    });
});

// getTotalYield with environment factors --------------
describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops with low sun", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "low",
            
          };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(11.5);
    });
    

    test("Calculate total yield with multiple crops with medium wind", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            wind: "medium",
            
          };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(16.1);
    });

    test("Calculate total yield with multiple crops with with low sun and medium wind", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "low",
            wind: "medium"
          };

        expect(getTotalYield({ crops }, environmentFactors)).toBe(8.05);
    });
        
});
// getRevenueForCrop with environmental factors -------
describe("getRevenueForCrop", () => {
    test("Get Revenue for crop with high sun", () => {
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const environmentFactors = {
            sun: "high",
            // wind: "medium"
          };
        
          expect(getRevenueForCrop(corn, environmentFactors)).toBe(45);
    });

    test("Get Revenue for crop with medium wind", () => {
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const environmentFactors = {
            // sun: "high",
            wind: "medium"
          };
        
          expect(getRevenueForCrop(corn, environmentFactors)).toBe(21);
    });

    test("Get Revenue for crop with high sun and medium wind", () => {
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const environmentFactors = {
            sun: "high",
            wind: "medium"
          };
        
          expect(getRevenueForCrop(corn, environmentFactors)).toBe(31.5);
    });
});

//get Profit for Crop with environment factors -----
describe("getProfitForCrop", () => {
    test("Get profit for crop with high sun", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        
        const environmentFactors = {
            sun: "high",
            // wind: "medium"
          };

        expect(getProfitForCrop(corn, environmentFactors)).toBe(25);
    });

    test("Get profit for crop (pumpkin) with high sun", () => {
        
        const pumpkin = {
            name: "pumpkin",
            salePrice: 20,
            yield: 5,
            costsPerPlant: 3,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        
        const environmentFactors = {
            sun: "high",
            // wind: "medium"
          };

        expect(getProfitForCrop(pumpkin, environmentFactors)).toBe(120);
    });

    test("Get profit for crop with high wind", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        
        const environmentFactors = {
            // sun: "high",
            wind: "high"
          };

        expect(getProfitForCrop(corn, environmentFactors)).toBe(-8);
    });

    test("Get profit for crop with high sun and high wind", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };
        
        const environmentFactors = {
            sun: "high",
            wind: "high"
          };

        expect(getProfitForCrop(corn, environmentFactors)).toBe(-2);
    });

});

//get total profit with environmental factors --------------
describe("getTotalProfit", () => {
    test("Get total profit for crops with high sun", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const pumpkin = {
            name: "pumpkin",
            salePrice: 20,
            yield: 5,
            costsPerPlant: 3,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 }
        ];
        const environmentFactors = {
            sun: "high",
            // wind: "high"
          };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(365);
    });

    test("Get total profit for crops with high wind", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const pumpkin = {
            name: "pumpkin",
            salePrice: 20,
            yield: 5,
            costsPerPlant: 3,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 }
        ];
        const environmentFactors = {
            // sun: "high",
            wind: "high"
          };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(-20);
    });

    test("Get total profit for crops with low sun and low wind", () => {
        
        const corn = {
            name: "corn",
            salePrice: 10,
            yield: 3,
            costsPerPlant: 2,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const pumpkin = {
            name: "pumpkin",
            salePrice: 20,
            yield: 5,
            costsPerPlant: 3,
            numOfPlantsPerCrop: 10,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50
                },
                wind: {
                  low: 0,
                  medium: -30,
                  high: -60
                }
            },
        };

        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 }
        ];
        const environmentFactors = {
            sun: "low",
            wind: "low"
          };

        expect(getTotalProfit({ crops }, environmentFactors)).toBe(15);
    });

});