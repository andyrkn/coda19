export const prepareGlobalCases = (data) => {
  const keys = Object.keys(data[0]);
  const preparedData = {
    keys: keys
      .filter((key) => key !== 'Date')
      .map((key) => key.replace(/([A-Z])/g, ' $1').trim()),

    entries: data.map((entry) => ({
      date: entry.Date,
      'New Cases': parseInt(entry.NewCases, 10),
    })),
  };

  return preparedData;
};

export const prepareGlobalTests = (data) => {
  const keys = Object.keys(data[0]);
  const preparedData = {
    keys: keys
      .filter((key) => key !== 'Date')
      .map((key) => key.replace(/([A-Z])/g, ' $1').trim()),

    entries: data.map((entry) => ({
      date: entry.Date,
      'New Tests': parseInt(entry.NewTests, 10),
    })),
  };

  return preparedData;
};

export const prepareGlobalDeaths = (data) => {
  const keys = Object.keys(data[0]);
  const preparedData = {
    keys: keys
      .filter((key) => key !== 'Date')
      .map((key) => key.replace(/([A-Z])/g, ' $1').trim()),

    entries: data.map((entry) => ({
      date: entry.Date,
      'New Deaths': parseInt(entry.NewDeaths, 10),
    })),
  };

  return preparedData;
};
